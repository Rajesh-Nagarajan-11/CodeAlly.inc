import express from 'express';
import { forgotPassword,verifyOtp } from '../otp-smtp/otpsender.js';
const router = express.Router();

router.post('/send-otp',forgotPassword);
router.post('/verify-otp',verifyOtp);

export default router;