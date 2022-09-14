import { Router, Request, Response } from 'express';

const router = Router();

router.get('/hike/:id', async (req: Request, res: Response) => {
    res.send({});
});

router.post('/:memoId/notes', async (req: Request, res: Response) => {
    res.send({});
});

router.delete('/:memoId/notes', async (req: Request, res: Response) => {
    res.send({});``
});

router.post('/:memoId/audio', async (req: Request, res: Response) => {
    res.send({});
});

router.delete('/:memoId/audio', async (req: Request, res: Response) => {
    res.send({});
});

router.post('/:memoId/image', async (req: Request, res: Response) => {
    res.send({});
});

router.delete('/:memoId/image', async (req: Request, res: Response) => {
    res.send({});
});

router.post('/:memoId/transcription', async (req: Request, res: Response) => {
    res.send({});
});

export default router;
