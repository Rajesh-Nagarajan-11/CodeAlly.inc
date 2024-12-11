import crypto from 'crypto';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const users = {}; // Mock user data for storing OTPs

// Create a transporter using your email service configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // Replace with your email service (e.g., Gmail, SendGrid, etc.)
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password (or app password for Gmail)
  },
});

// Forgot Password Route
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  // Generate a 6-digit OTP
  const otp = crypto.randomInt(100000, 999999);

  // Store OTP and timestamp in the mock database
  users[email] = { otp, createdAt: Date.now() };

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP for Password Reset – CodeAlly',
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
        <h2 style="text-align: center; color: #4CAF50;">Your OTP for Password Reset</h2>
        <p style="font-size: 16px; line-height: 1.5;">Dear User,</p>
        <p style="font-size: 16px; line-height: 1.5;">We received a request to reset your password for your <strong>CodeAlly</strong> account. If you didn't request this change, please ignore this email.</p>
        <div style="text-align: center; margin: 20px 0; padding: 15px; font-size: 24px; font-weight: bold; color: #333; background-color: #eeeeee; border-radius: 5px;">
          ${otp}
        </div>
        <p style="font-size: 16px; line-height: 1.5;">This OTP is valid for <strong>5 minutes</strong>. Please enter it on the password reset page to continue. If the OTP expires, you will need to request a new one.</p>
        <p style="font-size: 16px; line-height: 1.5;">If you face any issues, feel free to reach out to our support team.</p>
        <p style="font-size: 16px; line-height: 1.5; text-align: center;">Best regards,<br><strong>The CodeAlly Team</strong></p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'OTP sent successfully.' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Failed to send OTP.' });
  }
};

// Verify OTP Route
export const verifyOtp = (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required.' });
  }

  const userData = users[email];

  if (!userData) {
    return res.status(404).json({ message: 'Email not found.' });
  }

  const { otp: savedOtp, createdAt } = userData;

  // Check if OTP is valid and within 5 minutes
  const isOtpValid = savedOtp == otp && Date.now() - createdAt < 5 * 60 * 1000;

  if (!isOtpValid) {
    return res.status(400).json({ message: 'Invalid or expired OTP.' });
  }

  res.status(200).json({ message: 'OTP verified successfully. You can now reset your password.' });
};
