// import Docker from 'dockerode';

// import type { TestCases } from '../types/testCases.js';
import { JAVA_IMAGE } from '../utils/constanst.js'
import createContainer from './containerFactory.js'
import decodeDockerStream from './dockerHelper.js'

async function runJava(code: string, inputTestCase: string) {

    const rawLogBuffer: Buffer[] = []

    console.log("initialising a new java container")
    const runCommand = `echo '${code.replace(/'/g, `'\\*'`)}' > Main.java && javac Main.java && echo '${inputTestCase.replace(/'/g, `'\\*'`)}' | java Main`;
    // const pythonDockerContainer = await createContainer(PYTHON_IMAGE, ['python3','-c', code, 'stty -echo']);
    const javaDockerContainer = await createContainer(JAVA_IMAGE, ['/bin/sh', '-c', runCommand]);
    // starting / booting the corresponding docker container.
    await javaDockerContainer.start();

    console.log("Started the docker container");

    const loggerStream = await javaDockerContainer.logs({
        stdout: true,
        stderr: true,
        timestamps: false,
        follow: true, // wheather the logs are streamed or returned as a string
    });

    //Attach events on the streams object to start and stop reading
    loggerStream.on('data', (chunk) => {
        rawLogBuffer.push(chunk); 
    });

    await new Promise((res, _) => {
        loggerStream.on('end',() => {
            console.log(rawLogBuffer);
            const completeBuffer = Buffer.concat(rawLogBuffer);
            const decodeStream = decodeDockerStream(completeBuffer);
            console.log(decodeStream);
            res(decodeDockerStream);
        });
    });

    await javaDockerContainer.remove();
}

export default runJava;