import { Router, Request, Response } from 'express';

const router = Router();

router.get('/hikes', async (req: Request, res: Response) => {
    res.send({});
});

export default router;