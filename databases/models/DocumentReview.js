import mongoose from 'mongoose';

export const ReviewState = {
  HELPFUL: 'helpful',
  UNHELPFUL: 'unhelpful',
};

const documentReviewSchema = new mongoose.Schema({
  state: { type: String, enum: Object.values(ReviewState), required: true },
  userId: { type: String, required: true },
  document: { type: mongoose.Schema.Types.ObjectId, ref: 'Document', required: true },
});

const DocumentReview = mongoose.model('DocumentReview', documentReviewSchema);

export default DocumentReview;
