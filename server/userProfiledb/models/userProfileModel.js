import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, // username is required
    unique: true,   // username should be unique
  },
  email: {
    type: String,
    required: true, // email is required
    unique: true,   // email should be unique
  },
  country:{
    type:String,
    default:null,
  },
  college: {
    type: String,
    default: null, // nullable
  },
  githubUrl: {
    type: String,
    default: null, // nullable
  },
  linkedinUrl: {
    type: String,
    default: null, // nullable
  },
  aboutUs: {
    type: String,
    default: null, // nullable
  },
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

export default UserProfile;
