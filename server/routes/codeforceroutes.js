import express from 'express';
import { getUserSolvedStats } from '../codeforces/userStats.js';
const router = express.Router();
router.get('/:handle', async (req, res) => {
    const handle = req.params.handle;
    try {
      const data = await getUserSolvedStats(handle);
      if (data.status === 'Error') {
        return res.status(400).json(data);
      }
      res.json(data);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ status: 'Error', message: error.message });
    }
  });
export default router;