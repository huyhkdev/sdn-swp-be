
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import 'express-async-errors';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import DocumentReview from '../../databases/models/DocumentReview.js';
import { User } from '../../databases/models/User.js';
import Withdraw from '../../databases/models/Withdraw.js';
import Document from '../../databases/models/Document.js';
dotenv.config();
class UserService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_ACCOUNT,
                pass: process.env.MAIL_APP_PASSWORD,
            },
        });
    }

    async signup(userDetails) {
        const { fullName, email, password } = userDetails;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('Email already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const htmlContent = `<p>Tap the button below to confirm your email address</p>
                         <a href="http://localhost:4000/user/verify?token=${token}">Verify</a>`;
        await this.sendMail(email, 'Verify email', htmlContent);

        return await newUser.save();
    }

    async login(userCredentials) {
        const { email, password } = userCredentials;
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Email not found');
        }
        if (user.state === 0) {
            throw new Error('Need to verify email');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return token;
    }

    async getProfile(userId) {
        const user = await User.findById(userId);
        delete user.password;
        return user;
    }

    async sendMail(to, subject, htmlContent) {
        try {
            const mailOptions = {
                from: process.env.MAIL_ACCOUNT,
                to,
                subject,
                html: htmlContent,
            };
            await this.transporter.sendMail(mailOptions);
        } catch (error) {
            throw new Error('Failed to send email');
        }
    }

    async listWithdraws(userId) {
        return await Withdraw.find({ userId }).sort({ createdAt: -1 });
    }

    async createWithdraw(userId, amount, transactionId) {
        const newWithdraw = new Withdraw({
            userId,
            amount,
            transactionId,
        });
        return await newWithdraw.save();
    }

    async getUserLegit(userId) {
        // const flashcards = await Flashcard.find({ userId });
        let helpfulScore = 0;
        const documents = await Document.find({ userId });
        
    }
}

export default UserService;
