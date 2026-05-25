// app/dashboard/projects/page.js
'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiTrash2, FiEdit3, FiX, FiSave } from 'react-icons/fi'
import toast from 'react-hot-toast'

const emptyForm = { title: '', description: '', image: '', tags: '', liveUrl: '', githubUrl: '', featured: false }

export default function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  useEffect(() => { fetchProjects() }, [])

  const fetchProjects = async () => {
    setLoading(true)
    const res = await fetch('/api/projects')
    const data = await res.json()
    setProjects(data)
    setLoading(false)
  }

  const openAdd = () => { setForm(emptyForm); setEditingId(null); setShowModal(true) }
  const openEdit = (p) => {
    setForm({ ...p, tags: p.tags.join(', ') })
    setEditingId(p.id)
    setShowModal(true)
  }

  const handleSave = async () => {
    setSaving(true)
    const payload = { ...form, tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean) }

    const url = editingId ? `/api/projects/${editingId}` : '/api/projects'
    const method = editingId ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      toast.success(editingId ? 'Project updated!' : 'Project created!')
      setShowModal(false)
      fetchProjects()
    } else {
      toast.error('Something went wrong')
    }
    setSaving(false)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return
    const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' })
    if (res.ok) { toast.success('Deleted!'); fetchProjects() }
    else toast.error('Failed to delete')
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold">Projects</h2>
          <p className="text-gray-400 text-sm mt-1">{projects.length} project(s) total</p>
        </div>
        <button onClick={openAdd} className="btn-primary">
          <FiPlus size={16} /> Add Project
        </button>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="dashboard-card animate-pulse">
              <div className="h-4 bg-surface rounded mb-3 w-3/4" />
              <div className="h-3 bg-surface rounded mb-2" />
              <div className="h-3 bg-surface rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <div className="text-5xl mb-4">📁</div>
          <p>No projects yet. Add your first project!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="dashboard-card"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-gray-100">{project.title}</h3>
                <div className="flex gap-2 ml-2 flex-shrink-0">
                  <button onClick={() => openEdit(project)} className="text-gray-400 hover:text-primary transition-colors">
                    <FiEdit3 size={15} />
                  </button>
                  <button onClick={() => handleDelete(project.id)} className="text-gray-400 hover:text-red-400 transition-colors">
                    <FiTrash2 size={15} />
                  </button>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-3 line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full font-mono">{tag}</span>
                ))}
              </div>
              {project.featured && (
                <span className="inline-block mt-2 text-xs px-2 py-0.5 bg-yellow-500/10 text-yellow-400 rounded-full">Featured</span>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card border border-border rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">{editingId ? 'Edit Project' : 'Add New Project'}</h3>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                  <FiX size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="label">Title *</label>
                  <input className="input-field" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="E-Commerce Platform" />
                </div>
                <div>
                  <label className="label">Description *</label>
                  <textarea className="input-field" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe your project..." />
                </div>
                <div>
                  <label className="label">Image URL</label>
                  <input className="input-field" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
                </div>
                <div>
                  <label className="label">Tech Tags (comma separated)</label>
                  <input className="input-field" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="React, Node.js, MongoDB" />
                </div>
                <div>
                  <label className="label">Live URL</label>
                  <input className="input-field" value={form.liveUrl} onChange={(e) => setForm({ ...form, liveUrl: e.target.value })} placeholder="https://myproject.com" />
                </div>
                <div>
                  <label className="label">GitHub URL</label>
                  <input className="input-field" value={form.githubUrl} onChange={(e) => setForm({ ...form, githubUrl: e.target.value })} placeholder="https://github.com/..." />
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="w-4 h-4 accent-primary"
                  />
                  <label htmlFor="featured" className="text-sm text-gray-300">Featured project</label>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 rounded-lg border border-border text-gray-400 hover:text-white transition-colors">
                  Cancel
                </button>
                <button onClick={handleSave} disabled={saving} className="btn-primary flex-1 justify-center disabled:opacity-50">
                  <FiSave size={15} />
                  {saving ? 'Saving...' : 'Save Project'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
