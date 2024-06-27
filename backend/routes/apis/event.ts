import express from 'express';
import { Prisma } from '@prisma/client';
import {
    getAllEvents,
    getEventById,
    updateEventById,
    deleteEventById,
    createNewEvent
} from '../../controllers/event';

const router = express.Router();

router.get('/api/events', getAllEvents);

router.get('/api/events/:eventId', getEventById);

router.post('/api/events', createNewEvent);

/**
 * @todo: This method should check for some authorization
 */

router.put('/api/events/:eventId', updateEventById);

router.delete('/api/events/:eventId', deleteEventById);

export default router;
