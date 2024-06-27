import prisma from './client';
import { Prisma } from '@prisma/client';

// Create an event attendee
export const createEventAttendee = async (req: any, res: any, next: any) => {
    const requiredFields = ['userId', 'roleId', 'eventId', 'roleType'];

    for (const field of requiredFields) {
        if (!req.body[field]) {
            return res.status(404).json({ error: `No ${field}` });
        }
    }

    // Check that request body doesn't have unallowed keys

    for (const key in req.body) {
        if (!requiredFields.includes(key)) {
            return res.status(400).json({
                error: `Resource ${key} doesn't exist for event attendees`
            });
        }
    }

    // Create the record and return it to client

    try {
        const eventAttendee = await prisma.eventAttendee.create({
            data: req.body
        });

        return res.json(eventAttendee);
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2003') {
                return res
                    .status(404)
                    .json({ error: 'Event or user not found' });
            }
        }
        next(e);
    }
};

// Get all people attending an event as volunteers, participants

export const getEventAttendeesByEventIdandRoleType = async (
    req: any,
    res: any,
    next: any
) => {
    const requiredFields = ['roleType', 'eventId'];

    for (const field of requiredFields) {
        if (!req.body[field]) {
            return res.status(400).json({ error: `No ${field}` });
        }
    }

    const allowedRoleTypes = ['Participant', 'Volunteer'];

    if (!allowedRoleTypes.includes(req.body.roleType)) {
        return res
            .status(400)
            .json({ error: `${req.body.roleType} role doesn't exist` });
    }

    try {
        const attendees = await prisma.eventAttendee.findMany({
            where: {
                eventId: req.body.eventId,
                roleType: req.body.roleType
            }
        });

        return res.json(attendees);
    } catch (e) {
        next(e);
    }
};

// Get an event attendee

export const getEventAttendeeById = async (req: any, res: any, next: any) => {
    try {
        const eventAttendee = await prisma.eventAttendee.findUniqueOrThrow({
            where: {
                id: req.params.id
            }
        });

        return res.json(eventAttendee);
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2001') {
                return res.status(404).json({ error: 'Not found' });
            }
        }
        next(e);
    }
};

// Delete an event attendee record

export const deleteEventAttendeeById = async (
    req: any,
    res: any,
    next: any
) => {
    try {
        await prisma.eventAttendee.delete({
            where: {
                id: req.params.id
            }
        });
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2025') {
                return res
                    .status(404)
                    .json({ error: 'Event attendee to delete not found' });
            }
        }

        next(e);
    }
};
