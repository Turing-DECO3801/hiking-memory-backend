import express, { Request, Response } from 'express';
import authRoute from './auth';

const router = express.Router();

// Health check
router.get('/', (req: Request, res: Response) => {
    res.send('Ok');
});

// Connect routes
router.use('/auth', authRoute);

export default router;
