import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
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
  role: {
    type: String,
    required: true,
    enum: ['user', 'ai'],
  },
  content: {
    type: String,
    required: true,
  },
}, { timestamps: true })

const Message = mongoose.models.Message || mongoose.model('Message', messageSchema)

export default Message;