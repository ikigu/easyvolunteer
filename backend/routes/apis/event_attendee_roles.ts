import express from 'express';
import {
    getEventAttendeeRoleById,
    updateEventAttendeeRoleById,
    deleteEventAttendeeRoleById,
    getAllEventAttendeeRolesForEventByType,
    createEventAttendeeRole
} from '../../controllers/event_attendee_roles';

const router = express.Router();

router.get('/api/event_attendee_roles/:roleId', getEventAttendeeRoleById);

router.put('/api/event_attendee_roles/:roleId', updateEventAttendeeRoleById);

router.delete('/api/event_attendee_roles/:roleId', deleteEventAttendeeRoleById);

router.get('/api/event_attendee_roles', getAllEventAttendeeRolesForEventByType);

router.post('/api/event_attendee_roles', createEventAttendeeRole);

export default router;
