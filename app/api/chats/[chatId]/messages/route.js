import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Message from '@/models/Message'

export const runtime = 'nodejs'

export async function GET(request, context) {
  const { params } = context
  const { chatId } = await params

  await dbConnect()

  const userId = request.headers.get('x-user-id')
  if (!userId) {
    return NextResponse.json({ error: 'Missing user ID' }, { status: 401 })
  }

  if (!chatId) {
    return NextResponse.json({ error: 'Missing chatId' }, { status: 400 })
  }

  try {
    const messages = await Message.find({ chatId }).sort({ createdAt: 1 })
    return NextResponse.json(messages, { status: 200 })
  } catch (err) {
    console.error('DB Fetch Error:', err)
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
  }
}