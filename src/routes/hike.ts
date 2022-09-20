import { Router, Request, Response } from 'express';

const router = Router();

router.get('/hikes', async (req: Request, res: Response) => {
    res.send({});
});

router.get('/hike/:id', async (req: Request, res: Response) => {
    res.send({});
});

router.delete('/hike/:id', async (req: Request, res: Response) => {
    res.send({});
});

router.put('/hike/favourite', async (req: Request, res: Response) => {
    res.send({});
});

export default router;
