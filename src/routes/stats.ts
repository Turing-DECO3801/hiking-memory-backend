import { Router, Request, Response } from 'express';
import { getAllHikePathWithImageForUser, getAllHikes } from '../services/database';
import { getImageUrl } from '../services/s3';

const router = Router();

/** Get all hikes image collection */
router.get('/path-collection', async (req: Request, res: Response) => {
    const actualEmail = req.headers.actualEmail as string;

    if (!actualEmail) {
        res.status(400).send({ error: 'User does not exist' });
        return;
    }

    const allHikePaths = await getAllHikePathWithImageForUser(actualEmail);
    for (const hike of allHikePaths) {
        if (hike.image) {
            const imageUrl = await getImageUrl(hike.image);
            hike.imageUrl = imageUrl;
        }
    }

    res.send(allHikePaths);
});

export default router;
