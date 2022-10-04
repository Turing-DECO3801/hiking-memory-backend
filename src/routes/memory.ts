import { Router, Request, Response } from 'express';
import { getAMemo, updateAudioPointer, updateImagePointer, updateNotes, updateTranscription } from '../services/database';
import { deleteAudio, uploadAudio, uploadImage } from '../services/s3';

import { v4 as uuidv4 } from 'uuid';

const router = Router();

router.post('/:memoId/notes', async (req: Request, res: Response) => {
    const actualEmail = req.headers.actualEmail as string;
    const memoId = req.query.memoId;
    const value = req.body.value;

    const result = await updateNotes(actualEmail, memoId, value);
    if (result.error) {
        res.status(500).send({ error: 'Unknown error' });
        return;
    } 

    if (result.affectedRows === 0) {
        res.send(false);
        return;
    }

    res.send(true);
});

router.post('/:memoId/audio', async (req: Request, res: Response) => {
    const actualEmail = req.headers.actualEmail as string;
    const memoId = req.query.memoId;
    const value = req.body.value;

    const audioName = uuidv4();

    // Upload to S3
    const s3Result = await uploadAudio(audioName, value);
    if (s3Result.error) {
        res.status(500).send({ error: 'Unknown error' });
        return;
    }

    // Update reference in database
    const dbResult = await updateAudioPointer(actualEmail, memoId, audioName);
    if (dbResult.error) {
        res.status(500).send({ error: 'Unknown error' });
        return;
    }

    if (dbResult.affectedRows === 0) {
        res.status(500).send({ error: 'Unknown error' });
        return;
    }

    res.send(true);
});

router.delete('/:memoId/audio', async (req: Request, res: Response) => {
    const actualEmail = req.headers.actualEmail as string;
    const memoId = req.query.memoId;

    const memo = await getAMemo(actualEmail, memoId);
    const audioName = memo.audio;

    const s3Result = await deleteAudio(audioName);
    if (s3Result.error) {
        res.status(500).send({ error: 'Unknown error' });
        return;
    }

    res.send(true);
});

router.post('/:memoId/image', async (req: Request, res: Response) => {
    const actualEmail = req.headers.actualEmail as string;
    const memoId = req.query.memoId;
    const value = req.body.value;

    const ImageName = uuidv4();

    // Upload to S3
    const s3Result = await uploadImage(ImageName, value);
    if (s3Result.error) {
        res.status(500).send({ error: 'Unknown error' });
        return;
    }

    // Update reference in database
    const dbResult = await updateImagePointer(actualEmail, memoId, ImageName);
    if (dbResult.error) {
        res.status(500).send({ error: 'Unknown error' });
        return;
    }

    if (dbResult.affectedRows === 0) {
        res.status(500).send({ error: 'Unknown error' });
        return;
    }

    res.send(true);
});

router.delete('/:memoId/image', async (req: Request, res: Response) => {
    const actualEmail = req.headers.actualEmail as string;
    const memoId = req.query.memoId;

    const memo = await getAMemo(actualEmail, memoId);
    const imageName = memo.image;

    const s3Result = await deleteAudio(imageName);
    if (s3Result.error) {
        res.status(500).send({ error: 'Unknown error' });
        return;
    }

    res.send(true);
});

router.post('/:memoId/transcription', async (req: Request, res: Response) => {
    const actualEmail = req.headers.actualEmail as string;
    const memoId = req.query.memoId;
    const value = req.body.value;

    const result = await updateTranscription(actualEmail, memoId, value);
    if (result.error) {
        res.status(500).send({ error: 'Unknown error' });
        return;
    } 

    if (result.affectedRows === 0) {
        res.status(500).send({ error: 'Unknown error' });
        return;
    } 

    res.send(true);
});

export default router;
