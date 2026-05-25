// app/dashboard/messages/page.js
'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiTrash2, FiCheck } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function MessagesPage() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchMessages() }, [])

  const fetchMessages = async () => {
    setLoading(true)
    const res = await fetch('/api/messages')
    if (res.ok) setMessages(await res.json())
    setLoading(false)
  }

  const markRead = async (id) => {
    await fetch(`/api/messages/${id}`, { method: 'PUT' })
    setMessages(messages.map((m) => m.id === id ? { ...m, read: true } : m))
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return
    const res = await fetch(`/api/messages/${id}`, { method: 'DELETE' })
    if (res.ok) { toast.success('Deleted!'); setMessages(messages.filter((m) => m.id !== id)) }
    else toast.error('Failed to delete')
  }

  const unreadCount = messages.filter((m) => !m.read).length

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Messages</h2>
        <p className="text-gray-400 text-sm mt-1">
          {messages.length} total · <span className="text-primary">{unreadCount} unread</span>
        </p>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <div key={i} className="h-24 bg-card rounded-xl animate-pulse" />)}
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <div className="text-5xl mb-4">📭</div>
          <p>No messages yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`dashboard-card ${!msg.read ? 'border-primary/30 bg-primary/3' : ''}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                      {msg.name[0]?.toUpperCase()}
                    </div>
                    <div>
                      <span className="font-semibold text-gray-100">{msg.name}</span>
                      <span className="text-gray-500 text-sm ml-2">{msg.email}</span>
                    </div>
                    {!msg.read && <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed ml-11">{msg.message}</p>
                  <p className="text-gray-600 text-xs mt-2 ml-11">
                    {new Date(msg.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  {!msg.read && (
                    <button
                      onClick={() => markRead(msg.id)}
                      className="w-8 h-8 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 flex items-center justify-center transition-colors"
                      title="Mark as read"
                    >
                      <FiCheck size={14} />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 flex items-center justify-center transition-colors"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
