import { Router, Request, Response } from 'express';

const router = Router();

/**
 * Handle login requests.
 */
router.post('/login', async (req: Request, res: Response) => {
    res.send({});
});

export default router;
