import dbConnect from '@/lib/db';
import Chat from '@/models/Chat';
export const runtime = 'nodejs';


export async function POST(request) {
  await dbConnect();

  const userId = request.headers.get('x-user-id');
  if (!userId) {
    return new Response(JSON.stringify({ error: 'User ID required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { title } = await request.json();
    const finalTitle = title?.trim() || 'Untitled chat';

    const chat = await Chat.create({ userId, title: finalTitle });

    return new Response(JSON.stringify(chat), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create chat' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}




export async function GET(request) {
  await dbConnect();

  const userId = request.headers.get('x-user-id');
  if (!userId) {
    return new Response(JSON.stringify({ error: 'User ID required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const chats = await Chat.find({ userId }).sort({ createdAt: -1 });

    return new Response(JSON.stringify(chats), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch chats' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}