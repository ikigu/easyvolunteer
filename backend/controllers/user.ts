import bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import prisma from './client';

/**
 * Returns all users
 */

export const getAllUsers = async (req: any, res: any, next: any) => {
    // TODO: add try/catch block for error handling
    const allUsers: any = await prisma.user.findMany();

    for (const user of allUsers) {
        delete user.password;
    }

    res.json(allUsers);
};

export const getUserById = async (req: any, res: any, next: any) => {
    //TODO: add try/catch block for error handling
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
};

export const createUser = async (req: any, res: any, next: any) => {
    // TODO: Ensure email is correct format
    // TODO: Enforce some rules for password?

    const requiredData: string[] = [
        'firstName',
        'lastName',
        'email',
        'password'
    ];

    for (const data of requiredData) {
        if (!req.body[data]) {
            return res.status(400).json({ error: `No ${data}` });
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
        return res.status(500).json({ error: 'Something went wrong!' });
    }

    const userWithoutPassword = user as any;
    delete userWithoutPassword.password;

    return res.json(userWithoutPassword);
};

export const deleteUser = async (req: any, res: any, next: any) => {
    //TODO: This method might require an auth token
    //TODO: Correctly handle user not found case, nothing happens now weirdly

    try {
        await prisma.user.delete({
            where: {
                id: req.params.userId
            }
        });

        return res.json({});
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2001') {
                return res.status(404).json({ error: 'User not found' });
            }
        } else {
            return res.status(500).json({ error: 'Something went wrong' });
        }
    }
};

export const updateUser = async (req: any, res: any, next: any) => {
    // TODO: profilePhotoUrl will require additional logic
    // TODO: birthday might require a typecheck?

    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'No items to update' });
    }

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
        const user = await prisma.user.update({
            where: {
                id: req.params.userId
            },
            data: req.body
        });

        const userWithoutPassword = user as any;
        delete userWithoutPassword.password;

        res.json(userWithoutPassword);
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2001') {
                res.status(404).json({ error: 'User not found' });
            }
        } else {
            res.status(500).json({ error: 'Something went wrong' });
        }
    }
};
