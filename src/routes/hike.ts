import { Router, Request, Response } from 'express';
import { deleteAHike, getAllHikes, getAHike, favouriteAHike, getAllMemosForHike, updateHikeName, updateHikeViewedStatus, updateHikeDistance } from '../services/database';
import { getAudioUrl, getGPSLogs, getImageUrl } from '../services/s3';

const router = Router();

/** Get all hikes */
router.get('/', async (req: Request, res: Response) => {
    const actualEmail = req.headers.actualEmail as string;

    if (!actualEmail) {
        res.status(400).send({ error: 'User does not exist' });
        return;
    }

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

    if (!actualEmail) {
        res.status(400).send({ error: 'User does not exist' });
        return;
    }
    
    const response = {hike: null, memos: null, logs: null};

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
    response.logs = gpsLogs;

    const allMemos = await getAllMemosForHike(hikeId);
    if (allMemos.error) {
        res.status(500).send({ error: 'Unknown error' });
        return;
    }

    // Generate URLs for files
    for (const memo of allMemos) {
        let imageUrl;
        let audioUrl;
        if (memo.image) {
            imageUrl = await getImageUrl(memo.image);
        }
        if (memo.audio) {
            audioUrl = await getAudioUrl(memo.audio);
        }

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

    if (!actualEmail) {
        res.status(400).send({ error: 'User does not exist' });
        return;
    }

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

/** Update hike's name */
router.put('/:id/name', async (req: Request, res: Response) => {
    const actualEmail = req.headers.actualEmail as string;
    const hikeId = req.params.id;
    const value = req.body.value;

    if (!actualEmail) {
        res.status(400).send({ error: 'User does not exist' });
        return;
    }

    const result = await updateHikeName(actualEmail, hikeId, value);
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

/** Update distance */
router.put('/:id/distance', async (req: Request, res: Response) => {
    const actualEmail = req.headers.actualEmail as string;
    const hikeId = req.params.id;
    const value = req.body.value;

    if (!actualEmail) {
        res.status(400).send({ error: 'User does not exist' });
        return;
    }

    const result = await updateHikeDistance(actualEmail, hikeId, value);
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

/** Favourite a hike */
router.put('/:id/favourite', async (req: Request, res: Response) => {
    const actualEmail = req.headers.actualEmail as string;
    const hikeId = req.params.id;
    const value = req.body.value;

    if (!actualEmail) {
        res.status(400).send({ error: 'User does not exist' });
        return;
    }

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

/** Update a hike's view status */
router.put('/:id/viewed', async (req: Request, res: Response) => {
    const actualEmail = req.headers.actualEmail as string;
    const hikeId = req.params.id;
    const value = req.body.value;

    if (!actualEmail) {
        res.status(400).send({ error: 'User does not exist' });
        return;
    }

    const result = await updateHikeViewedStatus(actualEmail, hikeId, value);
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
