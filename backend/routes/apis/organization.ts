import express from 'express';
import {
    getAllOrganizations,
    getOrganizationById,
    createNewOrganization,
    updateOrganizationById,
    deleteOrganizationById
} from '../../controllers/organization';

const router = express.Router();

router.get('/api/organizations', getAllOrganizations);

router.get('/api/organizations/:organizationId', getOrganizationById);

router.post('/api/organizations', createNewOrganization);

router.put('/api/organizations/:organizationId', updateOrganizationById);

router.delete('/api/organizations/:organizationId', deleteOrganizationById);

export default router;
