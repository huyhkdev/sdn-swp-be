import mongoose from 'mongoose';

const withdrawSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  transactionId: { type: String, required: true },
});


const Withdraw = mongoose.model('Withdraw', withdrawSchema);

export default Withdraw;
