import { Router, Request, Response } from 'express';
import { getAMemo, updateAudioPointer, updateImagePointer, updateNotes, updateTranscription } from '../services/database';
import { deleteAudio, uploadAudio, uploadImage } from '../services/s3';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

/**
 * Update notes
 */
router.post('/:memoId/notes', async (req: Request, res: Response) => {
    const actualEmail = req.headers.actualEmail as string;
    const memoId = req.params.memoId;
    const value = req.body.value;

    if (!actualEmail) {
        res.status(400).send({ error: 'User does not exist' });
        return;
    }

    const result = await updateNotes(memoId, value);
    if (result.error) {
        res.status(500).send({ error: 'Unknown error' });
        return;
    } 

    if (result.affectedRows === 0) {
        res.send({ result: true });
        return;
    }

    res.send({ result: true });
});

/**
 * Upload audio
 */
router.post('/:memoId/audio', async (req: Request, res: Response) => {
    const actualEmail = req.headers.actualEmail as string;
    const memoId = req.params.memoId;
    const value = Buffer.from(req.body.value, 'binary');

    if (!actualEmail) {
        res.status(400).send({ error: 'User does not exist' });
        return;
    }

    const audioName = uuidv4();

    // Upload to S3
    const s3Result = await uploadAudio(audioName, value);
    if (s3Result.error) {
        res.status(500).send({ error: 'Unknown error' });
        return;
    }

    // Update reference in database
    const dbResult = await updateAudioPointer(memoId, audioName);
    if (dbResult.error) {
        res.status(500).send({ error: 'Unknown error' });
        return;
    }

    if (dbResult.affectedRows === 0) {
        res.status(500).send({ error: 'Unknown error' });
        return;
    }

    res.send({ result: true });
});

/**
 * Delete audio
 */
router.delete('/:memoId/audio', async (req: Request, res: Response) => {
    const actualEmail = req.headers.actualEmail as string;
    const memoId = req.params.memoId;

    if (!actualEmail) {
        res.status(400).send({ error: 'User does not exist' });
        return;
    }

    const memo = await getAMemo(memoId);
    const audioName = memo.audio;

    const s3Result = await deleteAudio(audioName);
    if (s3Result.error) {
        res.status(500).send({ error: 'Unknown error' });
        return;
    }

    res.send({ result: true });
});

/**
 * Upload image
 */
router.post('/:memoId/image', async (req: Request, res: Response) => {
    const actualEmail = req.headers.actualEmail as string;
    const memoId = req.params.memoId;
    const value = Buffer.from(req.body.value, 'binary');

    if (!actualEmail) {
        res.status(400).send({ error: 'User does not exist' });
        return;
    }

    const ImageName = uuidv4();

    // Upload to S3
    const s3Result = await uploadImage(ImageName, value);
    if (s3Result.error) {
        res.status(500).send({ error: 'Unknown error' });
        return;
    }

    // Update reference in database
    const dbResult = await updateImagePointer(memoId, ImageName);
    if (dbResult.error) {
        res.status(500).send({ error: 'Unknown error' });
        return;
    }

    if (dbResult.affectedRows === 0) {
        res.status(500).send({ error: 'Unknown error' });
        return;
    }

    res.send({ result: true });
});

/**
 * Delete image
 */
router.delete('/:memoId/image', async (req: Request, res: Response) => {
    const actualEmail = req.headers.actualEmail as string;
    const memoId = req.params.memoId;

    if (!actualEmail) {
        res.status(400).send({ error: 'User does not exist' });
        return;
    }

    const memo = await getAMemo(memoId);
    const imageName = memo.image;

    const s3Result = await deleteAudio(imageName);
    if (s3Result.error) {
        res.status(500).send({ error: 'Unknown error' });
        return;
    }

    res.send({ result: true });
});

/**
 * Update audio transcription
 */
router.post('/:memoId/transcription', async (req: Request, res: Response) => {
    const actualEmail = req.headers.actualEmail as string;
    const memoId = req.params.memoId;
    const value = req.body.value;

    if (!actualEmail) {
        res.status(400).send({ error: 'User does not exist' });
        return;
    }

    const result = await updateTranscription(memoId, value);
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

export default router;
