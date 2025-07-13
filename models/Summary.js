// models/Summary.js
import mongoose from 'mongoose';
const summarySchema = new mongoose.Schema({
  chatId: {
    type: String,
    ref: 'Chat',
    required: true,
    index: true,
  },
  userId: {
    type: String,
    required: true,
    index: true,
  },
  content: {
    type: String, // latest running summary
    required: true,
  },
}, { timestamps: true });

const Summary = mongoose.models.Summary || mongoose.model('Summary', summarySchema);

export default Summary;