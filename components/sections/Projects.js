'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiExternalLink, FiGithub, FiArrowRight, FiArrowUpRight } from 'react-icons/fi'
import Image from 'next/image'

const TAG_COLORS = {
  React: '#61dafb', 'Node.js': '#68a063', MongoDB: '#47a248', Stripe: '#635bff',
  Apex: '#00a1e0', LWC: '#22d3ee', Flows: '#a78bfa', Integration: '#f59e0b',
  WordPress: '#3858e9', PHP: '#777bb4', Elementor: '#e2194b', SEO: '#34d399',
  'Next.js': '#e2e8f0', Prisma: '#5a67d8', PostgreSQL: '#336791',
  Tailwind: '#38bdf8', 'Chart.js': '#ff6384', 'Meta API': '#1877f2',
  Express: '#888', MySQL: '#4479a1', Python: '#3572A5',
}
const tc = t => TAG_COLORS[t] || '#00d4ff'

const DEFAULTS = [
  { id:1, title:'E-Commerce Platform',   description:'A full-stack store with Stripe payments, real-time inventory, admin analytics and a customer portal built to handle scale.', tags:['React','Node.js','MongoDB','Stripe'],   liveUrl:'#', githubUrl:'#', featured:true  },
  { id:2, title:'Salesforce CRM Suite',  description:'Enterprise CRM with custom LWC components, 3 external API integrations, batch Apex jobs, and automated lead-to-close flows.', tags:['Apex','LWC','Flows','Integration'],       liveUrl:'#', githubUrl:'#', featured:true  },
  { id:3, title:'Corporate Website',     description:'WordPress site ranking page-1 for 12 target keywords. Custom Elementor theme, 95+ PageSpeed score, and a full blog system.', tags:['WordPress','Elementor','SEO','PHP'],     liveUrl:'#', githubUrl:'#', featured:true  },
  { id:4, title:'Real Estate Portal',    description:'Property listing platform with Mapbox search, advanced filters, landlord dashboard, and automated viewing request emails.',   tags:['Next.js','Prisma','PostgreSQL'],         liveUrl:'#', githubUrl:'#', featured:false },
  { id:5, title:'Meta Ads Dashboard',    description:'Live analytics dashboard pulling from the Meta Graph API. Campaign heatmaps, ROI calculator, and automated PDF reports.',    tags:['React','Meta API','Chart.js'],           liveUrl:'#', githubUrl:'#', featured:false },
  { id:6, title:'Restaurant Booking',    description:'Table reservation system with live seat availability, WhatsApp confirmations, and a full manager panel for staff scheduling.', tags:['Next.js','Tailwind','Node.js','MySQL'], liveUrl:'#', githubUrl:'#', featured:false },
]

const CARD_ACCENTS = ['#00d4ff','#a78bfa','#34d399','#f59e0b','#f472b6','#fb923c']

