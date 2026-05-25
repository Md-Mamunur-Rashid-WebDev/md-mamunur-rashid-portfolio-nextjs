'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiGrid, FiFolder, FiZap, FiList, FiMail, FiUser, FiExternalLink, FiSettings } from 'react-icons/fi'

const navItems = [
  { href: '/dashboard',           icon: FiGrid,       label: 'Overview'  },
  { href: '/dashboard/projects',  icon: FiFolder,     label: 'Projects'  },
  { href: '/dashboard/skills',    icon: FiZap,        label: 'Skills'    },
  { href: '/dashboard/services',  icon: FiList,       label: 'Services'  },
  { href: '/dashboard/messages',  icon: FiMail,       label: 'Messages'  },
  { href: '/dashboard/profile',   icon: FiUser,       label: 'Profile'   },
  { href: '/dashboard/settings',  icon: FiSettings,   label: 'Settings'  },
]

export default function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="dashboard-sidebar hidden md:flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="font-mono font-bold text-lg">
          <span className="text-primary">&lt;</span>
          Dashboard
          <span className="text-primary">/&gt;</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">Portfolio Admin</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-400 hover:text-primary transition-colors"
        >
          <FiExternalLink size={18} />
          View Portfolio
        </Link>
      </div>
    </aside>
  )
}
