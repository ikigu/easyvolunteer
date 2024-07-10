import prisma from './client';
import { Prisma } from '@prisma/client';

// Contains get, put and delete apis for volunteerRoles and participantRoles
// Each route takes the role type (volunteer or participant) and id

/**
 * Returns event attendee role by id
 * @param req Request object
 * @param res Response object
 * @param next Function to call the next middleware
 * @returns A single event attendee role by id
 */

export const getEventAttendeeRoleById = async (
    req: any,
    res: any,
    next: any
) => {
    // Returns either a volunteer role or a participant role

    try {
        const role = await prisma.eventAttendeeRole.findUniqueOrThrow({
            where: {
                id: req.params.roleId
            }
        });

        return res.json(role);
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
 * Updates an eventAttendeeRole object in the database
 * @param req request object
 * @param res response object
 * @param next function to call next middleware
 * @returns the updated eventAttendeeRole object
 */

export const updateEventAttendeeRoleById = async (
    req: any,
    res: any,
    next: any
) => {
    // Updates either a volunteer role or a participant role of given roleId

    const allowedFields = ['title', 'description'];

    for (const key in req.body) {
        if (!allowedFields.includes(key)) {
            delete req.body[key];
        }
    }

    req.body.updatedAt = new Date();

    try {
        const role = await prisma.eventAttendeeRole.update({
            where: {
                id: req.params.roleId
            },
            data: req.body
        });

        return res.json(role);
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2025') {
                return res
                    .status(404)
                    .json({ error: 'Resource to update not found' });
            }
        }

        next(e);
    }
};

/**
 * deletes an eventAttendee role if it exists in the database
 * @param req request object
 * @param res response object
 * @param next function to call next middleware
 * @returns an empty object on success, error if object didn't exist
 */

export const deleteEventAttendeeRoleById = async (
    req: any,
    res: any,
    next: any
) => {
    // Deletes either a volunteer role or a participant role of given roleId

    try {
        await prisma.eventAttendeeRole.delete({
            where: {
                id: req.params.roleId
            }
        });

        return res.json({});
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2025') {
                return res
                    .status(404)
                    .json({ error: 'Resource to delete not found' });
            }
        }

        next(e);
    }
};

/**
 * returns all eventAttendeeRoles for a given event by type (Volunteer | Participant)
 * @param req request object
 * @param res response object
 * @param next function to call next middleware
 * @returns returns all eventAttendeeRoles for a given event by type (Volunteer | Participant)
 */

export const getAllEventAttendeeRolesForEventByType = async (
    req: any,
    res: any,
    next: any
) => {
    // Returns an array of volunteer or participant roles available
    // for an event of eventId based on roleType passed as param in the req.path

    const requiredFields = ['eventId', 'type'];

    for (const field of requiredFields) {
        if (!req.body[field]) {
            return res.status(400).json({ error: `No ${field}` });
        }
    }

    const allowedRoleTypes = ['Participant', 'Volunteer'];

    if (!allowedRoleTypes.includes(req.body.type)) {
        return res.status(400).json({
            error: "Given 'type' doesn't exist. Allowed types are: 'Participant' and 'Volunteer'"
        });
    }

    try {
        const event = await prisma.event.findUniqueOrThrow({
            where: {
                id: req.body.eventId
            },
            include: {
                eventAttendeeRoles: {
                    where: {
                        type: req.body.type
                    }
                }
            }
        });

        return res.json(event.eventAttendeeRoles);
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2025') {
                return res.status(404).json({ error: 'Event does not exist' });
            }
        }

        next(e);
    }
};

/**
 * Creates an event attendee role
 * @param req request object
 * @param res response object
 * @param next function to call the next middleware
 * @returns The new eventAttendeeRole
 */

export const createEventAttendeeRole = async (
    req: any,
    res: any,
    next: any
) => {
    // Verify that the request body has all required fields

    const requiredFields = ['title', 'eventId', 'type'];

    for (const field of requiredFields) {
        if (!req.body[field]) {
            return res.status(400).json({ error: `No ${field}` });
        }
    }

    // Verify that event of given id exists

    try {
        const role = await prisma.eventAttendeeRole.create({
            data: req.body
        });

        return res.json(role);
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if ((e.code = 'P2003')) {
                return res.status(404).json({ error: "Event doesn't exist" });
            }
        }
        next(e);
    }
};
