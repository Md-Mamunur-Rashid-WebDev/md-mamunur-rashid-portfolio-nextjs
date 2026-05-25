'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaCode, FaCloud, FaPalette, FaShoppingCart, FaServer, FaTools } from 'react-icons/fa'
import { FiArrowUpRight, FiCheck } from 'react-icons/fi'

const ICON_MAP = { FaCode, FaCloud, FaPalette, FaShoppingCart, FaServer, FaTools }

const SERVICES = [
  {
    id: 1, icon: 'FaCode', title: 'Web Development',
    tag: 'React · Next.js · Tailwind',
    description: 'High-performance websites and web apps built with modern stacks. Every pixel is intentional, every millisecond matters.',
    points: ['Responsive & mobile-first', 'Core Web Vitals optimised', 'SEO-ready architecture', 'Smooth animations & interactions'],
    color: '#00d4ff',
  },
  {
    id: 2, icon: 'FaCloud', title: 'Salesforce Solutions',
    tag: 'LWC · Apex · Flows',
    description: 'End-to-end CRM builds — from data models to automations to custom UI — that turn Salesforce into a real business engine.',
    points: ['Custom LWC component library', 'Apex triggers & batch jobs', 'Flow automation & process builder', 'Third-party API integration'],
    color: '#00a1e0',
  },
  // {
  //   id: 3, icon: 'FaPalette', title: 'UI / UX Design',
  //   tag: 'Figma · Prototyping · Systems',
  //   description: 'Interfaces that feel obvious to use and look impossible to ignore. From rough wireframes to finished design systems.',
  //   points: ['User journey mapping', 'Interactive Figma prototypes', 'Component & design systems', 'Handoff-ready specs'],
  //   color: '#a78bfa',
  // },
  {
    id: 3, icon: 'FaShoppingCart', title: 'WordPress & WooCommerce',
    tag: 'Elementor · WooCommerce · ACF',
    description: 'Custom themes, powerful plugins, and full e-commerce stores that your team can actually manage without a developer.',
    points: ['Custom theme from scratch', 'WooCommerce store setup', 'Elementor page building', 'Speed & security hardening'],
    color: '#34d399',
  },
  {
    id: 4, icon: 'FaServer', title: 'Meta Ads & SEO',
    tag: 'Facebook · Instagram · On-page',
    description: 'Data-driven ad campaigns and on-page SEO working in sync — grow organic reach and paid ROI at the same time.',
    points: ['Facebook & Instagram campaigns', 'Audience research & targeting', 'On-page keyword optimisation', 'Monthly performance reports'],
    color: '#f472b6',
  },
  {
    id: 5, icon: 'FaTools', title: 'Maintenance & Support',
    tag: '24/7 · Updates · Performance',
    description: 'Set-and-forget peace of mind. Your site stays fast, secure, and up — without you having to think about it.',
    points: ['Uptime & error monitoring', 'Security patches & updates', 'Weekly backups', 'On-demand performance tuning'],
    color: '#fb923c',
  },
]

const DEFAULTS_FROM_DB = SERVICES

