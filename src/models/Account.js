import mongoose from 'mongoose';

const AccountSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  pin: { type: String, required: true },
  syncData: {
    ledger: { type: Array, default: [] },
    inventory: { type: Array, default: [] },
    production: { type: Array, default: [] },
    distributors: { type: Array, default: [] },
    products: { type: Array, default: [] },
  },
  lastSyncAt: { type: Date },
  isSuspended: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.models.Account || mongoose.model('Account', AccountSchema);
