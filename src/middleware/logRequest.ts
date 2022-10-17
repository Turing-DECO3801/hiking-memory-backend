import { NextFunction, Request, Response } from 'express';

/**
 * Console log requests
 * @param req Request
 * @param res Response
 * @param next Next middleware
 */
export const logRequest = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req);

    next();
};
