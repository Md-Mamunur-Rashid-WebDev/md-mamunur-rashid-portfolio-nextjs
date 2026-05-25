'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaCode, FaCloud, FaPalette, FaShoppingCart, FaServer, FaTools } from 'react-icons/fa'
import { FiArrowUpRight, FiCheck } from 'react-icons/fi'

const ICON_MAP = { FaCode, FaCloud, FaPalette, FaShoppingCart, FaServer, FaTools }

const SERVICES = [
  { id:1, icon:'FaCode',         title:'Web Development',          tag:'React · Next.js · Tailwind',       description:'High-performance websites and web apps built with modern stacks. Every pixel is intentional, every millisecond matters.',                                             points:['Responsive & mobile-first','Core Web Vitals optimised','SEO-ready architecture','Smooth animations & interactions'], color:'#0284c7' },
  { id:2, icon:'FaCloud',        title:'Salesforce Solutions',      tag:'LWC · Apex · Flows',               description:'End-to-end CRM builds — from data models to automations to custom UI — that turn Salesforce into a real business engine.',                                          points:['Custom LWC component library','Apex triggers & batch jobs','Flow automation','Third-party API integration'], color:'#00a1e0' },
  { id:3, icon:'FaPalette',      title:'UI / UX Design',            tag:'Figma · Prototyping · Systems',    description:'Interfaces that feel obvious to use and look impossible to ignore. From rough wireframes to finished design systems.',                                                points:['User journey mapping','Interactive Figma prototypes','Component & design systems','Handoff-ready specs'], color:'#7c3aed' },
  { id:4, icon:'FaShoppingCart', title:'WordPress & WooCommerce',   tag:'Elementor · WooCommerce · ACF',    description:'Custom themes, powerful plugins, and full e-commerce stores that your team can actually manage without a developer.',                                                  points:['Custom theme from scratch','WooCommerce store setup','Elementor page building','Speed & security hardening'], color:'#059669' },
  { id:5, icon:'FaServer',       title:'Meta Ads & SEO',            tag:'Facebook · Instagram · On-page',  description:'Data-driven ad campaigns and on-page SEO working in sync — grow organic reach and paid ROI at the same time.',                                                         points:['Facebook & Instagram campaigns','Audience research & targeting','On-page keyword optimisation','Monthly performance reports'], color:'#db2777' },
  { id:6, icon:'FaTools',        title:'Maintenance & Support',     tag:'24/7 · Updates · Performance',    description:'Set-and-forget peace of mind. Your site stays fast, secure, and up — without you having to think about it.',                                                            points:['Uptime & error monitoring','Security patches & updates','Weekly backups','On-demand performance tuning'], color:'#d97706' },
]

export default function Services({ services }) {
  const [hovered, setHovered] = useState(null)
  const list = services?.length ? services.map((s, i) => ({ ...SERVICES[i % SERVICES.length], ...s, color: SERVICES[i % SERVICES.length].color })) : SERVICES

  return (
    <section id="services" style={{ padding: '110px 0', background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px', position: 'relative' }}>
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 64 }}>
          <p style={{ color: 'var(--accent)', fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'monospace', margin: '0 0 12px' }}>What I Offer</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <h2 style={{ fontSize: 48, fontWeight: 800, color: 'var(--text-primary)', margin: 0, lineHeight: 1.05, letterSpacing: '-0.03em' }}>
              Services that{' '}
              <span style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-purple))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>deliver results</span>
            </h2>
            <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 12, border: '1.5px solid var(--border-hover)', color: 'var(--accent)', fontSize: 14, fontWeight: 600, textDecoration: 'none', flexShrink: 0 }}>
              Let&apos;s talk <FiArrowUpRight size={15} />
            </a>
          </div>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {list.map((svc, i) => {
            const Icon = ICON_MAP[svc.icon] || FaCode
            const isHov = hovered === i
            return (
              <motion.div key={svc.id}
                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display: 'grid', gridTemplateColumns: '64px 1fr auto',
                  alignItems: 'center', gap: 28, padding: '26px 32px',
                  borderRadius: 18,
                  border: `1px solid ${isHov ? svc.color + '45' : 'var(--border-color)'}`,
                  background: isHov ? `linear-gradient(135deg, ${svc.color}08, var(--card-bg))` : 'var(--card-bg)',
                  cursor: 'default', transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                  transform: isHov ? 'translateX(6px)' : 'none',
                  position: 'relative', overflow: 'hidden',
                  boxShadow: isHov ? `0 8px 32px ${svc.color}12` : 'none',
                }}>
                <div style={{ position: 'absolute', left: 0, top: '20%', bottom: '20%', width: 3, borderRadius: '0 3px 3px 0', background: isHov ? svc.color : 'transparent', transition: 'background 0.3s' }} />

                <div style={{ width: 52, height: 52, borderRadius: 14, flexShrink: 0, background: isHov ? svc.color + '18' : 'var(--bg-surface)', border: `1.5px solid ${isHov ? svc.color + '50' : 'var(--border-color)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s', boxShadow: isHov ? `0 0 24px ${svc.color}25` : 'none' }}>
                  <Icon size={20} style={{ color: isHov ? svc.color : 'var(--text-muted)', transition: 'color 0.3s' }} />
                </div>

                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6, flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: 17, fontWeight: 700, margin: 0, color: 'var(--text-primary)', transition: 'color 0.25s' }}>{svc.title}</h3>
                    <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 99, background: isHov ? svc.color + '15' : 'var(--bg-surface)', border: `1px solid ${isHov ? svc.color + '30' : 'var(--border-color)'}`, color: isHov ? svc.color : 'var(--text-muted)', fontFamily: 'monospace', fontWeight: 600, transition: 'all 0.25s', whiteSpace: 'nowrap' }}>{svc.tag}</span>
                  </div>
                  <p style={{ fontSize: 13, lineHeight: 1.65, margin: 0, color: 'var(--text-muted)', maxWidth: 520 }}>{svc.description}</p>
                </div>

                <motion.div animate={{ opacity: isHov ? 1 : 0, x: isHov ? 0 : 16 }} transition={{ duration: 0.25 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: 7, minWidth: 200, flexShrink: 0 }}>
                  {(svc.points || []).slice(0, 4).map((pt, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <FiCheck size={12} style={{ color: svc.color, flexShrink: 0 }} />
                      <span style={{ fontSize: 12, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{pt}</span>
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
