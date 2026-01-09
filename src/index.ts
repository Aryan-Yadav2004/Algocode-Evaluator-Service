import bodyParser from "body-parser"
import express from 'express'

import serverConfig from './config/server.config.js'
import runPython from './containers/runPythonDocker.js'
import sampleQueueProducer from './producers/sampleQueueProducer.js'
import apiRouter from './routes/index.js'
import errorHandler from './utils/errorHandler.js'
import { SampleWorker } from './workers/SampleWorker.js'
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(bodyParser.text())

app.use('/api', apiRouter)

app.use(errorHandler)


app.listen(serverConfig.PORT, () => {
    console.log('server started at *:' + 3000)
    SampleWorker('SampleQueue')

    sampleQueueProducer('SampleJob',{
        name: 'Ayush',
        company: 'Microsoft',
        position: 'SDE L61',
        loaction: 'Remote | BLR | Nodia'
    },2).then(res => console.log(res + 'hi')).catch(err => console.log(err))

    sampleQueueProducer('SampleJob',{
        name: 'Aryan',
        company: 'Microsoft',
        position: 'SDE L61',
        loaction: 'Remote | BLR | Nodia'
    },1).then(res => console.log(res + 'hi')).catch(err => console.log(err))
   
   const code = `x = input()
y = input()
print("value of x is", x)
print("value of y is", y)  
`

    const inputTestCase = '100\n200';

    runPython(code, inputTestCase);

})
