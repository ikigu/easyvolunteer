import express from 'express';
import prisma from '../client';
import { Prisma } from '@prisma/client';

const router = express.Router();

// Contains get, put and delete apis for volunteerRoles and participantRoles
// Each route takes the role type (volunteer or participant) and id

router.get('/api/event_attendee_roles/:roleId', async (req, res, next) => {
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
});

router.put('/api/event_attendee_roles/:roleId', async (req, res, next) => {
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
});

router.delete('/api/event_attendee_roles/:roleId', async (req, res, next) => {
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
});

router.get('/api/event_attendee_roles', async (req, res, next) => {
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
        return res.status(400).json({ error: "Role doesn't exist" });
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
});

router.post('/api/event_attendee_roles', async (req, res, next) => {
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
});

export default router;
