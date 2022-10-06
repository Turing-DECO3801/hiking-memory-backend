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
        res.send({ user: user[0], result: true });
        return;
    } 

    res.send({ result: false });
});

router.post('/signup', async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    if (!email || !password || !name) {
        res.status(400).send({ error: 'Missing details' });
        return;
    }

    if (password.length > 32) {
        res.status(400).send({ error: 'Password is too long' });
        return;
    }

    const valid = validateEmail(email);
    if (!valid) {
        res.status(400).send({ error: 'Email format is invalid' });
        return;
    }

    const user = await checkEmailExist(email);
    if (user.length > 0) {
        res.status(409).send({ error: 'Email already exists' });
        return;
    }

    const result = await addNewUser(email, password, name);
    if (result.error) {
        res.status(500).send({ error: 'Unknown error' });
        return;
    }

    res.send({ result: true });
});

export default router;
