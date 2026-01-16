// import type { Job } from 'bullmq';

import type { Job } from 'bullmq'

import type { IJob } from '../types/bullMqJobDefination.js'
import type { submissionPayload } from '../types/submissionPayload.js'
import runCpp from '../containers/runCppDocker.js'

export default class SubmissionJob implements IJob {
    name: string
    payload?: Record<string, submissionPayload>
    constructor(payload: Record<string,submissionPayload>){
        this.payload = payload
        this.name = this.constructor.name
    }

    handle = async (job?: Job) => {
        console.log('Handler of the job called')
        console.log(this.payload);
        if (job) {
            console.log(this.payload?.['1234']?.language);
            if(this.payload?.['1234']?.language === 'CPP'){
               const response = await runCpp(this.payload?.['1234']?.code, this.payload?.['1234']?.inputTestCase);
               console.log(response);
            }
        }
    }

    failed = (job?: Job): void => {
        console.log('Job failed')
        if (job) {
            console.log(job.id)
        }
    }

}