import express from 'express';  // Use 'import' for express
import { registerUser, loginUser } from '../dbhandle/controllers/auth.js';  // Use 'import' for functions

const router = express.Router();

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

export default router;
