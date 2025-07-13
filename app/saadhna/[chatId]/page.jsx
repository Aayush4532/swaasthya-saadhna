'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { Loader2, Send } from 'lucide-react';

export default function ChatPage() {
  const { user } = useUser();
  const userId = user?.id;
  const { chatId } = useParams();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const bottomRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!chatId || !userId) return;

    const fetchMessages = async () => {
      setIsFetching(true);
      try {
        const res = await fetch(`/api/chats/${chatId}/messages`, {
          headers: { 'x-user-id': userId },
        });
        const data = await res.json();
        
        // Transform API data to match our message structure
        const transformedMessages = data.flatMap(msg => {
          const baseId = msg._id || msg.id || `msg-${Date.now()}`;
          const userMessage = {
            uniqueId: `${baseId}-user`,
            role: 'user',
            content: msg.userMessage,
            imageUrl: msg.imageUrl,
            timestamp: msg.createdAt
          };
          
          const aiMessage = {
            uniqueId: `${baseId}-ai`,
            role: 'assistant',
            content: msg.aiReply,
            timestamp: msg.updatedAt || msg.createdAt
          };
          
          return [userMessage, aiMessage];
        });
        
        setMessages(transformedMessages);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
        setMessages([]);
      } finally {
        setIsFetching(false);
      }
    };

    fetchMessages();
  }, [chatId, userId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleFileSelect = (e) => {
    const img = e.target.files[0];
    if (img) {
      setFile(img);
      setPreviewUrl(URL.createObjectURL(img));
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !userId || !chatId || loading) return;
    setLoading(true);

    const newUserMsg = {
      role: 'user',
      content: input,
      imageUrl: previewUrl || null,
      timestamp: new Date().toISOString(),
      uniqueId: `user-${Date.now()}`
    };

    const tempAiMsg = {
      role: 'assistant',
      content: '💭 Saadhna AI soch rahi hai...',
      isTemp: true,
      timestamp: new Date().toISOString(),
      uniqueId: `temp-${Date.now()}`
    };

    setMessages((prev) => [...prev, newUserMsg, tempAiMsg]);

    const form = new FormData();
    form.append('userId', userId);
    form.append('chatId', chatId);
    form.append('prompt', input);
    if (file) form.append('image', file);

    try {
      const aiRes = await fetch('/api/config/saadhna', {
        method: 'POST',
        body: form,
      });
      const aiData = await aiRes.json();
      const aiReply = aiData.text;
      const summary = aiData.summary || '';

      // Update messages with permanent AI response
      setMessages((prev) => [
        ...prev.filter((msg) => !msg.isTemp),
        {
          role: 'assistant',
          content: aiReply,
          timestamp: new Date().toISOString(),
          uniqueId: `ai-${Date.now()}`
        },
      ]);

      // Save to database
      await Promise.all([
        fetch('/api/chats/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-user-id': userId,
          },
          body: JSON.stringify({
            chatId,
            userMessage: input,
            aiReply,
            imageUrl: previewUrl || null,
            summary,
          }),
        }),
        fetch(`/api/chats/${chatId}/summary`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'x-user-id': userId,
          },
          body: JSON.stringify({ summary }),
        }),
      ]);
    } catch (err) {
      console.error('Error:', err);
      // Replace temp message with error
      setMessages((prev) => [
        ...prev.filter((msg) => !msg.isTemp),
        {
          role: 'assistant',
          content: '❌ Error from Saadhna AI',
          timestamp: new Date().toISOString(),
          uniqueId: `error-${Date.now()}`
        },
      ]);
    } finally {
      setInput('');
      setFile(null);
      setPreviewUrl('');
      setLoading(false);
    }
  };

  // Safe date formatting function
  const formatTime = (dateString) => {
    try {
      const date = new Date(dateString);
      return isNaN(date) ? '' : date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  return (
    <div className="flex flex-col h-full bg-black text-white">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 your-scrollable-div relative">
        {isFetching ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="animate-spin" size={24} />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex justify-center items-center h-full text-gray-400">
            No messages yet. Start a conversation!
          </div>
        ) : (
          messages.map((msg) => {
            const isUser = msg.role === 'user';

            return (
              <div
                key={msg.uniqueId}
                className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] whitespace-pre-wrap break-words rounded-xl px-4 items-center py-2 shadow-md text-sm md:text-base overflow-hidden ${
                    isUser ? 'bg-blue-600 text-right' : 'bg-gray-800 text-left'
                  }`}
                >
                  {msg.imageUrl && (
                    <img
                      src={msg.imageUrl}
                      alt="attachment"
                      className="rounded max-h-60 mb-2 object-cover"
                    />
                  )}
                  <div>{msg.content || '[Message content missing]'}</div>
                  <div className="text-[8px] mt-1 opacity-60">
                    {formatTime(msg.timestamp)}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      {previewUrl && (
        <div className="px-4 py-2 absolute bottom-20">
          <div className="relative w-24 h-24">
            <img
              src={previewUrl}
              className="w-full h-full object-cover rounded border border-gray-600"
              alt="Preview"
            />
            <button
              onClick={() => {
                setFile(null);
                setPreviewUrl('');
                if (fileInputRef.current) fileInputRef.current.value = '';
              }}
              className="absolute top-0 right-0 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="px-4 py-3 border-t border-gray-700 bg-[#111115] flex items-center gap-3">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-2 hover:bg-gray-700 rounded cursor-pointer"
          disabled={loading}
        >
          <img src="/picture.png" alt="upload image" className='h-9' />
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileSelect}
          disabled={loading}
        />
        <input
          type="text"
          className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !loading && handleSend()}
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="bg-sky-600 hover:bg-sky-900 cursor-pointer px-4 py-2 rounded-lg disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
        </button>
      </div>
    </div>
  );
}