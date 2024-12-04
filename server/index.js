import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import leetcoderoutes from './routes/leetcoderoutes.js'
import gfgroutes from './routes/gfgroutes.js'
import codeforceroutes from './routes/codeforceroutes.js'
import motivationalRoutes from './routes/motivationalRoutes.js';
import UserProfileRoutes from './routes/userProfileRoutes.js';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/leetcode',leetcoderoutes);
app.use('/gfg',gfgroutes);
app.use('/codeforce',codeforceroutes);
app.use('/motivational',motivationalRoutes)
app.use('/userprofile',UserProfileRoutes)

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI_CODEALLY)
  .then(() => console.log('Connected to codeAlly DB'))
  .catch((err) => console.error('Error connecting to codeAlly DB:', err));

// Connect to motivational database
const motivationalConnection = mongoose.createConnection(process.env.MONGODB_URI_MOTIVATIONAL);

motivationalConnection.openUri(process.env.MONGODB_URI_MOTIVATIONAL)
  .then(() => console.log('Connected to motivational DB'))
  .catch((err) => console.error('Error connecting to motivational DB:', err));

// Connect to userprofile database
const userprofileConnection = mongoose.createConnection(process.env.MONGODB_URI_USERPROFILE);

userprofileConnection.openUri(process.env.MONGODB_URI_USERPROFILE)
  .then(() => console.log('Connected to userprofile DB'))
  .catch((err) => console.error('Error connecting to userprofile DB:', err));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("http Endpoints : \n  http://localhost:3000/api/auth/login : User login , Method = POST \n  http://localhost:3000/api/auth/register : New user Register , method = POST");
  console.log("  http://localhost:3000/api/user/profile : get user details , method=GET")
  console.log("  http://localhost:3000/leetcode/skillStats/username : get skill Stats , method =GET")
  console.log("  http://localhost:3000/leetcode/username : get leetcode stats , method=GET \n  http://localhost:3000/leetcode/username/solved : Get No of solved problems , method = GET");
  console.log("  http://localhost:3000/leetcode/username/badges : Get badges earned by users , method = GET");
  console.log("  http://localhost:3000/gfg/?userName=username : Get GfG stats , method = GET");
  console.log("  http://localhost:3000/codeforce/username : Get Codeforce Stats , method = GET");
  console.log("  http://localhost:3000/motivational/create : Create Motivational , Method = POST");
  console.log("  http://localhost:3000/motivational/:date  : Get Motivational of the day , method = GET");
  console.log("  http://localhost:3000/userprofile/create : Create a UserProfile , method = POST");
  console.log("  http://localhost:3000/userprofile/update : Update a existing Profile , method = PUT");
  console.log("  http://localhost:3000/userprofile/:username : Get user details method = GET");

});