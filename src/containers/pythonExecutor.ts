// import Docker from 'dockerode';

// import type { TestCases } from '../types/testCases.js';
import type { ExecutionResponse } from '../types/CodeExecutorStrategy.js'
import type CodeExecutorStrategy from '../types/CodeExecutorStrategy.js'
import { PYTHON_IMAGE } from '../utils/constanst.js'
import createContainer from './containerFactory.js'
import decodeDockerStream from './dockerHelper.js'

class PythonExecutor implements CodeExecutorStrategy {
    async execute(code: string, inputTestCase: string, outputTestCase: string) : Promise<ExecutionResponse> {
            const rawLogBuffer: Buffer[] = []
        console.log(code, inputTestCase, outputTestCase);
        console.log("initialising python container")
        const runCommand = `echo '${code.replace(/'/g, `'\\*'`)}' > test.py && echo '${inputTestCase.replace(/'/g, `'\\*'`)}' | python3 test.py`;
        // const pythonDockerContainer = await createContainer(PYTHON_IMAGE, ['python3','-c', code, 'stty -echo']);
        const pythonDockerContainer = await createContainer(PYTHON_IMAGE, ['/bin/sh', '-c', runCommand]);
        // starting / booting the corresponding docker container.
        await pythonDockerContainer.start();

        console.log("Started the docker container");

        const loggerStream = await pythonDockerContainer.logs({
            stdout: true,
            stderr: true,
            timestamps: false,
            follow: true, // wheather the logs are streamed or returned as a string
        });

        //Attach events on the streams object to start and stop reading
        loggerStream.on('data', (chunk) => {
            rawLogBuffer.push(chunk);
        });

        try {
            const codeResponse : string  =  await this.fetchDecodedStream(loggerStream, rawLogBuffer );
            return {output: codeResponse, status: "COMPLETED"};
        } catch (error) {
            return {output: error as string, status: "ERROR"};
        } finally {
            await pythonDockerContainer.remove(); 
        }
    }

    fetchDecodedStream(loggerStream: NodeJS.ReadableStream, rawLogBuffer: Buffer[]) : Promise<string> {
        return new Promise((res, rej) => {
            loggerStream.on('end',() => {
                console.log(rawLogBuffer);
                const completeBuffer = Buffer.concat(rawLogBuffer);
                const decodeStream = decodeDockerStream(completeBuffer);
                console.log(decodeStream);
                if(decodeStream.stderr){
                    rej(decodeStream.stderr);
                }
                else {
                    res(decodeStream.stdout);
                }
            });
        });
    }
}





export default PythonExecutor;