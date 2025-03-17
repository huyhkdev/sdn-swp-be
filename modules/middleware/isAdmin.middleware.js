import { User } from '../../databases/models/User.js';
import jwt from 'jsonwebtoken';

export async function isAdminMiddleware(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const { role } = await User.findById(userId);
    if (role !== 'ADMIN') return res.status(401).json({ message: 'Unauthorized' });
    next();
}