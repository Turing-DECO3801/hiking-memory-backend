import { Router, Request, Response } from 'express';
import { validateEmail } from '../helper/utils';
import { addNewUser, checkEmailExist, getUser } from '../services/database';

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        res.status(400).send({ error: 'Invalid login details' });
        return;
    }

    const user = await getUser(email, password);
    if (user.error) {
        res.status(500).send({ error: 'Unknown error' });
        return;
    }

    if (user.length > 0) {
        res.send(true);
        return;
    } 

    res.send(false);
});

router.post('/signup', async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;

    if (password.length > 32) {
        res.status(400).send('Password is too long');
        return;
    }

    const valid = validateEmail(email);
    if (!valid) {
        res.status(400).send('Email format is invalid');
        return;
    }

    const user = await checkEmailExist(email);
    if (user) {
        res.status(409).send('Email already exists');
        return;
    }

    const result = await addNewUser(email, password);
    if (result.error) {
        res.status(500).send({ error: 'Unknown error' });
        return;
    }

    res.send(true);
});

export default router;
