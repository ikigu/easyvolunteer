import express from 'express';
import prisma from '../client';

const router = express.Router();

router.get('/api/events', async (req, res, next) => {
    // Return all events

    try {
        const allEvents = await prisma.event.findMany();

        return res.json(allEvents);
    } catch (e) {
        next(e);
    }
});

router.get('/api/events/:eventId', async (req, res, next) => {
    // Return event of eventId if it exists

    try {
        const event = await prisma.event.findUnique({
            where: {
                id: req.params.eventId
            }
        });

        if (event) return res.json(event);

        return res.status(404).json({ error: 'Not found' });
    } catch (e) {
        next(e);
    }
});

router.post('/api/events', async (req, res, next) => {
    // Check if all required fields have been assigned
    const requiredFields = [
        'creatorId',
        'organizationId',
        'title',
        'startTime',
        'endTime',
        'cost'
    ];

    for (const field of requiredFields) {
        if (!req.body[field]) {
            return res
                .status(400)
                .json({ error: `Required field not provided: ${field}` });
        }
    }

    // Check if user exists

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.body.creatorId
            },
            include: {
                organizations: true
            }
        });

        if (!user) return res.status(404).json({ error: 'User not found' });

        let organizationExists = false;

        for (const organization of user.organizations) {
            if (organization.id === req.body.organizationId) {
                organizationExists = true;
            }
        }

        if (!organizationExists)
            return res.status(404).json({ error: 'Organization not found' });
    } catch (e) {
        next(e);
    }

    // Check if org exists

    // Delete unallowed fields

    for (const key in req.body) {
        if (!requiredFields.includes(key)) {
            delete req.body[key];
        }
    }

    // Create the event

    try {
        const event = await prisma.event.create({
            data: req.body
        });

        return res.json(event);
    } catch (e) {
        next(e);
    }
});

export default router;
