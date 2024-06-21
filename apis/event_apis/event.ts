import express from 'express';
import prisma from '../client';
import { Prisma } from '@prisma/client';

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
    // Check if all required fields are in the request body
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

    // Check if user exists, check if org exists
    // Check if the user is tied to the org

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

    // Delete any fields not in the db schema
    for (const key in req.body) {
        if (!requiredFields.includes(key)) {
            delete req.body[key];
        }
    }

    // Transform date strings to Date objects ?? Might be unnecessary
    req.body.startTime = new Date(req.body.startTime);
    req.body.endTime = new Date(req.body.endTime);

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

/**
 * @todo: This method should check for some authorization
 */

router.put('/api/events/:eventId', async (req, res, next) => {
    // Delete any request body fields not in db schema

    const allowedFields = [
        'title',
        'description',
        'startTime',
        'endTime',
        'cost'
    ];

    for (const key in req.body) {
        if (!allowedFields.includes(key)) {
            return res.status(400).json({
                error: `'${key}' key doesn't exist on events or is not updateable`
            });
        }
    }

    req.body.updatedAt = new Date();

    try {
        const event = await prisma.event.update({
            where: {
                id: req.params.eventId
            },
            data: req.body
        });

        return res.json(event);
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2025') {
                return res
                    .status(404)
                    .json({ error: 'Event to update not found' });
            }
        }

        next(e);
    }
});

router.delete('/api/events/:eventId', async (req, res, next) => {
    /**@todo: Require authorization */

    try {
        await prisma.event.delete({
            where: {
                id: req.params.eventId
            }
        });

        return res.json({});
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2025') {
                return res
                    .status(404)
                    .json({ error: 'Event to delete not found' });
            }
        }

        next(e);
    }
});

router.get('/api/events/:eventId/:roleType', async (req, res, next) => {
    // Returns an array of volunteer or participant roles available
    // for an event of eventId based on roleType passed as param in the req.path

    if (
        req.params.roleType !== 'volunteer_roles' &&
        req.params.roleType !== 'participant_roles'
    ) {
        return res.status(404).json({
            error: `Resource type '${req.params.roleType}' doesn't exist on events`
        });
    }

    const roleType =
        req.params.roleType === 'volunteer_roles' ? 'Volunteer' : 'Participant';

    try {
        const event = await prisma.event.findUniqueOrThrow({
            where: {
                id: req.params.eventId
            },
            include: {
                eventAttendeeRoles: {
                    where: {
                        type: roleType
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
});

router.post(
    '/api/events/:eventId/:eventAttendeeRole',
    async (req, res, next) => {
        // Verify that eventAttendeeRoleType is of the correct type (participant_roles | volunteer_roles)

        if (
            req.params.eventAttendeeRole !== 'volunteer_roles' &&
            req.params.eventAttendeeRole !== 'participant_roles'
        ) {
            return res.status(404).json({
                error: `Resource type '${req.params.eventAttendeeRole}' doesn't exist on events`
            });
        }

        const roleType =
            req.params.eventAttendeeRole === 'volunteer_roles'
                ? 'Volunteer'
                : 'Participant';

        // Verify that event of given id exists

        try {
            await prisma.event.findUniqueOrThrow({
                where: {
                    id: req.params.eventId
                }
            });
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2025') {
                    return res
                        .status(404)
                        .json({ error: 'Event does not exist' });
                }
            }

            next(e);
        }

        // Verify that the request body has all required fields

        if (!req.body.title) return res.status(400).json({ error: 'No title' });

        // Create the correct type of role depending on the value of eventAttendeeRoleType

        req.body.eventId = req.params.eventId;
        req.body.type = roleType;

        try {
            const role = await prisma.eventAttendeeRole.create({
                data: req.body
            });

            return res.json(role);
        } catch (e) {
            next(e);
        }
    }
);

export default router;
