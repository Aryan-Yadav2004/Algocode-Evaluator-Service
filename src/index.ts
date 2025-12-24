import express from "express";
import serverConfig from "./config/server.config.js";
const app = express();

app.listen(serverConfig.PORT, () => {
    console.log("server started at *:" + 3000);
});

