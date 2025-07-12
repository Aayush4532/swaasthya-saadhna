import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    index: true,
  },
}, { timestamps: true });

const Chat = mongoose.models.Chat || mongoose.model('Chat', chatSchema);

export default Chat;