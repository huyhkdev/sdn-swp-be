import express from 'express';
import jwt from 'jsonwebtoken';
import UserService from './UserService.js';
import dotenv from 'dotenv';
import { User } from '../../databases/models/User.js';
dotenv.config();
const userRouter = express.Router();
const userService = new UserService();

userRouter.post('/signup', async (req, res) => {
    try {
        const user = await userService.signup(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

userRouter.post('/login', async (req, res) => {
    try {
        const token = await userService.login(req.body);
        res.json({ token });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

userRouter.get('/verify', async (req, res) => {
    const { token } = req.query;
    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.state = 1;
        user.updatedAt = new Date();
        await user.save();
        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Invalid or expired token' });
    }
});


userRouter.get('/profile', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        const data = await userService.getProfile(userId);
        res.status(200).json({ message: 'Email verified successfully', data  });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});



userRouter.patch('/update-profile', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        const updatedUser = await userService.updateProfile(userId, req.body);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

userRouter.get('/withdraws', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        const withdraws = await userService.listWithdraws(userId);
        res.status(200).json(withdraws);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

export default userRouter;
