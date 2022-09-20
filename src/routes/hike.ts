import { Router, Request, Response } from 'express';

const router = Router();


/** Get all hikes */
router.get('/hikes', async (req: Request, res: Response) => {
    const header = req.get('Authorization');
    res.send({});
});

/** Get a hike */
router.get('/hike/:id', async (req: Request, res: Response) => {
    res.send({});
});

/** Delete a hike */
router.delete('/hike/:id', async (req: Request, res: Response) => {
    res.send({});
});

/** Favourite a hike */
router.put('/hike/favourite', async (req: Request, res: Response) => {
    res.send({});
});

export default router;
