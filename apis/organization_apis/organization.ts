import express from 'express';
import prisma from '../client';
import { nextTick } from 'process';

const router = express.Router();

router.get('/api/organizations', async (req, res, next) => {
    // TODO: Create error handling middleware for this
    try {
        const allOrganizations = await prisma.organization.findMany();
        res.json(allOrganizations);
    } catch (e) {
        next(e);
    }
});

export default router;
