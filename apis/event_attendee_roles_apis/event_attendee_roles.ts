import express from 'express';
import prisma from '../client';
import { Prisma } from '@prisma/client';

const router = express.Router();

// Contains get, put and delete apis for volunteerRoles and participantRoles
// Each route takes the role type (volunteer or participant) and id

router.get('/api/:roleType/:roleId', async (req, res, next) => {
    // Returns either a volunteer role or a participant role

    const allowedRoleTypesInReqPath = ['participant_roles', 'volunteer_roles'];

    if (!allowedRoleTypesInReqPath.includes(req.params.roleType)) {
        return res.status(404).json({ error: 'Not found' });
    }

    const roleType =
        req.params.roleType === 'volunteer_roles'
            ? 'volunteerRole'
            : 'participantRole';

    try {
        if (roleType === 'volunteerRole') {
            const volunteerRole = await prisma[roleType].findUniqueOrThrow({
                where: {
                    id: req.params.roleId
                }
            });

            return res.json(volunteerRole);
        } else {
            const participantRole = await prisma[roleType].findUniqueOrThrow({
                where: {
                    id: req.params.roleId
                }
            });

            return res.json(participantRole);
        }
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2025') {
                return res.status(404).json({ error: 'Not found' });
            }
        }

        next(e);
    }
});

router.put('/api/:roleType/:roleId', async (req, res, next) => {
    // Updates either a volunteer role or a participant role of given roleId

    const allowedRoleTypesInReqPath = ['participant_roles', 'volunteer_roles'];

    if (!allowedRoleTypesInReqPath.includes(req.params.roleType)) {
        return res.status(404).json({ error: 'Not found' });
    }

    const roleType =
        req.params.roleType === 'volunteer_roles'
            ? 'volunteerRole'
            : 'participantRole';

    const allowedFields = ['title', 'description'];

    for (const key in req.body) {
        if (!allowedFields.includes(key)) {
            delete req.body[key];
        }
    }

    req.body.updatedAt = new Date();

    try {
        if (roleType === 'volunteerRole') {
            const volunteerRole = await prisma[roleType].update({
                where: {
                    id: req.params.roleId
                },
                data: req.body
            });

            return res.json(volunteerRole);
        } else {
            const participantRole = await prisma[roleType].update({
                where: {
                    id: req.params.roleId
                },
                data: req.body
            });

            return res.json(participantRole);
        }
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

router.delete('/api/:roleType/:roleId', async (req, res, next) => {
    // Deletes either a volunteer role or a participant role of given roleId

    const allowedRoleTypesInReqPath = ['participant_roles', 'volunteer_roles'];

    if (!allowedRoleTypesInReqPath.includes(req.params.roleType)) {
        return res.status(404).json({ error: 'Not found' });
    }

    const roleType =
        req.params.roleType === 'volunteer_roles'
            ? 'volunteerRole'
            : 'participantRole';

    try {
        if (roleType === 'volunteerRole') {
            await prisma[roleType].delete({
                where: {
                    id: req.params.roleId
                }
            });

            return res.json({});
        } else {
            await prisma[roleType].delete({
                where: {
                    id: req.params.roleId
                }
            });

            return res.json({});
        }
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
