import bcrypt from 'bcrypt';
import express from 'express';
import prisma from '../client';
import { error } from 'node:console';

const router = express.Router();

/**
 * Returns all users
 */

router.get('/api/users', async (req, res) => {
    const allUsers: any = await prisma.user.findMany();

    for (const user of allUsers) {
        delete user.password;
    }

    res.json(allUsers);
});

router.get('/api/users/:userid', async (req, res) => {
    const user: any = await prisma.user.findUnique({
        where: {
            id: req.params.userid
        }
    });

    if (!user) {
        return res.status(404).json({ error: 'Not found' });
    }

    delete user.password;

    return res.json(user);
});

router.post('/api/users', async (req, res) => {
    const requiredData: string[] = [
        'firstName',
        'lastName',
        'email',
        'password'
    ];

    for (const data of requiredData) {
        if (!req.body[data]) {
            res.status(400).json({ error: `No ${data}` });
        }
    }

    for (const key in req.body) {
        if (!requiredData.includes(key)) {
            delete req.body[key];
        }
    }

    req.body.password = bcrypt.hashSync(req.body.password, 10);

    let user;

    try {
        user = await prisma.user.create({
            data: req.body
        });
    } catch {
        res.status(500).json({ error: 'Something went wrong!' });
    }

    const userWithoutPassword = user as any;
    delete userWithoutPassword.password;

    return res.json(userWithoutPassword);
});

export default router;
