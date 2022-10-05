import { Router, Request, Response } from 'express';
import { deleteAHike, getAllHikes, getAHike, favouriteAHike, getAllMemos } from '../services/database';
import { getAudioUrl, getGPSLogs, getImageUrl } from '../services/s3';

const router = Router();

/** Get all hikes */
router.get('/', async (req: Request, res: Response) => {
    const actualEmail = req.headers.actualEmail as string;

    const allHikes = await getAllHikes(actualEmail);
    if (allHikes.error) {
        res.status(500).send({ error: 'Unknown error' });
        return;
    }

    res.send(allHikes);
});

/** Get a hike */
router.get('/:id', async (req: Request, res: Response) => {
    const actualEmail = req.headers.actualEmail as string;
    const hikeId = req.query.id;

    const hike = await getAHike(actualEmail, hikeId);
    if (hike.error) {
        res.status(500).send({ error: 'Unknown error' });
        return;
    }

    const gpsLogs = await getGPSLogs(hike.gps_logs);
    if (gpsLogs.error) {
        res.status(500).send({ error: 'Unknown error' });
        return;
    }

    // Add logs
    hike.logs = gpsLogs;

    const allMemos = await getAllMemos(actualEmail, hikeId);
    if (allMemos.error) {
        res.status(500).send({ error: 'Unknown error' });
        return;
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
router.delete('/:id', async (req: Request, res: Response) => {
    const actualEmail = req.headers.actualEmail as string;
    const hikeId = req.query.id;

    const result = await deleteAHike(actualEmail, hikeId);
    if (result.error) {
        res.status(500).send({ error: 'Unknown error' });
        return;
    }

    if (result.affectedRows === 0) {
        res.status(500).send({ error: 'Unknown error' });
        return;
    } 

    res.send({ result: true });
});

/** Favourite a hike */
router.put('/:id/favourite', async (req: Request, res: Response) => {
    const actualEmail = req.headers.actualEmail as string;
    const hikeId = req.query.id;
    const value = req.body.value;

    const result = await favouriteAHike(actualEmail, hikeId, value);
    if (result.error) {
        res.status(500).send({ error: result.error });
        return;
    } 

    if (result.affectedRows === 0) {
        res.status(500).send({ error: 'Unknown error' });
        return;
    } 

    res.send({ result: true });
});

export default router;
