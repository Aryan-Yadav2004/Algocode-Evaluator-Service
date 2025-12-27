import sampleQueue from '../queues/sampleQueue.js';

export default async function (payload: Record<string, unknown>) {
    await sampleQueue.add('SampleJob', payload);
    console.log("successfully added a new job");
}