import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Summary from '@/models/Summary'

export async function PATCH(req, { params }) {
  await dbConnect()

  const { chatId } = await params
  const body = await req.json()
  const userId = req.headers.get('x-user-id') || body.userId
  const newSummary = body.summary

  if (!chatId || !userId || typeof newSummary !== 'string') {
    return NextResponse.json({ error: 'Missing chatId, userId, or summary' }, { status: 400 })
  }

  try {
    const updated = await Summary.findOneAndUpdate(
      { chatId },
      { $set: { content: newSummary, userId } },
      { upsert: true, new: true }
    )

    return NextResponse.json({ success: true, summary: updated.content })
  } catch (err) {
    console.error('Summary PATCH error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}