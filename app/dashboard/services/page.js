// app/dashboard/services/page.js
'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiTrash2, FiEdit3, FiX, FiSave } from 'react-icons/fi'
import { FaCode, FaCloud, FaPalette, FaShoppingCart, FaServer, FaTools } from 'react-icons/fa'
import toast from 'react-hot-toast'

const ICONS = ['FaCode', 'FaCloud', 'FaPalette', 'FaShoppingCart', 'FaServer', 'FaTools']
const iconMap = { FaCode, FaCloud, FaPalette, FaShoppingCart, FaServer, FaTools }

const emptyForm = {
  title: '',
  description: '',
  icon: 'FaCode',
  points: '',
  order: 0,
}

export default function ServicesPage() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  useEffect(() => { fetchServices() }, [])

  const fetchServices = async () => {
    setLoading(true)
    const res = await fetch('/api/services')
    setServices(await res.json())
    setLoading(false)
  }

  const openAdd = () => { setForm(emptyForm); setEditingId(null); setShowModal(true) }
  const openEdit = (s) => {
    setForm({ ...s, points: s.points.join('\n') })
    setEditingId(s.id)
    setShowModal(true)
  }

  const handleSave = async () => {
    setSaving(true)
    const payload = {
      ...form,
      points: form.points.split('\n').map((p) => p.trim()).filter(Boolean),
      order: parseInt(form.order) || 0,
    }
    const url = editingId ? `/api/services/${editingId}` : '/api/services'
    const method = editingId ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      toast.success(editingId ? 'Service updated!' : 'Service added!')
      setShowModal(false)
      fetchServices()
    } else {
      toast.error('Something went wrong')
    }
    setSaving(false)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this service?')) return
    const res = await fetch(`/api/services/${id}`, { method: 'DELETE' })
    if (res.ok) { toast.success('Deleted!'); fetchServices() }
    else toast.error('Failed to delete')
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold">Services</h2>
          <p className="text-gray-400 text-sm mt-1">{services.length} service(s) total</p>
        </div>
        <button onClick={openAdd} className="btn-primary">
          <FiPlus size={16} /> Add Service
        </button>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => <div key={i} className="h-40 bg-card rounded-xl animate-pulse" />)}
        </div>
      ) : services.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <div className="text-5xl mb-4">🛠️</div>
          <p>No services yet. Add your first service!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || FaCode
            return (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="dashboard-card group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                      <Icon size={18} />
                    </div>
                    <h3 className="font-semibold text-gray-100">{service.title}</h3>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEdit(service)} className="text-gray-400 hover:text-primary">
                      <FiEdit3 size={15} />
                    </button>
                    <button onClick={() => handleDelete(service.id)} className="text-gray-400 hover:text-red-400">
                      <FiTrash2 size={15} />
                    </button>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">{service.description}</p>
                <ul className="space-y-1">
                  {(service.points || []).slice(0, 3).map((point, j) => (
                    <li key={j} className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="w-1 h-1 bg-primary rounded-full flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
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
                <h3 className="text-lg font-bold">{editingId ? 'Edit Service' : 'Add New Service'}</h3>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                  <FiX size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="label">Title *</label>
                  <input
                    className="input-field"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Web Development"
                  />
                </div>
                <div>
                  <label className="label">Description *</label>
                  <textarea
                    className="input-field"
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Describe this service..."
                  />
                </div>
                <div>
                  <label className="label">Icon</label>
                  <div className="grid grid-cols-6 gap-2">
                    {ICONS.map((iconName) => {
                      const Ic = iconMap[iconName]
                      return (
                        <button
                          key={iconName}
                          type="button"
                          onClick={() => setForm({ ...form, icon: iconName })}
                          className={`p-3 rounded-xl border flex items-center justify-center transition-all ${
                            form.icon === iconName
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-border text-gray-400 hover:border-gray-500'
                          }`}
                        >
                          <Ic size={16} />
                        </button>
                      )
                    })}
                  </div>
                </div>
                <div>
                  <label className="label">Bullet Points (one per line)</label>
                  <textarea
                    className="input-field"
                    rows={4}
                    value={form.points}
                    onChange={(e) => setForm({ ...form, points: e.target.value })}
                    placeholder="Responsive Design&#10;Performance Optimization&#10;SEO Friendly"
                  />
                </div>
                <div>
                  <label className="label">Display Order</label>
                  <input
                    type="number"
                    className="input-field"
                    value={form.order}
                    onChange={(e) => setForm({ ...form, order: e.target.value })}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg border border-border text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || !form.title}
                  className="btn-primary flex-1 justify-center disabled:opacity-50"
                >
                  <FiSave size={15} />
                  {saving ? 'Saving...' : 'Save Service'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
