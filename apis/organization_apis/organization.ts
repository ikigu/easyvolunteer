import express from 'express';
import prisma from '../client';

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
        return res.json(organization);
    } catch (e) {
        next(e);
    }
});

export default router;
