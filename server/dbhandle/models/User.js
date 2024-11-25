import mongoose from 'mongoose';  // Use 'import' for mongoose

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  leetcodeUsername: { type: String, required: true },
  gfgUsername: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

export default User;  // Use 'export default' to export the model
