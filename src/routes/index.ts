import express, { Request, Response } from 'express';
import authRoute from './auth';
import memoryRoute from './memory';
import hikeRoute from './hike';

const router = express.Router();

// Health check
router.get('/', (req: Request, res: Response) => {
    res.send('Ok');
});

// Connect routes
router.use('/auth', authRoute);
router.use('/hike', hikeRoute);
router.use('/memory', memoryRoute);

export default router;
