'use client';
import { useUser, UserButton } from '@clerk/nextjs';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, Plus } from 'lucide-react';

export default function SaadhnaLayout({ children }) {
  const { user } = useUser();
  const userId = user?.id;

  const [chats, setChats] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, chatId: null });

  const pathname = usePathname();
  const router = useRouter();
  const currentId = pathname.split('/').pop();

  const menuRef = useRef(null);

  useEffect(() => {
    if (!userId) return;
    fetch('/api/chats', {
      headers: { 'x-user-id': userId },
    })
      .then((res) => res.json())
      .then(setChats)
      .catch(console.error);
  }, [userId]);

  useEffect(() => {
    const handleClick = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setContextMenu({ visible: false, x: 0, y: 0, chatId: null });
      }
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  const handleCreateChat = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const res = await fetch('/api/chats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': userId,
      },
      body: JSON.stringify({ title: newTitle }),
    });

    const chat = await res.json();
    setChats([chat, ...chats]);
    setNewTitle('');
    setShowInput(false);
    router.push(`/saadhna/${chat._id}`);
  };

  const handleRename = async (chatId, newTitle) => {
    if (!newTitle.trim()) return;

    try {
      const res = await fetch(`/api/chats/${chatId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId,
        },
        body: JSON.stringify({ title: newTitle }),
      });

      if (res.ok) {
        const updated = await res.json();
        setChats((prev) =>
          prev.map((chat) => (chat._id === chatId ? { ...chat, title: updated.title } : chat))
        );
      }
    } catch (err) {
      console.error('Rename failed:', err);
    } finally {
      setEditingId(null);
      setEditingTitle('');
    }
  };

  const handleRightClick = (e, chatId) => {
    e.preventDefault();
    setContextMenu({ visible: true, x: e.clientX, y: e.clientY, chatId });
  };

  const handleRenameClick = () => {
    setEditingId(contextMenu.chatId);
    const chat = chats.find((c) => c._id === contextMenu.chatId);
    setEditingTitle(chat?.title || '');
    setContextMenu({ visible: false, x: 0, y: 0, chatId: null });
  };

  return (
    <div className="flex h-screen bg-[#0f0f0f] text-white">
      <aside
        className={`bg-[#1c1c1e] transition-all duration-300 p-4 border-r border-gray-800 flex flex-col ${collapsed ? 'w-16' : 'w-64'
          }`}
      >
        <div className="flex items-center justify-between mb-6">
          {!collapsed && <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src="/saadhna.png"
              className="w-full h-full object-cover scale-140 translate-y-1"
            />
          </div>
          }
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-400 hover:text-white cursor-pointer"
          >
            <Menu size={20} />
          </button>
        </div>

        {!collapsed && (
          <div className="mb-4">
            {showInput ? (
              <form onSubmit={handleCreateChat} className="flex items-center gap-2">
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-2 py-1 rounded bg-gray-800 text-sm"
                  placeholder="Enter chat title"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      setShowInput(false);
                      setNewTitle('');
                    }
                  }}
                />
              </form>
            ) : (
              <button
                onClick={() => setShowInput(true)}
                className="bg-blue-600 hover:bg-blue-700 w-full py-2 px-3 rounded flex items-center justify-center text-sm"
              >
                <Plus size={16} className="mr-1" /> New Chat
              </button>
            )}
          </div>
        )}

        <nav className="flex-1 overflow-y-auto space-y-1">
          {chats.map((chat) => (
            <div
              key={chat._id}
              onContextMenu={(e) => handleRightClick(e, chat._id)}
              className="relative"
            >
              {editingId === chat._id ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleRename(chat._id, editingTitle);
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    className="w-full px-2 py-1 rounded bg-gray-800 text-sm"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleRename(chat._id, editingTitle);
                      } else if (e.key === 'Escape') {
                        setEditingId(null);
                        setEditingTitle('');
                      }
                    }}
                    onBlur={() => {
                      setTimeout(() => {
                        setEditingId(null);
                      }, 150); // Delay to allow handleRename to complete
                    }}
                  />
                </form>
              ) : (
                <Link href={`/saadhna/${chat._id}`}>
                  <div
                    className={`truncate rounded px-3 py-2 text-sm cursor-pointer ${chat._id === currentId
                      ? 'bg-blue-700 font-medium'
                      : 'hover:bg-gray-700'
                      }`}
                  >
                    {!collapsed ? chat.title : chat.title.charAt(0).toUpperCase()}
                  </div>
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="mt-4 pt-4 border-t border-gray-700 flex items-center space-x-2">
          <UserButton />
          {!collapsed && (
            <div className="text-sm">
              {user?.firstName || 'User'} {user?.lastName || ''}
            </div>
          )}
        </div>
      </aside>

      {contextMenu.visible && (
        <ul
          ref={menuRef}
          className="absolute z-50 bg-gray-900 text-white border border-gray-700 rounded shadow-md text-sm"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <li
            onClick={handleRenameClick}
            className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
          >
            Rename
          </li>
        </ul>
      )}

      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}