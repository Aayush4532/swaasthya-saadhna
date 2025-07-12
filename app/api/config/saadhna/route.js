import { NextResponse } from 'next/server'
import { GoogleGenAI, createUserContent, createPartFromUri } from '@google/genai'
import fs from 'fs/promises'
import path from 'path'
import os from 'os'

export const runtime = 'nodejs'

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

export async function POST(request) {
  const formData = await request.formData()
  const prompt = formData.get('prompt')
  const file = formData.get('image')

  if (typeof prompt !== 'string') {
    return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
  }

  let parts = []
  parts.push({
    text: `
You are Saadhna AI, a thoughtful and friendly AI doctor assistant.
You have to communicate with regional language of user and always prefer hindi for by default.
You have to make emotional connect with the user also give your reply in enough required words so that user doesnot get overwhelmed just seeing size of your response else reads with engaging with you.

Your role:
- Interpret the given prescription image carefully and extract full medicine details.
- Explain each medicine's name, purpose, and exact timing (morning, afternoon, night), whether before or after meals.
- If the user asks, explain why the disease occurred, and why this specific medicine was prescribed.
- Combine both scientific medical knowledge and Ayurvedic wisdom to give food/diet suggestions (what to eat, what to avoid).
- If the user asks non-prescription questions, answer like a companion doctor — truthful, calm, and detailed.
- You may take a moment to think, but always reply accurately, clearly, and with empathy.

The user may upload a prescription or ask follow-up health questions.
Answer in easy-to-understand, structured bullet points, without using markdown symbols like **, -, etc.
`
  })

  let tempFilePath = null

  if (file instanceof File) {
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const tempDir = os.tmpdir()
    tempFilePath = path.join(tempDir, `${Date.now()}-${file.name}`)
    await fs.writeFile(tempFilePath, buffer)

    const uploadResult = await ai.files.upload({ file: tempFilePath })
    parts.push(createPartFromUri(uploadResult.uri, uploadResult.mimeType))
  }

  parts.push({ text: prompt })

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [createUserContent(parts)],
    })

    const raw = response.text || ''
    const cleaned = cleanText(raw)

    return NextResponse.json({ text: cleaned })
  } finally {
    if (tempFilePath) await fs.unlink(tempFilePath).catch(() => {})
  }
}

function cleanText(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/^- /gm, '• ')
    .replace(/^\d+\.\s+/gm, (m) => '🔹 ' + m.trim())
    .replace(/\n{2,}/g, '\n\n')
    .trim()
}