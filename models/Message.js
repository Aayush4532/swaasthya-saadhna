// models/Message.js
import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
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
  userMessage: {
    type: String,
    required: true,
  },
  aiReply: {
    type: String,
    required: true,
  },
  imageUrl: String, // i am never going to use it.
}, { timestamps: true });

const Message = mongoose.models.Message || mongoose.model('Message', MessageSchema);

export default Message;