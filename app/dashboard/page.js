// app/dashboard/page.js
import { prisma } from '@/lib/db'
import { FiFolder, FiZap, FiList, FiMail } from 'react-icons/fi'
import Link from 'next/link'

async function getStats() {
  try {
    const [projects, skills, services, messages, unread] = await Promise.all([
      prisma.project.count(),
      prisma.skill.count(),
      prisma.service.count(),
      prisma.message.count(),
      prisma.message.count({ where: { read: false } }),
    ])
    return { projects, skills, services, messages, unread }
  } catch {
    return { projects: 0, skills: 0, services: 0, messages: 0, unread: 0 }
  }
}

async function getRecentMessages() {
  try {
    return await prisma.message.findMany({ orderBy: { createdAt: 'desc' }, take: 5 })
  } catch {
    return []
  }
}

export default async function DashboardPage() {
  const stats = await getStats()
  const recentMessages = await getRecentMessages()

  const statCards = [
    { label: 'Total Projects', value: stats.projects, icon: FiFolder, color: 'text-primary', bg: 'bg-primary/10', href: '/dashboard/projects' },
    { label: 'Skills', value: stats.skills, icon: FiZap, color: 'text-purple-400', bg: 'bg-purple-500/10', href: '/dashboard/skills' },
    { label: 'Services', value: stats.services, icon: FiList, color: 'text-yellow-400', bg: 'bg-yellow-500/10', href: '/dashboard/services' },
    { label: 'Messages', value: stats.messages, icon: FiMail, color: 'text-green-400', bg: 'bg-green-500/10', href: '/dashboard/messages', badge: stats.unread },
  ]

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-1">Dashboard Overview</h2>
        <p className="text-gray-400 text-sm">Manage your portfolio content from here.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => (
          <Link key={stat.label} href={stat.href} className="dashboard-card hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              {stat.badge > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {stat.badge} new
                </span>
              )}
            </div>
            <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="dashboard-card">
          <h3 className="font-semibold mb-4 text-gray-200">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Add Project', href: '/dashboard/projects', color: 'text-primary border-primary/30 hover:bg-primary/10' },
              { label: 'Add Skill', href: '/dashboard/skills', color: 'text-purple-400 border-purple-500/30 hover:bg-purple-500/10' },
              { label: 'Add Service', href: '/dashboard/services', color: 'text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/10' },
              { label: 'Edit Profile', href: '/dashboard/profile', color: 'text-green-400 border-green-500/30 hover:bg-green-500/10' },
            ].map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className={`border rounded-xl p-3 text-sm font-medium text-center transition-all ${action.color}`}
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="dashboard-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-200">Recent Messages</h3>
            <Link href="/dashboard/messages" className="text-primary text-xs hover:underline">View all</Link>
          </div>
          {recentMessages.length === 0 ? (
            <p className="text-gray-500 text-sm">No messages yet.</p>
          ) : (
            <div className="space-y-3">
              {recentMessages.map((msg) => (
                <div key={msg.id} className={`p-3 rounded-lg border ${msg.read ? 'border-border bg-surface/30' : 'border-primary/20 bg-primary/5'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-200">{msg.name}</span>
                    {!msg.read && <span className="w-2 h-2 bg-primary rounded-full" />}
                  </div>
                  <p className="text-xs text-gray-400 truncate">{msg.message}</p>
                  <p className="text-xs text-gray-600 mt-1">{msg.email}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Portfolio Link */}
      <div className="dashboard-card bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-200 mb-1">Your Portfolio is Live</h3>
            <p className="text-gray-400 text-sm">Changes you make here reflect immediately on your portfolio.</p>
          </div>
          <Link
            href="/"
            target="_blank"
            className="btn-primary text-sm whitespace-nowrap"
          >
            View Site →
          </Link>
        </div>
      </div>
    </div>
  )
}
