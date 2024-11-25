import express from 'express';  // Use 'import' for express
import { authenticateJWT, getUserProfile } from '../controllers/user.js';  // Use 'import' for functions

const router = express.Router();

// Get user profile (protected route)
router.get('/profile', authenticateJWT, getUserProfile);

export default router;  // Use 'export default' for exporting the router
