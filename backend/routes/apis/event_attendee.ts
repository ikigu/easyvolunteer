import express from 'express';
import prisma from './client';
import { Prisma } from '@prisma/client';
import {
    getEventAttendeeById,
    getEventAttendeesByEventIdandRoleType,
    createEventAttendee,
    deleteEventAttendeeById
} from '../../controllers/event_attendee';

const router = express.Router();

router.post('/api/event_attendees/', createEventAttendee);

router.get('/api/event_attendees', getEventAttendeesByEventIdandRoleType);

router.get('/api/event_attendees/:id', getEventAttendeeById);

router.delete('/api/event_attendees/:id', deleteEventAttendeeById);

export default router;
