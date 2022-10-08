import express, { Request, Response } from 'express';
import authRoute from './auth';
import memoryRoute from './memory';
import hikeRoute from './hike';
import statRoute from './stats';

const router = express.Router();

// Health check
router.get('/', (req: Request, res: Response) => {
    res.send('Ok');
});

// Connect routes
router.use('/auth', authRoute);
router.use('/hikes', hikeRoute);
router.use('/memos', memoryRoute);
router.use('/stats', statRoute);

export default router;
