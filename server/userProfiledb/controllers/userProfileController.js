import UserProfile from '../models/userProfileModel.js';

// Create a new user profile
const createUserProfile = async (req, res) => {
  try {
    const { username, email, country, college, githubUrl, linkedinUrl, aboutUs } = req.body;

    // Check if a user with the same username or email already exists
    const existingUser = await UserProfile.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists.' });
    }

    const newUserProfile = new UserProfile({
      username,
      email,
      country:country || null,
      college: college || null,
      githubUrl: githubUrl || null,
      linkedinUrl: linkedinUrl || null,
      aboutUs: aboutUs || null,
    });

    await newUserProfile.save();
    return res.status(201).json(newUserProfile);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Update an existing user profile by username or email
const updateUserProfile = async (req, res) => {
  try {
    const { username, email,country, college, githubUrl, linkedinUrl, aboutUs } = req.body;

    // Find user profile by username or email
    const userProfile = await UserProfile.findOne({ $or: [{ username }, { email }] });

    if (!userProfile) {
      return res.status(404).json({ message: 'User profile not found.' });
    }

    // Update the profile fields
    userProfile.country=country || userProfile.country
    userProfile.college = college || userProfile.college;
    userProfile.githubUrl = githubUrl || userProfile.githubUrl;
    userProfile.linkedinUrl = linkedinUrl || userProfile.linkedinUrl;
    userProfile.aboutUs = aboutUs || userProfile.aboutUs;

    await userProfile.save();
    return res.status(200).json(userProfile);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
const displayUserProfile = async (req, res) => {
  try {
    const { username, email } = req.params;

    // Find user profile by username or email
    const userProfile = await UserProfile.findOne({ $or: [{ username }, { email }] });

    if (!userProfile) {
      return res.status(404).json({ message: 'User profile not found.' });
    }

    // Modify the country to return the first two characters in uppercase
    if (userProfile.country) {
      userProfile.country = userProfile.country.substring(0, 2).toUpperCase();
    }

    return res.status(200).json(userProfile);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export { createUserProfile, updateUserProfile, displayUserProfile };
