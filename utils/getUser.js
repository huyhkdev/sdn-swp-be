import { User } from "../databases/models/User.js";
import jwt from 'jsonwebtoken';

export async function getUser(reqHeadersAuthorization) {
    const token = reqHeadersAuthorization.split(' ')[1];
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    return await User.findById({ _id: userId });
}