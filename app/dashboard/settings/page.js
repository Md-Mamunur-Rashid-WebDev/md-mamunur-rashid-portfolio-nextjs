'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSave, FiEye, FiEyeOff, FiShield, FiMail } from 'react-icons/fi'
import { signOut } from 'next-auth/react'
import toast from 'react-hot-toast'

export default function SettingsPage() {
  const [emailForm, setEmailForm] = useState({ newEmail: '', confirmEmail: '' })
  const [passForm, setPassForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [showPass, setShowPass] = useState({ current: false, new: false, confirm: false })
  const [savingEmail, setSavingEmail] = useState(false)
  const [savingPass, setSavingPass] = useState(false)

  const handleEmailChange = async (e) => {
    e.preventDefault()
    if (emailForm.newEmail !== emailForm.confirmEmail) {
      toast.error('Emails do not match')
      return
    }
    setSavingEmail(true)
    const res = await fetch('/api/auth/update-credentials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'email', newEmail: emailForm.newEmail }),
    })
    const data = await res.json()
    if (res.ok) {
      toast.success('Email updated! Please log in again.')
      setTimeout(() => signOut({ callbackUrl: '/login' }), 1500)
    } else {
      toast.error(data.error || 'Failed to update email')
    }
    setSavingEmail(false)
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    if (passForm.newPassword !== passForm.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    if (passForm.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }
    setSavingPass(true)
    const res = await fetch('/api/auth/update-credentials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'password',
        currentPassword: passForm.currentPassword,
        newPassword: passForm.newPassword,
      }),
    })
    const data = await res.json()
    if (res.ok) {
      toast.success('Password updated! Please log in again.')
      setTimeout(() => signOut({ callbackUrl: '/login' }), 1500)
    } else {
      toast.error(data.error || 'Failed to update password')
    }
    setSavingPass(false)
  }

  const toggleShow = (field) => setShowPass(p => ({ ...p, [field]: !p[field] }))

  return (
    <div className="max-w-xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Account Settings</h2>
        <p className="text-gray-400 text-sm mt-1">
          Change your admin email and password here.
        </p>
      </div>

      {/* Change Email */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="dashboard-card mb-6"
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <FiMail size={16} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-100">Change Email</h3>
            <p className="text-xs text-gray-500">You will be logged out after changing.</p>
          </div>
        </div>

        <form onSubmit={handleEmailChange} className="space-y-4">
          <div>
            <label className="label">New Email Address</label>
            <input
              type="email"
              required
              className="input-field"
              value={emailForm.newEmail}
              onChange={e => setEmailForm(f => ({ ...f, newEmail: e.target.value }))}
              placeholder="your-new-email@gmail.com"
            />
          </div>
          <div>
            <label className="label">Confirm New Email</label>
            <input
              type="email"
              required
              className="input-field"
              value={emailForm.confirmEmail}
              onChange={e => setEmailForm(f => ({ ...f, confirmEmail: e.target.value }))}
              placeholder="Repeat your new email"
            />
          </div>
          <motion.button
            type="submit"
            disabled={savingEmail}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary disabled:opacity-50"
          >
            <FiSave size={14} />
            {savingEmail ? 'Updating...' : 'Update Email'}
          </motion.button>
        </form>
      </motion.div>

      {/* Change Password */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="dashboard-card"
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
            <FiShield size={16} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-100">Change Password</h3>
            <p className="text-xs text-gray-500">Minimum 8 characters. You will be logged out after changing.</p>
          </div>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-4">
          {/* Current password */}
          <div>
            <label className="label">Current Password</label>
            <div className="relative">
              <input
                type={showPass.current ? 'text' : 'password'}
                required
                className="input-field pr-10"
                value={passForm.currentPassword}
                onChange={e => setPassForm(f => ({ ...f, currentPassword: e.target.value }))}
                placeholder="Your current password"
              />
              <button
                type="button"
                onClick={() => toggleShow('current')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
              >
                {showPass.current ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
          </div>

          {/* New password */}
          <div>
            <label className="label">New Password</label>
            <div className="relative">
              <input
                type={showPass.new ? 'text' : 'password'}
                required
                minLength={8}
                className="input-field pr-10"
                value={passForm.newPassword}
                onChange={e => setPassForm(f => ({ ...f, newPassword: e.target.value }))}
                placeholder="At least 8 characters"
              />
              <button
                type="button"
                onClick={() => toggleShow('new')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
              >
                {showPass.new ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
            {/* Strength indicator */}
            {passForm.newPassword && (
              <div className="flex gap-1 mt-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="h-1 flex-1 rounded-full" style={{
                    background: passForm.newPassword.length >= i * 3
                      ? i <= 2 ? '#f59e0b' : i === 3 ? '#00d4ff' : '#34d399'
                      : 'rgba(255,255,255,0.08)'
                  }} />
                ))}
                <span className="text-xs text-gray-500 ml-1">
                  {passForm.newPassword.length < 6 ? 'Weak' :
                   passForm.newPassword.length < 9 ? 'Fair' :
                   passForm.newPassword.length < 12 ? 'Good' : 'Strong'}
                </span>
              </div>
            )}
          </div>

          {/* Confirm new password */}
          <div>
            <label className="label">Confirm New Password</label>
            <div className="relative">
              <input
                type={showPass.confirm ? 'text' : 'password'}
                required
                className="input-field pr-10"
                value={passForm.confirmPassword}
                onChange={e => setPassForm(f => ({ ...f, confirmPassword: e.target.value }))}
                placeholder="Repeat new password"
              />
              <button
                type="button"
                onClick={() => toggleShow('confirm')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
              >
                {showPass.confirm ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
            {/* Match indicator */}
            {passForm.confirmPassword && (
              <p className={`text-xs mt-1 ${passForm.newPassword === passForm.confirmPassword ? 'text-green-400' : 'text-red-400'}`}>
                {passForm.newPassword === passForm.confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
              </p>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={savingPass}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, #a78bfa, #7c3aed)' }}
          >
            <FiShield size={14} />
            {savingPass ? 'Updating...' : 'Update Password'}
          </motion.button>
        </form>
      </motion.div>

      {/* Info box */}
      <div style={{
        marginTop: 20, padding: '14px 18px', borderRadius: 12,
        background: 'rgba(245,158,11,0.05)',
        border: '1px solid rgba(245,158,11,0.2)',
      }}>
        <p style={{ fontSize: 12, color: 'rgba(245,158,11,0.8)', margin: 0, lineHeight: 1.6 }}>
          ⚠️ After changing your email or password, you will be automatically logged out
          and redirected to the login page. Use your new credentials to log back in.
        </p>
      </div>
    </div>
  )
}
