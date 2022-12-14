import { NextFunction, Request, Response } from 'express';

/**
 * Adds CORS onto response
 * @param req Request
 * @param res Response
 * @param next Next middleware
 */
export const cors = (req: Request, res: Response, next: NextFunction) => {
    // Add CORS headers
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', '*');

    // Allow all options requests
    if ('OPTIONS' === req.method) {
        res.send(200);
    } else {
        next();
    }
};
