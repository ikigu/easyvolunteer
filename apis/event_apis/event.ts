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
