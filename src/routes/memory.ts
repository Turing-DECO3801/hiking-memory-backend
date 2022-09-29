import { Router, Request, Response } from 'express';
import { getAMemo, updateAudioPointer, updateImagePointer, updateNotes, updateTranscription } from '../services/database';
import { deleteAudio, uploadAudio, uploadImage } from '../services/s3';

import { v4 as uuidv4 } from 'uuid';

const router = Router();

router.post('/:memoId/notes', async (req: Request, res: Response) => {
    const userId = 1;
    const memoId = req.query.memoId;
    const value = req.body.value;

    const result = await updateNotes(userId, memoId, value);
    if (result.error) {
        res.status(500).send(result.error);
    } 

    if (result.affectedRows === 0) {
        res.send(false);
    }

    res.send(true);
});

router.post('/:memoId/audio', async (req: Request, res: Response) => {
    const userId = 1;
    const memoId = req.query.memoId;
    const value = req.body.value;

    const audioName = uuidv4();

    // Upload to S3
    const s3Result = await uploadAudio(audioName, value);
    if (s3Result.error) {
        res.status(500).send(s3Result.error);
    }

    // Update reference in database
    const dbResult = await updateAudioPointer(userId, memoId, audioName);
    if (dbResult.error) {
        res.status(500).send(dbResult.error);
    }

    if (dbResult.affectedRows === 0) {
        res.send(false);
    }

    res.send(true);
});

router.delete('/:memoId/audio', async (req: Request, res: Response) => {
    const userId = 1;
    const memoId = req.query.memoId;

    const memo = await getAMemo(userId, memoId);
    const audioName = memo.audio;

    const s3Result = await deleteAudio(audioName);
    if (s3Result.error) {
        res.status(500).send(s3Result.error);
    }

    res.send(true);
});

router.post('/:memoId/image', async (req: Request, res: Response) => {
    const userId = 1;
    const memoId = req.query.memoId;
    const value = req.body.value;

    const ImageName = uuidv4();

    // Upload to S3
    const s3Result = await uploadImage(ImageName, value);
    if (s3Result.error) {
        res.status(500).send(s3Result.error);
    }

    // Update reference in database
    const dbResult = await updateImagePointer(userId, memoId, ImageName);
    if (dbResult.error) {
        res.status(500).send(dbResult.error);
    }

    if (dbResult.affectedRows === 0) {
        res.send(false);
    }

    res.send(true);
});

router.delete('/:memoId/image', async (req: Request, res: Response) => {
    const userId = 1;
    const memoId = req.query.memoId;

    const memo = await getAMemo(userId, memoId);
    const imageName = memo.image;

    const s3Result = await deleteAudio(imageName);
    if (s3Result.error) {
        res.status(500).send(s3Result.error);
    }

    res.send(true);
});

router.post('/:memoId/transcription', async (req: Request, res: Response) => {
    const userId = 1;
    const memoId = req.query.memoId;
    const value = req.body.value;

    const result = await updateTranscription(userId, memoId, value);
    if (result.error) {
        res.status(500).send(result.error);
    } 

    if (result.affectedRows === 0) {
        res.send(false);
    } 

    res.send(true);
});

export default router;
