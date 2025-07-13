import mongoose from 'mongoose';
import Message from '@/models/Message';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then(mongoose => mongoose);
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
export default  dbConnect;


export async function getLast5MessagesByChatId(chatId) {
  await dbConnect()

  const messages = await Message.find({ chatId })
    .sort({ createdAt: -1 })
    .limit(5)
    .lean()

  return messages.reverse()
}