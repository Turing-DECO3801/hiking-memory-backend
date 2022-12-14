import { NextFunction, Request, Response } from 'express';
import { getUser } from '../services/database';

/**
 * Find and attach user's email onto request's header
 * @param req Request
 * @param res Response
 * @param next Next middleware
 */
export const setEmailHeader = async (req: Request, res: Response, next: NextFunction) => {
    const email = req.get('email');
    const password = req.get('password');

    const user = await getUser(email, password);

    // Setting userId in header
    user.length > 0 
        ? req.headers.actualEmail = user[0].email
        : req.headers.actualEmail = null;
    
    next();
};