// Featured card — big horizontal layout
function FeaturedCard({ project, index }) {
  const [hov, setHov] = useState(false)
  const accent = CARD_ACCENTS[index % CARD_ACCENTS.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 22,
        border: `1px solid ${hov ? accent + '55' : 'rgba(255,255,255,0.07)'}`,
        background: 'rgba(255,255,255,0.02)',
        overflow: 'hidden',
        transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
        transform: hov ? 'translateY(-5px)' : 'none',
        boxShadow: hov ? `0 30px 70px rgba(0,0,0,0.5), 0 0 0 1px ${accent}20` : 'none',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: 260,
      }}
    >
      {/* Left — content */}
      <div style={{ padding: '36px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          {/* Number + featured badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <span style={{
              fontSize: 11, fontFamily: 'monospace', fontWeight: 700,
              color: accent, letterSpacing: '0.05em',
            }}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <span style={{
              fontSize: 9, padding: '2px 8px', borderRadius: 99,
              background: accent + '15', border: `1px solid ${accent}35`,
              color: accent, fontWeight: 700, letterSpacing: '0.1em',
            }}>
              FEATURED
            </span>
          </div>

          <h3 style={{
            fontSize: 24, fontWeight: 800, margin: '0 0 12px',
            color: hov ? '#fff' : 'rgba(255,255,255,0.9)',
            letterSpacing: '-0.02em', lineHeight: 1.2,
            transition: 'color 0.25s',
          }}>
            {project.title}
          </h3>
          <p style={{
            fontSize: 14, lineHeight: 1.7, margin: 0,
            color: 'rgba(255,255,255,0.42)',
            transition: 'color 0.25s',
          }}>
            {project.description}
          </p>
        </div>

        <div>
          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 22 }}>
            {(project.tags || []).map(tag => (
              <span key={tag} style={{
                fontSize: 10, padding: '3px 10px', borderRadius: 99,
                background: tc(tag) + '12', border: `1px solid ${tc(tag)}28`,
                color: tc(tag), fontFamily: 'monospace', fontWeight: 700,
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: 10 }}>
            {project.liveUrl && project.liveUrl !== '#' && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '9px 18px', borderRadius: 10,
                  background: accent, color: '#060610',
                  fontWeight: 700, fontSize: 12, textDecoration: 'none',
                  transition: 'opacity 0.2s',
                }}>
                <FiExternalLink size={13} /> Live Demo
              </a>
            )}
            {project.githubUrl && project.githubUrl !== '#' && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '9px 18px', borderRadius: 10,
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: 'rgba(255,255,255,0.04)',
                  color: 'rgba(255,255,255,0.6)', fontWeight: 600, fontSize: 12,
                  textDecoration: 'none',
                }}>
                <FiGithub size={13} /> Code
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Right — visual panel */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        background: `linear-gradient(135deg, ${accent}12, ${CARD_ACCENTS[(index+2)%6]}10)`,
        borderLeft: `1px solid ${hov ? accent+'30' : 'rgba(255,255,255,0.05)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'border-color 0.3s',
      }}>
        {project.image ? (
          <Image src={project.image} alt={project.title} fill style={{ objectFit: 'cover' }} />
        ) : (
          <div style={{ textAlign: 'center' }}>
            {/* Code preview mockup */}
            <div style={{
              background: 'rgba(6,6,16,0.8)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12, padding: '20px 24px',
              fontFamily: 'monospace', fontSize: 12,
              lineHeight: 1.8, textAlign: 'left',
              maxWidth: 240,
              backdropFilter: 'blur(10px)',
            }}>
              <div style={{ color: '#666', marginBottom: 8, fontSize: 10 }}>● ● ●</div>
              <div><span style={{ color: '#a78bfa' }}>const</span> <span style={{ color: '#22d3ee' }}>project</span> <span style={{ color: '#fff' }}>= {'{'}</span></div>
              <div style={{ paddingLeft: 14 }}><span style={{ color: '#34d399' }}>title</span><span style={{ color: '#fff' }}>:</span> <span style={{ color: '#f59e0b' }}>&apos;{project.title.slice(0,14)}&apos;</span><span style={{ color: '#fff' }}>,</span></div>
              <div style={{ paddingLeft: 14 }}><span style={{ color: '#34d399' }}>status</span><span style={{ color: '#fff' }}>:</span> <span style={{ color: '#22d3ee' }}>&apos;shipped&apos;</span><span style={{ color: '#fff' }}>,</span></div>
              <div style={{ paddingLeft: 14 }}><span style={{ color: '#34d399' }}>stars</span><span style={{ color: '#fff' }}>:</span> <span style={{ color: '#fb923c' }}>⭐⭐⭐⭐⭐</span></div>
              <div><span style={{ color: '#fff' }}>{'}'}</span></div>
            </div>
          </div>
        )}

        {/* Corner glow */}
        <div style={{
          position: 'absolute', bottom: -40, right: -40,
          width: 160, height: 160, borderRadius: '50%',
          background: `radial-gradient(circle, ${accent}20 0%, transparent 70%)`,
          transition: 'opacity 0.3s',
          opacity: hov ? 1 : 0.4,
        }} />
      </div>
    </motion.div>
  )
}

// Small card
function SmallCard({ project, index }) {
  const [hov, setHov] = useState(false)
  const accent = CARD_ACCENTS[(index + 3) % CARD_ACCENTS.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 18, overflow: 'hidden',
        border: `1px solid ${hov ? accent + '45' : 'rgba(255,255,255,0.06)'}`,
        background: 'rgba(255,255,255,0.02)',
        transition: 'all 0.3s ease',
        transform: hov ? 'translateY(-4px)' : 'none',
        boxShadow: hov ? `0 20px 50px rgba(0,0,0,0.4), 0 0 0 1px ${accent}18` : 'none',
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Top color strip */}
      <div style={{
        height: 3,
        background: `linear-gradient(90deg, ${accent}, ${CARD_ACCENTS[(index+4)%6]}88)`,
        opacity: hov ? 1 : 0.3,
        transition: 'opacity 0.3s',
      }} />

      <div style={{ padding: '24px 24px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
          <h3 style={{
            fontSize: 16, fontWeight: 700, margin: 0,
            color: hov ? '#fff' : 'rgba(255,255,255,0.82)',
            transition: 'color 0.25s',
          }}>
            {project.title}
          </h3>
          <span style={{
            fontSize: 10, fontFamily: 'monospace', fontWeight: 700,
            color: hov ? accent : 'rgba(255,255,255,0.18)',
            transition: 'color 0.25s', flexShrink: 0, marginLeft: 8,
          }}>
            {String(index + 4).padStart(2, '0')}
          </span>
        </div>

        <p style={{
          fontSize: 13, lineHeight: 1.65, color: 'rgba(255,255,255,0.36)',
          margin: '0 0 16px', flex: 1,
        }}>
          {project.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 16 }}>
          {(project.tags || []).map(tag => (
            <span key={tag} style={{
              fontSize: 10, padding: '2px 8px', borderRadius: 99,
              background: tc(tag) + '10', border: `1px solid ${tc(tag)}25`,
              color: tc(tag), fontFamily: 'monospace', fontWeight: 700,
            }}>
              {tag}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          {project.liveUrl && project.liveUrl !== '#' && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                fontSize: 12, fontWeight: 600, color: accent,
                textDecoration: 'none', opacity: hov ? 1 : 0.6,
                transition: 'opacity 0.25s',
              }}>
              <FiExternalLink size={12} /> Live
            </a>
          )}
          {project.githubUrl && project.githubUrl !== '#' && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                fontSize: 12, fontWeight: 600,
                color: 'rgba(255,255,255,0.4)', textDecoration: 'none',
                opacity: hov ? 1 : 0.5, transition: 'opacity 0.25s',
              }}>
              <FiGithub size={12} /> Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects({ projects }) {
  const [showAll, setShowAll] = useState(false)
  const list = projects?.length ? projects : DEFAULTS
  const featured = list.filter(p => p.featured)
  const others = list.filter(p => !p.featured)
  const visibleOthers = showAll ? others : others.slice(0, 3)

  return (
    <section id="projects" style={{
      padding: '110px 0',
      background: 'linear-gradient(180deg, #080814 0%, #060610 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '25%', right: '-8%',
        width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px', position: 'relative' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: 56 }}
        >
          <p style={{
            color: '#f59e0b', fontSize: 12, fontWeight: 700,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            fontFamily: 'monospace', margin: '0 0 12px',
          }}>
            Selected Work
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <h2 style={{
              fontSize: 52, fontWeight: 800, color: '#fff',
              margin: 0, lineHeight: 1.05, letterSpacing: '-0.03em',
            }}>
              Things I&apos;ve{' '}
              <span style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #f472b6 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                built
              </span>
            </h2>
            <span style={{
              color: 'rgba(255,255,255,0.25)', fontSize: 13,
              fontFamily: 'monospace',
            }}>
              {list.length} projects total
            </span>
          </div>
        </motion.div>

        {/* Featured — stacked big cards */}
        {featured.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 16 }}>
            {featured.map((p, i) => (
              <FeaturedCard key={p.id} project={p} index={i} />
            ))}
          </div>
        )}

        {/* Other projects — 3-col grid */}
        {others.length > 0 && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14, marginBottom: 36 }}>
              <AnimatePresence>
                {visibleOthers.map((p, i) => (
                  <SmallCard key={p.id} project={p} index={i} />
                ))}
              </AnimatePresence>
            </div>

            {others.length > 3 && (
              <div style={{ textAlign: 'center' }}>
                <motion.button
                  onClick={() => setShowAll(!showAll)}
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  style={{
                    padding: '12px 32px', borderRadius: 12, cursor: 'pointer',
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.03)',
                    color: 'rgba(255,255,255,0.55)', fontFamily: 'inherit',
                    fontSize: 14, fontWeight: 600,
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    transition: 'all 0.2s',
                  }}>
                  {showAll ? 'Show less' : `See ${others.length - 3} more projects`}
                  <FiArrowRight size={14}
                    style={{ transform: showAll ? 'rotate(90deg)' : 'none', transition: 'transform 0.3s' }} />
                </motion.button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
