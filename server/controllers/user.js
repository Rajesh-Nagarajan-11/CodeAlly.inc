import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = '2899556f8190993d5e8c37324e93c2ea4a871fe44be47b9b97be62f8a316058c';

// Middleware to authenticate JWT
export const authenticateJWT = (req, res, next) => {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(400).json({ message: 'Invalid token', error: err.message });
    }

    req.user = decoded; // Attach user info to the request object
    next();
  });
};

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Fetch user details from the database
    const user = await User.findById(userId).select('-password'); // Exclude password field
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving user details', error: err.message });
  }
};
