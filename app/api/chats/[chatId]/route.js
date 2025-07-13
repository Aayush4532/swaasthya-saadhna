import dbConnect from '@/lib/db';
import Chat from '@/models/Chat';

export const runtime = 'nodejs';

export async function PATCH(request, { params }) {
  await dbConnect();

  const userId = request.headers.get('x-user-id');
  const { chatId } = await params;

  if (!userId) {
    return new Response(JSON.stringify({ error: 'User ID required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { title } = await request.json();
    const updated = await Chat.findOneAndUpdate(
      { _id: chatId, userId },
      { title: title.trim() || 'Untitled Chat' },
      { new: true }
    );

    if (!updated) {
      return new Response(JSON.stringify({ error: 'Chat not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(updated), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Update failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}