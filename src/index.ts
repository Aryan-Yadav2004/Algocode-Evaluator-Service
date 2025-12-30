import express from 'express';

import serverConfig from './config/server.config.js';
import sampleQueueProducer from './producers/sampleQueueProducer.js';
import apiRouter from './routes/index.js';
import { SampleWorker } from './workers/SampleWorker.js';

const app = express();



app.use('/api', apiRouter);



app.listen(serverConfig.PORT, () => {
    console.log('server started at *:' + 3000);

    SampleWorker('SampleQueue');

    sampleQueueProducer('SampleJob',{
        name: 'Ayush',
        company: 'Microsoft',
        position: 'SDE L61',
        loaction: 'Remote | BLR | Nodia'
    },2).then(res => console.log(res + 'hi')).catch(err => console.log(err));

    sampleQueueProducer('SampleJob',{
        name: 'Aryan',
        company: 'Microsoft',
        position: 'SDE L61',
        loaction: 'Remote | BLR | Nodia'
    },1).then(res => console.log(res + 'hi')).catch(err => console.log(err));
});
