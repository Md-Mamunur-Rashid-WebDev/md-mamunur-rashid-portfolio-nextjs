'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiTrash2, FiEdit3, FiX, FiSave, FiUpload, FiImage } from 'react-icons/fi'
import toast from 'react-hot-toast'

const CATEGORIES = ['Salesforce', 'Frontend', 'Backend', 'WordPress']

const categoryColors = {
  Salesforce: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  Frontend:   'bg-purple-500/10 text-purple-400 border-purple-500/20',
  Backend:    'bg-amber-500/10 text-amber-400 border-amber-500/20',
  WordPress:  'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
}

const emptyForm = { name: '', category: 'Frontend', level: 80, order: 0, icon: '' }

// Upload image to Cloudinary via our API
async function uploadToCloudinary(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = async (e) => {
      try {
        const base64 = e.target.result
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64 }),
        })
        const data = await res.json()
        if (data.url) resolve(data.url)
        else reject(new Error(data.error || 'Upload failed'))
      } catch (err) {
        reject(err)
      }
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function IconPreview({ url, name, size = 32 }) {
  if (!url) {
    return (
      <div style={{
        width: size, height: size, borderRadius: 8,
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: size * 0.35, fontWeight: 700, color: 'rgba(255,255,255,0.3)',
        fontFamily: 'monospace', flexShrink: 0,
      }}>
        {name ? name.slice(0, 2).toUpperCase() : '?'}
      </div>
    )
  }
  return (
    <img
      src={url} alt={name}
      style={{
        width: size, height: size, borderRadius: 8,
        objectFit: 'contain', flexShrink: 0,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        padding: 4,
      }}
    />
  )
}

