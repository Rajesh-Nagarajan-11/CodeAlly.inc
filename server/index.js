import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import leetcoderoutes from './routes/leetcoderoutes.js'
import gfgroutes from './routes/gfgroutes.js'

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/leetcode',leetcoderoutes);
app.use('/gfg',gfgroutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("http Endpoints : \n  http://localhost:3000/auth/api/login : User login , Method = POST \n  http://localhost:3000/auth/api/register : New user Register , method = POST");
  console.log("  http://localhost:3000/leetcode/username : get leetcode stats , method=GET \n  http://localhost:3000/leetcode/username/solved : Get No of solved problems , method = GET");
  console.log("  http://localhost:3000/leetcode/username/badges : Get badges earned by users , method = GET");
  console.log("  http://localhost:3000/gfg/?userName=username : Get GfG stats , method = GET");

});