export default function Services({ services }) {
  const [hovered, setHovered] = useState(null)
  const list = services?.length ? services.map((s, i) => ({
    ...SERVICES[i % SERVICES.length], ...s, color: SERVICES[i % SERVICES.length].color,
  })) : DEFAULTS_FROM_DB

  return (
    <section id="services" style={{
      padding: '110px 0',
      background: 'linear-gradient(180deg, #060610 0%, #080814 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative blobs */}
      <div style={{
        position: 'absolute', top: '20%', right: '-5%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(167,139,250,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', left: '-5%',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px', position: 'relative' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: 64 }}
        >
          <p style={{
            color: '#00d4ff', fontSize: 12, fontWeight: 700,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            fontFamily: 'monospace', margin: '0 0 12px',
          }}>
            What I Offer
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <h2 style={{
              fontSize: 52, fontWeight: 800, color: '#fff',
              margin: 0, lineHeight: 1.05, letterSpacing: '-0.03em',
            }}>
              Services that{' '}
              <span style={{
                background: 'linear-gradient(135deg, #00d4ff 0%, #a78bfa 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                deliver results
              </span>
            </h2>
            <a href="#contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 24px', borderRadius: 12,
              border: '1.5px solid rgba(0,212,255,0.3)',
              color: '#00d4ff', fontSize: 14, fontWeight: 600,
              textDecoration: 'none', transition: 'all 0.2s',
              flexShrink: 0,
            }}>
              Let&apos;s talk <FiArrowUpRight size={15} />
            </a>
          </div>
        </motion.div>

        {/* Services — large card list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {list.map((svc, i) => {
            const Icon = ICON_MAP[svc.icon] || FaCode
            const isHov = hovered === i
            return (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '64px 1fr auto',
                  alignItems: 'center',
                  gap: 28,
                  padding: '28px 32px',
                  borderRadius: 18,
                  border: `1px solid ${isHov ? svc.color + '40' : 'rgba(255,255,255,0.06)'}`,
                  background: isHov
                    ? `linear-gradient(135deg, ${svc.color}08, rgba(255,255,255,0.02))`
                    : 'rgba(255,255,255,0.02)',
                  cursor: 'default',
                  transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                  transform: isHov ? 'translateX(6px)' : 'translateX(0)',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                {/* Left accent bar */}
                <div style={{
                  position: 'absolute', left: 0, top: '20%', bottom: '20%', width: 3,
                  borderRadius: '0 3px 3px 0',
                  background: isHov ? svc.color : 'transparent',
                  transition: 'background 0.3s, top 0.3s, bottom 0.3s',
                  ...(isHov ? { top: '10%', bottom: '10%' } : {}),
                }} />

                {/* Icon */}
                <div style={{
                  width: 56, height: 56, borderRadius: 16, flexShrink: 0,
                  background: isHov ? svc.color + '18' : 'rgba(255,255,255,0.04)',
                  border: `1.5px solid ${isHov ? svc.color + '50' : 'rgba(255,255,255,0.07)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.3s',
                  boxShadow: isHov ? `0 0 24px ${svc.color}25` : 'none',
                }}>
                  <Icon size={22} style={{ color: isHov ? svc.color : 'rgba(255,255,255,0.35)', transition: 'color 0.3s' }} />
                </div>

                {/* Content */}
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6, flexWrap: 'wrap' }}>
                    <h3 style={{
                      fontSize: 18, fontWeight: 700, margin: 0,
                      color: isHov ? '#fff' : 'rgba(255,255,255,0.85)',
                      transition: 'color 0.25s',
                    }}>
                      {svc.title}
                    </h3>
                    <span style={{
                      fontSize: 11, padding: '3px 10px', borderRadius: 99,
                      background: isHov ? svc.color + '15' : 'rgba(255,255,255,0.05)',
                      border: `1px solid ${isHov ? svc.color + '30' : 'rgba(255,255,255,0.08)'}`,
                      color: isHov ? svc.color : 'rgba(255,255,255,0.3)',
                      fontFamily: 'monospace', fontWeight: 600,
                      transition: 'all 0.25s', whiteSpace: 'nowrap',
                    }}>
                      {svc.tag}
                    </span>
                  </div>
                  <p style={{
                    fontSize: 14, lineHeight: 1.6, margin: 0,
                    color: isHov ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.3)',
                    transition: 'color 0.25s',
                    maxWidth: 520,
                  }}>
                    {svc.description}
                  </p>
                </div>

                {/* Right — points revealed on hover */}
                <motion.div
                  animate={{ opacity: isHov ? 1 : 0, x: isHov ? 0 : 16 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    display: 'flex', flexDirection: 'column', gap: 6,
                    minWidth: 200, flexShrink: 0,
                  }}
                >
                  {(svc.points || []).slice(0, 4).map((pt, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <FiCheck size={12} style={{ color: svc.color, flexShrink: 0 }} />
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', whiteSpace: 'nowrap' }}>
                        {pt}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
