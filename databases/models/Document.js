import mongoose from 'mongoose';

const ResourceStatus = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};

const documentSchema = new mongoose.Schema({
  fileUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  description: { type: String },
  userId: { type: String, required: true },
  topicId: { type: String, required: true },
  title: { type: String, required: true },
  state: { type: String, enum: Object.values(ResourceStatus), default: ResourceStatus.PENDING },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DocumentReview' }],
});

const Document = mongoose.model('Document', documentSchema);

export default Document;
