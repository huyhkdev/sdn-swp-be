import mongoose from 'mongoose';

const walletSchema = new mongoose.Schema({
  userId: { type: Number, required: true },
  balance: { type: Number, default: 0.0 },
  isLocked: { type: Number, default: 0 },
  accountId: { type: String, required: true },
});

const Wallet = mongoose.model('Wallet', walletSchema);

export default Wallet;
