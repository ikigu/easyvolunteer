import express from 'express';
import prisma from '../client';

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

export default router;
