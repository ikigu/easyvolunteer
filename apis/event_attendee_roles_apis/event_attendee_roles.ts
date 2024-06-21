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

export default router;
