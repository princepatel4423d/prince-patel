import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import adminModel from '../models/adminModel.js';
import transporter from '../config/nodemailer.js';
import { PASSWORD_RESET_TEMPLATE } from '../config/emailTemplates.js';

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json({ success: false, message: "All fields are required" });
    }

    try {
        const existingadmin = await adminModel.findOne({ email });
        if (existingadmin) {
            return res.json({ success: false, message: "Admin already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = new adminModel({
            name,
            email,
            password: hashedPassword
        });
        await admin.save();

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.json({
            success: true,
            message: "Registration successful"
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: "Email and password are required" });
    }

    try {
        const admin = await adminModel.findOne({ email });
        if (!admin) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.json({
            success: true,
            message: "Login successful"
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
        });

        return res.json({
            success: true,
            message: "Logout successful"
        });

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        });
    }
}

export const isAuthenticated = async (req, res) => {
    try {
        return res.json({
            success: true,
            message: "admin is authenticated"
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
}

// send Reset Password OTP to the admin's Email
export const sendResetOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.json({ success: false, message: "Email is required" });
    }

    try {
        const admin = await adminModel.findOne({ email });
        if (!admin) {
            return res.json({ success: false, message: "admin not found" });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        admin.resetOtp = otp;
        admin.resetOtpExpireAt = Date.now() + 2 * 60 * 1000; // 2 min expiry

        await admin.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: admin.email,
            subject: 'Password Reset OTP',
            // text: `your password reset OTP is ${otp}. It is valid for 2 min.`,
            html: PASSWORD_RESET_TEMPLATE.replace('{{email}}', admin.email).replace('{{otp}}', otp)
        };

        await transporter.sendMail(mailOptions);

        return res.json({
            success: true,
            message: "Reset OTP sent to your email"
        });

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        });
    }
}

// Reset admin Password
export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.json({ success: false, message: "Email, OTP, and new password are required" });
    }

    try {
        const admin = await adminModel.findOne({ email });

        if (!admin) {
            return res.json({ success: false, message: "admin not found" });
        }

        if (admin.resetOtp === '' || admin.resetOtp !== otp) {
            return res.json({ success: false, message: "Invalid OTP" });
        }

        if (admin.resetOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: "OTP has expired" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        admin.password = hashedPassword;
        admin.resetOtp = '';
        admin.resetOtpExpireAt = 0;

        await admin.save();

        return res.json({
            success: true,
            message: "Password reset successfully"
        });

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        });
    }
}