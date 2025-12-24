import express from 'express';

import serverConfig from './config/server.config.js';
import apiRouter from './routes/index.js';

const app = express();


app.use('/api', apiRouter);


app.listen(serverConfig.PORT, () => {
    console.log('server started at *:' + 3000);
});
