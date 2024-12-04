// /motivational/motivationalRoutes.js
import express from 'express';
import { createMotivation, getMotivationByDate } from '../Motivationaldb/Controllers/motivationalController.js';

const router = express.Router();

// Route to create a new motivational quote
router.post('/create', createMotivation);

// Route to get a motivational quote by date
router.get('/:date', getMotivationByDate);

export default router;
