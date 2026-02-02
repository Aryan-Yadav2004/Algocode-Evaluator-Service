// import type { Job } from 'bullmq';

import type { Job } from 'bullmq';

import type { IJob } from '../types/bullMqJobDefination.js'
import type { submissionPayload } from '../types/submissionPayload.js'
import createExecutor from '../utils/ExecutorFactory.js'
import type { ExecutionResponse } from '../types/CodeExecutorStrategy.js'

export default class SubmissionJob implements IJob {
    name: string
    payload?: Record<string, submissionPayload>
    constructor(payload: Record<string,submissionPayload>){
        this.payload = payload;
        this.name = this.constructor.name;
    }

    handle = async (job?: Job) => {
        console.log('Handler of the job called');
        console.log(this.payload);
        if (job && this.payload) {
            const key = Object.keys(this.payload)[0]?.toString();
            if (key) {
                // console.log(this.payload[key]?.language);
                // if(this.payload[key]?.language === 'CPP'){
                //    const response = await runCpp(this.payload[key]?.code, this.payload[key]?.inputTestCase);
                //    console.log(response);
                // }
                const codeLanguage = this.payload[key]?.language;
                const code = this.payload[key]?.code;
                const inputTestCase = this.payload[key]?.inputTestCase;
                if(codeLanguage && code && inputTestCase) {
                    const strategy = createExecutor(codeLanguage);
                    if(strategy !== null) {
                        const response : ExecutionResponse = await  strategy.execute(code, inputTestCase);
                        if(response.status === "COMPLETED"){
                            console.log("Code executed successfully");
                            console.log(response);
                        } else {
                            console.log("Something went wrong with code execution");
                            console.log(response);
                        }
                    }
                }
            }
        }
    }

    failed = (job?: Job): void => {
        console.log('Job failed');
        if (job) {
            console.log(job.id);
        }
    }

}