import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Message from '@/models/Message'
import Summary from '@/models/Summary'

export const runtime = 'nodejs'

export async function POST(request) {
  await dbConnect()

  const userId = request.headers.get('x-user-id')
  if (!userId) {
    return NextResponse.json({ error: 'Missing user ID' }, { status: 401 })
  }

  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { chatId, userMessage, aiReply, imageUrl, summary } = body

  if (!chatId || !userMessage || !aiReply) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  try {
    const saved = await Message.create({
      chatId,
      userId,
      userMessage,
      aiReply,
      imageUrl,
    })

    if (summary) {
      await Summary.findOneAndUpdate(
        { chatId, userId },
        { content: summary },
        { upsert: true, new: true }
      )
    }

    return NextResponse.json(saved, { status: 201 })
  } catch (error) {
    console.error('DB Save Error:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}