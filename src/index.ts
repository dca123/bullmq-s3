import { Job, Queue, Worker } from "bullmq";

const myQueue = new Queue('newQ');

async function addJobs(){
    await myQueue.add('job1', {foo: 'bar', time: 5})
    await myQueue.add('job2', {foo: 'bar3', time: 5})
}
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const worker = new Worker('newQ', async (job: Job) => {
    await sleep(job.data.time*1000);
    console.log(job.data);    
}, {concurrency: 50})

worker.on('completed', (job) => {
    console.log(`${job.id} has completed!`);
});

worker.on('failed', (job, err) => {
    console.log(`${job.id} has failed with ${err.message}`);
});

addJobs()