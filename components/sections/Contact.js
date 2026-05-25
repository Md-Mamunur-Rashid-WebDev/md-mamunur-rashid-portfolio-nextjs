// components/sections/Contact.js
'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaFacebook } from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function Contact({ profile }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)

  const email = profile?.email || 'your@email.com'
  const phone = profile?.phone || '+880 1234 567890'
  const location = profile?.location || 'Dhaka, Bangladesh'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        toast.success('Message sent successfully!')
        setForm({ name: '', email: '', message: '' })
      } else {
        toast.error('Failed to send message. Try again.')
      }
    } catch {
      toast.error('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    { icon: FaEnvelope, label: 'Email', value: email, href: `mailto:${email}` },
    { icon: FaPhone, label: 'Phone', value: phone, href: `tel:${phone}` },
    { icon: FaMapMarkerAlt, label: 'Location', value: location, href: '#' },
  ]

  return (
    <section id="contact" className="section" ref={ref}>
      <div className="max-w-7xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="font-mono text-primary text-sm tracking-widest uppercase">Get In Touch</span>
          <h2 className="text-4xl md:text-5xl font-bold font-display mt-2">
            Contact <span className="gradient-text">Me</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Have a project in mind? Let&apos;s talk and bring your ideas to life.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6">Let&apos;s work together</h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
              I&apos;m always open to new opportunities and collaborations. 
              Whether it&apos;s a freelance project, full-time position, or just a chat about 
              technology, feel free to reach out!
            </p>

            <div className="space-y-4 mb-8">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/30 transition-all group"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors flex-shrink-0">
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-mono">{label}</p>
                    <p className="text-gray-200 font-medium">{value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="flex gap-4">
              {[
                { icon: FaLinkedin, href: profile?.linkedin || '#', label: 'LinkedIn' },
                { icon: FaGithub, href: profile?.github || '#', label: 'GitHub' },
                { icon: FaFacebook, href: profile?.facebook || '#', label: 'Facebook' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-card border border-border rounded-xl flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all"
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 space-y-5">
              <div>
                <label className="label">Your Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Md Mamunur Rashid"
                  required
                  className="input-field"
                />
              </div>
              <div>
                <label className="label">Email Address</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  required
                  className="input-field"
                />
              </div>
              <div>
                <label className="label">Message</label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about your project..."
                  required
                  className="input-field resize-none"
                />
              </div>
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary w-full justify-center py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
