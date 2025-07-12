'use client';

import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function SaadhnaPage() {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!user) return;
    setLoading(true);

    const res = await fetch('/api/chats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': user.id,
      },
      body: JSON.stringify({ title: 'Untitled Chat' }),
    });

    const data = await res.json();
    router.push(`/saadhna/${data._id}`);
  };

  return (
    <div className="flex items-center justify-center h-full bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#141414] text-white p-6">
      <div className="text-center max-w-xl">
        <div className="mb-6">
          <div className="inline-block bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 text-transparent bg-clip-text text-4xl font-extrabold tracking-tight">
            Welcome to your Saadhna
          </div>
          <p className="mt-4 text-gray-400 text-sm md:text-base">
            A sacred space to reflect, breathe, and grow. Start your journey inward — one thought at a time.
          </p>
        </div>

        <button
          onClick={handleCreate}
          disabled={loading}
          className="mt-6 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl text-sm font-semibold shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin h-5 w-5" /> : '🧘‍♂️ Begin Your Saadhna'}
        </button>

        <div className="mt-8 text-xs text-gray-600 italic">
          Heal your mind, nurture your spirit, and unlock clarity.
        </div>
      </div>
    </div>
  );
}