import express, { Request, Response } from 'express';
import authRoute from './auth';
import singleViewRoute from './singleView';
import allViewRoute from './allView';

const router = express.Router();

// Health check
router.get('/', (req: Request, res: Response) => {
    res.send('Ok');
});

// Connect routes
router.use('/auth', authRoute);
router.use('/singleView', singleViewRoute)
router.use('./allViewRoute', allViewRoute);

export default router;
