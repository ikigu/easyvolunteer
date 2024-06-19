import express from 'express';
import prisma from '../client';

const router = express.Router();

router.get('api/events', async (req, res, next) => {
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
