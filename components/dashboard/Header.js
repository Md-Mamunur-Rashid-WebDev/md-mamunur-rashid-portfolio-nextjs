// components/dashboard/Header.js
'use client'
import { signOut } from 'next-auth/react'
import { FiLogOut, FiBell } from 'react-icons/fi'

export default function DashboardHeader({ session }) {
  return (
    <header className="h-16 border-b border-border bg-surface/50 backdrop-blur-sm flex items-center justify-between px-6 flex-shrink-0">
      <div>
        <h1 className="text-sm font-semibold text-gray-200">Welcome back 👋</h1>
        <p className="text-xs text-gray-500">{session?.user?.email}</p>
      </div>
      <div className="flex items-center gap-3">
        <button className="w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center text-gray-400 hover:text-primary transition-colors">
          <FiBell size={16} />
        </button>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border text-sm text-gray-400 hover:text-red-400 hover:border-red-400/30 transition-all"
        >
          <FiLogOut size={14} />
          Logout
        </button>
      </div>
    </header>
  )
}
