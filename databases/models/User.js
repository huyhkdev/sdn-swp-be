import mongoose from 'mongoose';

const UserRole = {
    USER: 'USER',
    ADMIN: 'ADMIN',
    EXPERT: 'EXPERT'
};

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    state: { type: Number, default: 0 },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.USER },
    avatarUrl: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    about: { type: String, default: null },
    dob: { type: Date, default: null },
    gender: { type: String, default: null },
});

const User = mongoose.model('User', userSchema);

export { User }
