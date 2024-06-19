import express from 'express';
import prisma from '../client';

const router = express.Router();

/**
 * Returns all users
 */

router.get('/api/users', async (req, res) => {
    // TODO: Remove password

    const allUsers = await prisma.user.findMany();

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
