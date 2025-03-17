import mongoose from 'mongoose';

const ExpertRequestStatus = {
    PENDING: 'PENDING',
    ACCEPTED: 'ACCEPTED',
    REJECTED: 'REJECTED'
};

const expertRequestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cvUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    state: {
        type: String,
        enum: Object.values(ExpertRequestStatus),
        default: 'pending'
    }
});

const ExpertRequest = mongoose.model('ExpertRequest', expertRequestSchema);

export { ExpertRequest }
