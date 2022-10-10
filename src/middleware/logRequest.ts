import { NextFunction, Request, Response } from 'express';

export const logRequest = async (req: Request, res: Response, next: NextFunction) => {
    // console.log(req);

    next();
};
