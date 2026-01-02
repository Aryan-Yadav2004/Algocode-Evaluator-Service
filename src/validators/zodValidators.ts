import z from 'zod';
import type { Request, Response, NextFunction } from 'express';
export const validateCreateSubmissionDto = (schema: z.ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            ...req.body
        });

        next();
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: 'Bad request',
            data: {},
            error: error,
        });
    }
}