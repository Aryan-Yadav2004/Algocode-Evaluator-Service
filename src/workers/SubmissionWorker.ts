import {Job, Worker } from 'bullmq';

import redisConnection from '../config/redis.config.js';
import SubmissionJob from '../jobs/SubmissionJob.js';

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function SubmissionWorker(queueName: string) {
    new Worker<Record<string, string>>(queueName, async (job: Job) => {
        if (job.name === 'SubmissionJob') {
            const submissionJobInstance = new SubmissionJob(job.data); // ✅ now typed
            submissionJobInstance.handle(job);
            await delay(1000);
            return true;
        }
    },{connection: redisConnection});
}