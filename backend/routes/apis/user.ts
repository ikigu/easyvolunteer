import express from 'express';
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from '../../controllers/user';

const router = express.Router();

/**
 * Returns all users
 */

router.get('/api/users', getAllUsers);

router.get('/api/users/:userid', getUserById);

router.post('/api/users/', createUser);

router.put('/api/users/:userId', updateUser);

router.delete('/api/users/:userId', deleteUser);

export default router;
