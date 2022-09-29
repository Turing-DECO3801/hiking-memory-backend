import { Router, Request, Response } from 'express';
import { deleteAHike, getAllHikes, getAHike, favouriteAHike, getAllMemos } from '../services/database';
import { getAudioUrl, getImageUrl } from '../services/s3';

const router = Router();

/** Get all hikes */
router.get('/hikes', async (req: Request, res: Response) => {
    // TODO: Get actual userId when authentication is set up
    const userId = 1;

    const allHikes = await getAllHikes(userId);
    if (allHikes.error) {
        res.status(500).send(allHikes.error);
    }

    res.send(allHikes);
});

/** Get a hike */
router.get('/hike/:id', async (req: Request, res: Response) => {
    const userId = 1;
    const hikeId = req.query.id;

    const hike = await getAHike(userId, hikeId);
    if (hike.error) {
        res.status(500).send(hike.error);
    }

    const allMemos = await getAllMemos(userId, hikeId);
    if (allMemos.error) {
        res.status(500).send(hike.error);
    }

    // Generate URLs for files
    await Promise.all(allMemos.forEach((memo) => {
        memo.imageUrl = getImageUrl(memo.image);
        memo.audioUrl = getAudioUrl(memo.audio);
    }));
    hike.memo = allMemos;

    res.send(hike);
});

/** Delete a hike */
router.delete('/hike/:id', async (req: Request, res: Response) => {
    const userId = 1;
    const hikeId = req.query.id;

    const result = await deleteAHike(userId, hikeId);
    if (result.error) {
        res.status(500).send(result.error);
    }

    if (result.affectedRows === 0) {
        res.send(false);
    } 

    res.send(true);
});

/** Favourite a hike */
router.put('/hike/:id/favourite', async (req: Request, res: Response) => {
    const userId = 1;
    const hikeId = req.query.id;
    const value = req.body.value;

    const result = await favouriteAHike(userId, hikeId, value);
    if (result.error) {
        res.status(500).send(result.error);
    } 

    if (result.affectedRows === 0) {
        res.send(false);
    } 

    res.send(true);
});

export default router;
