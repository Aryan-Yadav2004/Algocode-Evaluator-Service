import Docker from 'dockerode'

async function createContainer(imageName: string, cmdExecutable: string[]) {
    const docker = new Docker()

    const container = await docker.createContainer({
        Image: imageName,
        Cmd: cmdExecutable,
        AttachStdin: true, // to enable input stream
        AttachStdout: true,// to enable output stream
        AttachStderr: true,// to enable error stream
        Tty: false,
    })
    return container
}

export default createContainer