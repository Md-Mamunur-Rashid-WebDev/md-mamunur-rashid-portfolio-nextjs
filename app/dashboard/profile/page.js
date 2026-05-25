// app/dashboard/profile/page.js
'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiSave, FiUser } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const [form, setForm] = useState({
    name: '',
    title: '',
    bio: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    facebook: '',
    resumeUrl: '',
    photo: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => { fetchProfile() }, [])

  const fetchProfile = async () => {
    setLoading(true)
    const res = await fetch('/api/profile')
    if (res.ok) setForm(await res.json())
    setLoading(false)
  }

  const handleSave = async () => {
    setSaving(true)
    const res = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) toast.success('Profile updated!')
    else toast.error('Failed to update profile')
    setSaving(false)
  }

  const fields = [
    { key: 'name', label: 'Full Name', placeholder: 'Md Mamunur Rashid' },
    { key: 'title', label: 'Professional Title', placeholder: 'Salesforce Admin & Developer | Frontend Developer' },
    { key: 'email', label: 'Email Address', placeholder: 'your@email.com', type: 'email' },
    { key: 'phone', label: 'Phone Number', placeholder: '+880 1234 567890' },
    { key: 'location', label: 'Location', placeholder: 'Dhaka, Bangladesh' },
    { key: 'linkedin', label: 'LinkedIn URL', placeholder: 'https://linkedin.com/in/...' },
    { key: 'github', label: 'GitHub URL', placeholder: 'https://github.com/...' },
    { key: 'facebook', label: 'Facebook URL', placeholder: 'https://facebook.com/...' },
    { key: 'resumeUrl', label: 'Resume URL', placeholder: 'https://drive.google.com/...' },
    { key: 'photo', label: 'Profile Photo URL', placeholder: 'https://cloudinary.com/...' },
  ]

  if (loading) {
    return (
      <div className="max-w-2xl">
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 bg-card rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Profile</h2>
        <p className="text-gray-400 text-sm mt-1">Update your personal information and social links.</p>
      </div>

      {/* Avatar preview */}
      <div className="dashboard-card mb-6 flex items-center gap-4">
        <div className="w-16 h-16 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden flex-shrink-0">
          {form.photo && form.photo !== '/images/profile.png' ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={form.photo} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <FiUser size={24} className="text-primary" />
          )}
        </div>
        <div>
          <p className="font-semibold text-gray-100">{form.name || 'Your Name'}</p>
          <p className="text-gray-400 text-sm">{form.title || 'Your Title'}</p>
        </div>
      </div>

      <div className="dashboard-card space-y-5">
        {/* Bio - full width */}
        <div>
          <label className="label">Bio</label>
          <textarea
            className="input-field"
            rows={4}
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            placeholder="Tell visitors about yourself..."
          />
        </div>

        {/* Two-column grid for other fields */}
        <div className="grid md:grid-cols-2 gap-4">
          {fields.map(({ key, label, placeholder, type = 'text' }) => (
            <div key={key}>
              <label className="label">{label}</label>
              <input
                type={type}
                className="input-field"
                value={form[key] || ''}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                placeholder={placeholder}
              />
            </div>
          ))}
        </div>

        <motion.button
          onClick={handleSave}
          disabled={saving}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-primary disabled:opacity-50 mt-2"
        >
          <FiSave size={15} />
          {saving ? 'Saving...' : 'Save Profile'}
        </motion.button>
      </div>
    </div>
  )
}
