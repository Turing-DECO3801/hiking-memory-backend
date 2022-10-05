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
    const hikeId = req.params.id;
    
    const response = {hike: null, logs: null, memos: null};

    const hike = await getAHike(actualEmail, hikeId);
    if (hike.error) {
        res.status(500).send({ error: 'Unknown error' });
        return;
    }
    response.hike = hike[0];

    const gpsLogs = await getGPSLogs(hike[0].gps_logs);
    if (gpsLogs.error) {
        res.status(500).send({ error: 'Unknown error' });
        return;
    }
    response.logs = gpsLogs.Body.data;

    const allMemos = await getAllMemos(hikeId);
    if (allMemos.error) {
        res.status(500).send({ error: 'Unknown error' });
        return;
    }

    // Generate URLs for files
    for (const memo of allMemos) {
        const imageUrl = await getImageUrl(memo.image);
        const audioUrl = await getAudioUrl(memo.audio);
        memo.imageUrl = imageUrl;
        memo.audioUrl = audioUrl;
    }
    response.memos = allMemos;

    res.send(response);
});

/** Delete a hike */
router.delete('/:id', async (req: Request, res: Response) => {
    const actualEmail = req.headers.actualEmail as string;
    const hikeId = req.params.id;

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
    const hikeId = req.params.id;
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
