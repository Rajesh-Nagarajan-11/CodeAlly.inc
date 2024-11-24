import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import leetCode from '../Leetcode/leetCode.cjs';

 // Assuming 'leetCode' exports an object with methods

const router = express.Router();

// API rate limiter
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  limit: 60, // Max 60 requests per hour
  standardHeaders: true, // Include rate limit info in response headers
  legacyHeaders: false, // Disable legacy headers
  message: 'Too many requests from this IP, try again in 1 hour',
});

// Middleware setup
router.use(cors()); // Enable all CORS requests
router.use(limiter); // Rate limit all API routes
router.use((req, _res, next) => {
  console.log('Requested URL:', req.originalUrl);
  next();
});

// Middleware to set username and limit for user-related routes
router.use('/:username*', (req, _res, next) => {
  req.body = {
    username: req.params.username,
    limit: req.query.limit,
  };
  next();
});

// Define user-related routes
router.get('/:username', leetCode.userData); // Get user profile details
router.get('/:username/badges', leetCode.userBadges); // Get user badges
router.get('/:username/solved', leetCode.solvedProblem); // Get solved problems

export default router;