function SkillModal({ editingSkill, onClose, onSaved }) {
  const [form, setForm] = useState(editingSkill || emptyForm)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(editingSkill?.icon || '')
  const fileRef = useRef(null)

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Local preview immediately
    const localUrl = URL.createObjectURL(file)
    setPreview(localUrl)

    setUploading(true)
    try {
      const cloudUrl = await uploadToCloudinary(file)
      setForm(f => ({ ...f, icon: cloudUrl }))
      setPreview(cloudUrl)
      toast.success('Icon uploaded!')
    } catch {
      toast.error('Upload failed. Check Cloudinary settings.')
      setPreview(form.icon || '')
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async () => {
    if (!form.name.trim()) { toast.error('Skill name is required'); return }
    setSaving(true)
    const payload = {
      name: form.name.trim(),
      category: form.category,
      level: parseInt(form.level) || 80,
      order: parseInt(form.order) || 0,
      icon: form.icon || '',
    }

    const url = editingSkill ? `/api/skills/${editingSkill.id}` : '/api/skills'
    const method = editingSkill ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      toast.success(editingSkill ? 'Skill updated!' : 'Skill added!')
      onSaved()
      onClose()
    } else {
      toast.error('Failed to save skill')
    }
    setSaving(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-card border border-border rounded-2xl p-6 w-full max-w-md"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold">
            {editingSkill ? 'Edit Skill' : 'Add New Skill'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <FiX size={20} />
          </button>
        </div>

        <div className="space-y-5">
          {/* Icon Upload */}
          <div>
            <label className="label mb-3">Skill Icon</label>
            <div className="flex items-center gap-4">
              {/* Preview */}
              <div
                onClick={() => fileRef.current?.click()}
                style={{
                  width: 72, height: 72, borderRadius: 16, cursor: 'pointer',
                  border: '2px dashed rgba(0,212,255,0.3)',
                  background: 'rgba(0,212,255,0.04)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  overflow: 'hidden', flexShrink: 0,
                  transition: 'all 0.2s',
                  position: 'relative',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(0,212,255,0.6)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)'}
              >
                {uploading ? (
                  <div style={{ fontSize: 11, color: '#00d4ff', textAlign: 'center' }}>
                    <div style={{
                      width: 20, height: 20, border: '2px solid #00d4ff33',
                      borderTopColor: '#00d4ff', borderRadius: '50%',
                      animation: 'spin 0.8s linear infinite', margin: '0 auto 4px',
                    }} />
                    Uploading
                  </div>
                ) : preview ? (
                  <img src={preview} alt="icon" style={{ width: 48, height: 48, objectFit: 'contain' }} />
                ) : (
                  <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>
                    <FiImage size={20} style={{ margin: '0 auto 4px' }} />
                    <span style={{ fontSize: 10 }}>Upload</span>
                  </div>
                )}
              </div>

              <div className="flex-1">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <button
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="btn-primary text-sm w-full justify-center mb-2 disabled:opacity-50"
                  style={{ padding: '8px 16px' }}
                >
                  <FiUpload size={14} />
                  {uploading ? 'Uploading...' : 'Upload Icon'}
                </button>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', lineHeight: 1.4 }}>
                  PNG, SVG, or JPG · Max 2MB<br/>
                  Will be saved to Cloudinary
                </p>
              </div>
            </div>

            {/* OR: paste URL */}
            <div style={{ marginTop: 12 }}>
              <label className="label">Or paste icon URL</label>
              <input
                className="input-field text-sm"
                value={form.icon}
                onChange={e => { setForm(f => ({ ...f, icon: e.target.value })); setPreview(e.target.value) }}
                placeholder="https://cdn.jsdelivr.net/gh/devicons/..."
              />
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 4 }}>
                Tip: devicons CDN — e.g. https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg
              </p>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="label">Skill Name *</label>
            <input
              className="input-field"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="e.g. React, Apex, WordPress..."
            />
          </div>

          {/* Category */}
          <div>
            <label className="label">Category *</label>
            <select
              className="input-field"
              value={form.category}
              onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Level slider */}
          <div>
            <label className="label">
              Proficiency Level:{' '}
              <span style={{ color: '#00d4ff', fontWeight: 700 }}>{form.level}%</span>
            </label>
            <input
              type="range" min="10" max="100" step="5"
              value={form.level}
              onChange={e => setForm(f => ({ ...f, level: parseInt(e.target.value) }))}
              className="w-full accent-primary mt-1"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>Beginner (10%)</span>
              <span>Expert (100%)</span>
            </div>
          </div>

          {/* Order */}
          <div>
            <label className="label">Display Order</label>
            <input
              type="number"
              className="input-field"
              value={form.order}
              onChange={e => setForm(f => ({ ...f, order: e.target.value }))}
              placeholder="0"
            />
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 4 }}>
              Lower number = shows first
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-lg border border-border text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving || uploading || !form.name}
            className="btn-primary flex-1 justify-center disabled:opacity-50"
          >
            <FiSave size={15} />
            {saving ? 'Saving...' : editingSkill ? 'Update Skill' : 'Add Skill'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function SkillsPage() {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingSkill, setEditingSkill] = useState(null)
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  useEffect(() => { fetchSkills() }, [])

  const fetchSkills = async () => {
    setLoading(true)
    const res = await fetch('/api/skills')
    if (res.ok) setSkills(await res.json())
    setLoading(false)
  }

  const openAdd = () => { setEditingSkill(null); setShowModal(true) }
  const openEdit = (skill) => { setEditingSkill(skill); setShowModal(true) }
  const closeModal = () => { setShowModal(false); setEditingSkill(null) }

  const handleDelete = async (id) => {
    if (!confirm('Delete this skill?')) return
    const res = await fetch(`/api/skills/${id}`, { method: 'DELETE' })
    if (res.ok) {
      toast.success('Skill deleted!')
      setSkills(prev => prev.filter(s => s.id !== id))
    } else {
      toast.error('Failed to delete')
    }
  }

  const categories = ['All', ...CATEGORIES]
  const filtered = skills
    .filter(s => activeCategory === 'All' || s.category === activeCategory)
    .filter(s => s.name.toLowerCase().includes(search.toLowerCase()))

  const countByCategory = CATEGORIES.reduce((acc, c) => {
    acc[c] = skills.filter(s => s.category === c).length
    return acc
  }, {})

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold">Skills</h2>
          <p className="text-gray-400 text-sm mt-1">
            {skills.length} total · {CATEGORIES.map(c => `${countByCategory[c]} ${c}`).join(' · ')}
          </p>
        </div>
        <button onClick={openAdd} className="btn-primary">
          <FiPlus size={16} /> Add Skill
        </button>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search skills..."
          className="input-field max-w-xs text-sm"
          style={{ padding: '8px 14px' }}
        />
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '7px 16px', borderRadius: 8,
                border: `1px solid ${activeCategory === cat ? 'rgba(0,212,255,0.4)' : 'rgba(255,255,255,0.08)'}`,
                background: activeCategory === cat ? 'rgba(0,212,255,0.08)' : 'transparent',
                color: activeCategory === cat ? '#00d4ff' : 'rgba(255,255,255,0.4)',
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
                fontFamily: 'inherit', transition: 'all 0.2s',
              }}
            >
              {cat}
              {cat !== 'All' && (
                <span style={{ marginLeft: 6, fontSize: 11, opacity: 0.7 }}>
                  {countByCategory[cat] || 0}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {[1,2,3,4,5,6,7,8].map(i => (
            <div key={i} className="h-20 bg-card rounded-xl animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <div className="text-5xl mb-4">⚡</div>
          <p>{search ? `No skills matching "${search}"` : 'No skills yet. Add your first skill!'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <AnimatePresence>
            {filtered.map(skill => (
              <motion.div
                key={skill.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="dashboard-card group"
                style={{ padding: '14px 16px' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  {/* Icon */}
                  <IconPreview url={skill.icon} name={skill.name} size={36} />

                  {/* Name + Category */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-100 truncate">{skill.name}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${categoryColors[skill.category] || 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
                      {skill.category}
                    </span>
                  </div>
                </div>

                {/* Level bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">Proficiency</span>
                    <span className="text-primary font-mono font-bold">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 bg-surface rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${skill.level}%`,
                        background: 'linear-gradient(90deg, #00d4ff, #7c3aed)',
                      }}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => openEdit(skill)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs text-gray-400 hover:text-primary border border-border hover:border-primary/30 transition-all"
                  >
                    <FiEdit3 size={12} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(skill.id)}
                    className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-gray-400 hover:text-red-400 border border-border hover:border-red-400/30 transition-all"
                  >
                    <FiTrash2 size={12} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <SkillModal
            editingSkill={editingSkill}
            onClose={closeModal}
            onSaved={fetchSkills}
          />
        )}
      </AnimatePresence>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
