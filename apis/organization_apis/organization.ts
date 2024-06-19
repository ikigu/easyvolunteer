import express from 'express';
import prisma from '../client';
import { Prisma } from '@prisma/client';

const router = express.Router();

router.get('/api/organizations', async (req, res, next) => {
    // TODO: Create error handling middleware for this
    try {
        const allOrganizations = await prisma.organization.findMany();
        return res.json(allOrganizations);
    } catch (e) {
        next(e);
    }
});

router.get('/api/organizations/:organizationId', async (req, res, next) => {
    try {
        const organization = await prisma.organization.findUnique({
            where: {
                id: req.params.organizationId
            }
        });

        if (!organization) {
            return res.status(404).json({ error: 'Not found' });
        }

        return res.json(organization);
    } catch (e) {
        next(e);
    }
});

router.post('/api/organizations', async (req, res, next) => {
    const requiredFields = ['name', 'userId'];

    for (const field of requiredFields) {
        if (!req.body[field]) {
            return res.status(400).json({ error: `No ${field}` });
        }
    }

    // TODO: Only allow the following fields ['town', 'description', 'industry']
    for (const key in req.body) {
        if (!requiredFields.includes(key)) {
            delete req.body[key];
        }
    }

    try {
        const organizationCreator = await prisma.user.findUnique({
            where: {
                id: req.body.userId
            }
        });

        if (!organizationCreator) {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (e) {
        next(e);
    }

    try {
        const organization = await prisma.organization.create({
            data: req.body
        });

        return res.json(organization);
    } catch (e) {
        next(e);
    }
});

router.put('/api/organizations/:organizationId', async (req, res, next) => {
    try {
        const organization = await prisma.organization.findUnique({
            where: {
                id: req.params.organizationId
            }
        });

        if (!organization) {
            return res.status(404).json({ error: 'Organization not found' });
        }
    } catch (e) {
        next(e);
    }

    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'No items to update' });
    }

    const allowedFields = ['name', 'town', 'industry', 'description', 'userId'];

    for (const key in req.body) {
        if (!allowedFields.includes(key)) {
            return res.status(400).json({
                error: `'${key}' key doesn't exist on organizations or is not updateable`
            });
        }
    }

    req.body.updatedAt = new Date();

    try {
        const organization = await prisma.organization.update({
            where: {
                id: req.params.organizationId
            },
            data: req.body
        });

        res.json(organization);
    } catch (e) {
        next(e);
    }
});

router.delete('/api/organizations/:organizationId', async (req, res, next) => {
    // TODO: This method should require authorization

    try {
        await prisma.organization.delete({
            where: {
                id: req.params.organizationId
            }
        });

        return res.json({});
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2025') {
                return res
                    .status(404)
                    .json({ error: 'Record to delete does not exist' });
            }
        }

        next(e);
    }
});

export default router;
