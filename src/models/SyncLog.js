import mongoose from 'mongoose';

const SyncLogSchema = new mongoose.Schema({
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  action: { type: String, enum: ['PUSH', 'PULL'], required: true },
  status: { type: String, enum: ['SUCCESS', 'ERROR'], required: true },
  recordsSynced: { type: Number, default: 0 },
  errorMessage: { type: String },
}, { timestamps: true });

export default mongoose.models.SyncLog || mongoose.model('SyncLog', SyncLogSchema);
