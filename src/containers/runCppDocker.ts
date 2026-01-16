// import Docker from 'dockerode';

// import type { TestCases } from '../types/testCases.js';
import { CPP_IMAGE } from '../utils/constanst.js'
import createContainer from './containerFactory.js'
import decodeDockerStream from './dockerHelper.js'

async function runCpp(code: string, inputTestCase: string) {

    const rawLogBuffer: Buffer[] = []

    console.log("initialising a new java container")
    const runCommand = `echo '${code.replace(/'/g, `'\\*'`)}' > main.cpp && g++ main.cpp -o main && echo '${inputTestCase.replace(/'/g, `'\\*'`)}' | stdbuf -oL -eL ./main`;
    // const pythonDockerContainer = await createContainer(PYTHON_IMAGE, ['python3','-c', code, 'stty -echo']);
    const cppDockerContainer = await createContainer(CPP_IMAGE, ['/bin/sh', '-c', runCommand]);
    // starting / booting the corresponding docker container.
    await cppDockerContainer.start();

    console.log("Started the docker container");

    const loggerStream = await cppDockerContainer.logs({
        stdout: true,
        stderr: true,
        timestamps: false,
        follow: true, // wheather the logs are streamed or returned as a string
    });

    //Attach events on the streams object to start and stop reading
    loggerStream.on('data', (chunk) => {
        rawLogBuffer.push(chunk); 
    });

    const response = await new Promise((res, _) => {
        loggerStream.on('end',() => {
            console.log(rawLogBuffer);
            const completeBuffer = Buffer.concat(rawLogBuffer);
            const decodeStream = decodeDockerStream(completeBuffer);
            console.log(decodeStream);
            res(decodeStream);
        });
    });

    await cppDockerContainer.remove();
    return response;
}

export default runCpp;