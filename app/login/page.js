// app/login/page.js
'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const result = await signIn('credentials', {
      email: form.email,
      password: form.password,
      redirect: false,
    })

    if (result?.ok) {
      toast.success('Welcome back!')
      router.push('/dashboard')
    } else {
      toast.error('Invalid email or password')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-dark grid-bg flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-3xl font-bold font-mono mb-2">
            <span className="text-primary">&lt;</span>
            <span>Mamun</span>
            <span className="text-primary">/&gt;</span>
          </div>
          <p className="text-gray-400">Dashboard Login</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8">
          <h1 className="text-2xl font-bold mb-6">Sign In</h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="admin@portfolio.com"
                required
                className="input-field"
              />
            </div>
            <div>
              <label className="label">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                required
                className="input-field"
              />
            </div>
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary w-full justify-center py-3 mt-2 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </motion.button>
          </form>

          <div className="mt-6 p-4 bg-surface rounded-xl border border-border">
            <p className="text-xs text-gray-500 font-mono">Default credentials (after seed):</p>
            <p className="text-xs text-primary font-mono mt-1">admin@portfolio.com / admin123</p>
          </div>
        </div>

        <div className="text-center mt-6">
          <a href="/" className="text-gray-400 hover:text-primary text-sm transition-colors">
            ← Back to Portfolio
          </a>
        </div>
      </motion.div>
    </div>
  )
}
