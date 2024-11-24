import express from 'express';
import { validateQuery, getStat, sendStat } from '../gfg/gfgfetch.js';  // Import logic functions

const router = express.Router();

// Define the route with middleware
router.get('/', validateQuery, getStat, sendStat);

export default router;
