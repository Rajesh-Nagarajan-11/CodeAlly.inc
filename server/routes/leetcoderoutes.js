import express from 'express';
import cors from 'cors';
import axios from 'axios';
import rateLimit from 'express-rate-limit';
import skillStatsQuery from '../Leetcode/skillstatquery.cjs';
import leetCode from '../Leetcode/leetCode.cjs';

const router = express.Router();

async function queryLeetCodeAPI(query, variables) {
  try {
    const response = await axios.post('https://leetcode.com/graphql', { query, variables });
    if (response.data.errors) {
      throw new Error(response.data.errors[0].message);
    }
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(`Error from LeetCode API: ${error.response.data}`);
    } else if (error.request) {
      throw new Error('No response received from LeetCode API');
    } else {
      throw new Error(`Error in setting up the request: ${error.message}`);
    }
  }
}

const handleRequest = async (res, query, params) => {
  try {
    const data = await queryLeetCodeAPI(query, params);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


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


router.get('/skillStats/:username', (req, res) => {
  const { username } = req.params;
  handleRequest(res, skillStatsQuery, { username });
});

// Define user-related routes
router.get('/:username', leetCode.userData); // Get user profile details
router.get('/:username/badges', leetCode.userBadges); // Get user badges
router.get('/:username/solved', leetCode.solvedProblem); // Get solved problems



export default router;
