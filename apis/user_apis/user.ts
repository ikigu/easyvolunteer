import bcrypt from 'bcrypt';
import express from 'express';
import prisma from '../client';
import { Prisma } from '@prisma/client';

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

router.delete('/api/users/:userId', async (req, res) => {
    //TODO: Check content of deletionIsSuccessful
    //TODO: This method might require an auth token

    try {
        const deletionIsSuccessful = await prisma.user.delete({
            where: {
                id: req.params.userId
            }
        });
        return res.json(deletionIsSuccessful);
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2001') {
                return res.status(404).json({ error: 'User not found' });
            }
        } else {
            return res.status(500).json({ error: 'Something went wrong' });
        }
    }
});

router.put('/api/users/:userId', async (req, res) => {
    // TODO: profilePhotoUrl will require additional logic
    // TODO: birthday might require a typecheck?

    const allowedFields = [
        'firstName',
        'lastName',
        'email',
        'password',
        'profilePhotoUrl',
        'birthday',
        'phoneNumber',
        'streetName',
        'houseName',
        'houseNumber',
        'town'
    ];

    for (const key in req.body) {
        if (!allowedFields.includes(key)) {
            delete req.body[key];
        }
    }

    if ('password' in req.body) {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    req.body.updatedAt = new Date();

    try {
        const updateIsSuccessful = await prisma.user.update({
            where: {
                id: req.params.userId
            },
            data: req.body
        });

        res.json(updateIsSuccessful);
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2001') {
                res.status(404).json({ error: 'User not found' });
            }
        } else {
            res.status(500).json({ error: 'Something went wrong' });
        }
    }
});

export default router;
