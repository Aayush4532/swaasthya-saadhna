'use client';
import { useUser } from '@clerk/nextjs'
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'next/navigation'
import { Loader2, Paperclip, Send } from 'lucide-react'

export default function ChatPage() {
  const { user } = useUser()
  const userId = user?.id
  const { chatId } = useParams()

  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)
  const fileInputRef = useRef(null)

  // 1️⃣ Load existing messages
  useEffect(() => {
    if (!chatId || !userId) return

    fetch(`/api/chats/${chatId}/messages`, {
      headers: { 'x-user-id': userId },
    })
      .then(async (res) => {
        const data = await res.json()
        if (Array.isArray(data)) {
          setMessages(data)
        } else {
          console.error('Expected array but got:', data)
          setMessages([])
        }
      })
      .catch((err) => {
        console.error('Failed to load messages:', err)
        setMessages([])
      })
  }, [chatId, userId])

  // 2️⃣ Auto‑scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleFileSelect = (e) => {
    const img = e.target.files[0]
    if (img) {
      setFile(img)
      setPreviewUrl(URL.createObjectURL(img))
    }
  }

  const handleSend = async () => {
    if (!input.trim() || !userId || !chatId) return
    setLoading(true)

    // Optimistic UI
    setMessages((prev) => [
      ...prev,
      { role: 'user', content: input, image: previewUrl },
    ])

    // Persist user message
    const userRes = await fetch('/api/chats/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': userId,
      },
      body: JSON.stringify({ chatId, role: 'user', content: input }),
    })
    if (!userRes.ok) console.error('User POST failed:', await userRes.text())

    // Call AI
    const form = new FormData()
    form.append('userId', userId)
    form.append('chatId', chatId)
    form.append('prompt', input)
    if (file) form.append('image', file)

    const aiRes = await fetch('/api/config/saadhna', {
      method: 'POST',
      body: form,
    })
    const { text: aiReply, summary } = await aiRes.json()

    // Persist AI message
    const aiSave = await fetch('/api/chats/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': userId,
      },
      body: JSON.stringify({ chatId, role: 'assistant', content: aiReply }),
    })
    if (!aiSave.ok) console.error('AI POST failed:', await aiSave.text())

    // Persist summary
    if (summary) {
      const sumRes = await fetch(`/api/chats/${chatId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId,
        },
        body: JSON.stringify({ summary }),
      })
      if (!sumRes.ok) console.error('Summary PATCH failed:', await sumRes.text())
    }

    // Append AI to UI
    setMessages((prev) => [...prev, { role: 'assistant', content: aiReply }])

    // Reset
    setInput('')
    setFile(null)
    setPreviewUrl('')
    setLoading(false)
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-[#0f0f0f] via-[#141414] to-[#1a1a1e] text-white">
      {/* Chat window */}
      <div className="flex-1 relative overflow-y-auto p-6 space-y-4 flex flex-col your-scrollable-div2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[80%] whitespace-pre-wrap break-words rounded-xl p-4 ${msg.role === 'user'
                ? 'bg-blue-600 self-end text-right'
                : 'bg-gray-800 self-start text-left'
              }`}
          >
            {msg.image && (
              <img
                src={msg.image}
                alt="attachment"
                className="rounded max-h-60 mb-2 object-cover"
              />
            )}
            <span>{msg.content}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {previewUrl && (
        <div className="absolute px-6 pt-4 bottom-23">
          <div className="relative w-[100px] h-[100px]">
            <img
              src={previewUrl}
              alt="preview"
              className="w-full h-full object-cover rounded-md border border-gray-700"
            />
            <button
              onClick={() => {
                setFile(null)
                setPreviewUrl('')
                if (fileInputRef.current) fileInputRef.current.value = ''
              }}
              className="absolute cursor-pointer -top-2 -right-2 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Input bar */}
      <div className="px-6 py-4 border-t border-gray-700 bg-[#111115] flex items-center space-x-3">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-2 rounded-md hover:bg-gray-700 transition cursor-pointer"
        >
          <img src="/picture.png" alt="upload image" className='h-10' />
        </button>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileSelect}
        />
        <input
          type="text"
          className="flex-1 bg-gray-900 px-4 py-2 rounded-xl focus:outline-none"
          placeholder="Type your message…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !loading && handleSend()}
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="bg-gradient-to-r cursor-pointer from-green-500 to-emerald-600 px-5 py-2 rounded-xl flex items-center justify-center hover:scale-105 transform transition disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
        </button>
      </div>
    </div>
  )
}