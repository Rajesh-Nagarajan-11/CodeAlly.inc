import express from 'express';
import { createUserProfile, updateUserProfile ,displayUserProfile} from '../userProfiledb/controllers/userProfileController.js';

const router = express.Router();

// Route to create a new user profile
router.post('/create', createUserProfile);

// Route to update an existing user profile
router.put('/update', updateUserProfile);
router.get('/:username', displayUserProfile);

export default router;
