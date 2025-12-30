import type { ErrorRequestHandler, NextFunction,Request, Response } from "express";

import logger from "../config/logger.config.js";

function errorHandler (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) : Response {
    logger.error('Something went wrong');
    return res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: err,
        data: {} // because this is an exception so no data is going to be provide
    });
}

export default errorHandler;