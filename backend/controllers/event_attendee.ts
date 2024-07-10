import prisma from './client';
import { Prisma } from '@prisma/client';

/**
 * Creates a new event attendee for an event
 * @param req Request object
 * @param res Response object
 * @param next Function to call next middleware
 * @returns the newly-created eventAttendee object
 */

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

/**
 *
 * @param req request object
 * @param res response object
 * @param next function to call next middleware
 * @returns an array of eventAttendee objects for an event depending
 *  on the roleType and eventId passed as request parameters
 */

export const getEventAttendeesByEventIdandRoleType = async (
    req: any,
    res: any,
    next: any
) => {
    const requiredFields = ['eventId', 'roleType'];

    for (const field of requiredFields) {
        if (!req.body[field]) {
            return res.status(400).json({ error: `No ${field}` });
        }
    }

    const allowedRoleTypes = ['Participant', 'Volunteer'];

    if (!allowedRoleTypes.includes(req.body.roleType)) {
        return res.status(400).json({
            error: `'${req.body.roleType}' roleType doesn't exist. Available roleTypes are 'Participant' and 'Volunteer'`
        });
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

/**
 *
 * @param req request object
 * @param res response object
 * @param next function to call next middleware
 * @returns an eventAttendee object of the id passed as a request parameter
 */
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
            if (e.code === 'P2025') {
                return res.status(404).json({ error: 'Not found' });
            }
        }
        next(e);
    }
};

/**
 * Deletes an eventAttendee record from the database
 * @param req reuest object
 * @param res response object
 * @param next function to call next middleware
 * @returns an empty object on success, 404 on error
 */

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

        return res.json({});
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
