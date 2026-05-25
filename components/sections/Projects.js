'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiExternalLink, FiGithub, FiArrowRight } from 'react-icons/fi'
import Image from 'next/image'

const TAG_COLORS = {
  React:'#61dafb','Node.js':'#68a063',MongoDB:'#47a248',Stripe:'#635bff',
  Apex:'#00a1e0',LWC:'#22d3ee',Flows:'#a78bfa',Integration:'#f59e0b',
  WordPress:'#3858e9',PHP:'#777bb4',Elementor:'#e2194b',SEO:'#34d399',
  'Next.js':'#555',Prisma:'#5a67d8',PostgreSQL:'#336791',
  Tailwind:'#38bdf8','Chart.js':'#ff6384','Meta API':'#1877f2',
  Express:'#888',MySQL:'#4479a1',Python:'#3572A5',
}
const tc = t => TAG_COLORS[t] || '#0284c7'

const GRADIENTS = [
  ['rgba(34,211,238,.12)','rgba(99,102,241,.12)'],
  ['rgba(167,139,250,.12)','rgba(244,114,182,.12)'],
  ['rgba(245,158,11,.12)','rgba(251,146,60,.12)'],
  ['rgba(52,211,153,.12)','rgba(34,211,238,.12)'],
  ['rgba(244,114,182,.12)','rgba(167,139,250,.12)'],
  ['rgba(251,146,60,.12)','rgba(245,158,11,.12)'],
]
const ACCENTS = ['#0284c7','#7c3aed','#059669','#d97706','#db2777','#ea580c']

const DEFAULTS = [
  { id:1, title:'E-Commerce Platform',   description:'A full-stack store with Stripe payments, real-time inventory, admin analytics and a customer portal built to handle scale.',        tags:['React','Node.js','MongoDB','Stripe'],  liveUrl:'#', githubUrl:'#', featured:true  },
  { id:2, title:'Salesforce CRM Suite',  description:'Enterprise CRM with custom LWC components, 3 external API integrations, batch Apex jobs, and automated lead-to-close flows.',      tags:['Apex','LWC','Flows','Integration'],    liveUrl:'#', githubUrl:'#', featured:true  },
  { id:3, title:'Corporate Website',     description:'WordPress site ranking page-1 for 12 target keywords. Custom Elementor theme, 95+ PageSpeed score, and a full blog system.',       tags:['WordPress','Elementor','SEO','PHP'],   liveUrl:'#', githubUrl:'#', featured:true  },
  { id:4, title:'Real Estate Portal',    description:'Property listing platform with Mapbox search, advanced filters, landlord dashboard, and automated viewing request emails.',          tags:['Next.js','Prisma','PostgreSQL'],       liveUrl:'#', githubUrl:'#', featured:false },
  { id:5, title:'Meta Ads Dashboard',    description:'Live analytics dashboard pulling from the Meta Graph API. Campaign heatmaps, ROI calculator, and automated PDF reports.',           tags:['React','Meta API','Chart.js'],         liveUrl:'#', githubUrl:'#', featured:false },
  { id:6, title:'Restaurant Booking',    description:'Table reservation system with live seat availability, WhatsApp confirmations, and a full manager panel for staff scheduling.',       tags:['Next.js','Tailwind','Node.js','MySQL'], liveUrl:'#', githubUrl:'#', featured:false },
]

function FeaturedCard({ project, index }) {
  const [hov, setHov] = useState(false)
  const accent = ACCENTS[index % ACCENTS.length]
  const [g1, g2] = GRADIENTS[index % GRADIENTS.length]

  return (
    <motion.div
      initial={{ opacity:0, y:40 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, margin:'-30px' }}
      transition={{ delay: index * 0.12, duration:0.6, ease:[0.22,1,0.36,1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius:22, overflow:'hidden',
        border:`1px solid ${hov ? accent+'55' : 'var(--border-color)'}`,
        background:'var(--card-bg)',
        transition:'all 0.35s cubic-bezier(0.4,0,0.2,1)',
        transform: hov ? 'translateY(-5px)' : 'none',
        boxShadow: hov ? `0 30px 70px rgba(0,0,0,0.15), 0 0 0 1px ${accent}20` : 'none',
        display:'grid', gridTemplateColumns:'1fr 1fr', minHeight:260,
      }}
    >
      {/* Left — content */}
      <div style={{ padding:'36px', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:18 }}>
            <span style={{ fontSize:11, fontFamily:'monospace', fontWeight:700, color:accent, letterSpacing:'0.05em' }}>
              {String(index+1).padStart(2,'0')}
            </span>
            <span style={{ fontSize:9, padding:'2px 8px', borderRadius:99, background:accent+'15', border:`1px solid ${accent}35`, color:accent, fontWeight:700, letterSpacing:'0.1em' }}>
              FEATURED
            </span>
          </div>
          <h3 style={{ fontSize:22, fontWeight:800, margin:'0 0 12px', color:'var(--text-primary)', letterSpacing:'-0.02em', lineHeight:1.2 }}>
            {project.title}
          </h3>
          <p style={{ fontSize:14, lineHeight:1.7, margin:0, color:'var(--text-muted)' }}>
            {project.description}
          </p>
        </div>
        <div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:22 }}>
            {(project.tags||[]).map(tag => (
              <span key={tag} style={{ fontSize:10, padding:'3px 10px', borderRadius:99, background:tc(tag)+'12', border:`1px solid ${tc(tag)}28`, color:tc(tag), fontFamily:'monospace', fontWeight:700 }}>
                {tag}
              </span>
            ))}
          </div>
          <div style={{ display:'flex', gap:10 }}>
            {project.liveUrl && project.liveUrl !== '#' && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'9px 18px', borderRadius:10, background:accent, color:'#fff', fontWeight:700, fontSize:12, textDecoration:'none' }}>
                <FiExternalLink size={13} /> Live Demo
              </a>
            )}
            {project.githubUrl && project.githubUrl !== '#' && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'9px 18px', borderRadius:10, border:'1px solid var(--border-color)', background:'var(--bg-surface)', color:'var(--text-muted)', fontWeight:600, fontSize:12, textDecoration:'none' }}>
                <FiGithub size={13} /> Code
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Right — visual */}
      <div style={{
        position:'relative', overflow:'hidden',
        background:`linear-gradient(135deg, ${g1}, ${g2})`,
        borderLeft:`1px solid ${hov ? accent+'30' : 'var(--border-color)'}`,
        display:'flex', alignItems:'center', justifyContent:'center',
        transition:'border-color 0.3s',
      }}>
        {project.image ? (
          <Image src={project.image} alt={project.title} fill style={{ objectFit:'cover' }} />
        ) : (
          <div style={{
            background:'var(--card-bg)', border:'1px solid var(--border-color)',
            borderRadius:12, padding:'20px 24px', fontFamily:'monospace',
            fontSize:12, lineHeight:1.8, textAlign:'left', maxWidth:240,
            backdropFilter:'blur(10px)',
          }}>
            <div style={{ color:'var(--text-faint)', marginBottom:8, fontSize:10 }}>● ● ●</div>
            <div><span style={{ color:'#a78bfa' }}>const</span> <span style={{ color:accent }}>project</span> <span style={{ color:'var(--text-primary)' }}>= {'{'}</span></div>
            <div style={{ paddingLeft:14 }}><span style={{ color:'#34d399' }}>title</span><span style={{ color:'var(--text-primary)' }}>:</span> <span style={{ color:'#f59e0b' }}>&apos;{project.title.slice(0,12)}&apos;</span><span style={{ color:'var(--text-primary)' }}>,</span></div>
            <div style={{ paddingLeft:14 }}><span style={{ color:'#34d399' }}>status</span><span style={{ color:'var(--text-primary)' }}>:</span> <span style={{ color:accent }}>&apos;shipped&apos;</span><span style={{ color:'var(--text-primary)' }}>,</span></div>
            <div style={{ paddingLeft:14 }}><span style={{ color:'#34d399' }}>rating</span><span style={{ color:'var(--text-primary)' }}>:</span> <span style={{ color:'#f59e0b' }}>⭐⭐⭐⭐⭐</span></div>
            <div><span style={{ color:'var(--text-primary)' }}>{'}'}</span></div>
          </div>
        )}
        <div style={{ position:'absolute', bottom:-40, right:-40, width:160, height:160, borderRadius:'50%', background:`radial-gradient(circle, ${accent}20 0%, transparent 70%)`, opacity: hov ? 1 : 0.4, transition:'opacity 0.3s' }} />
      </div>
    </motion.div>
  )
}

function SmallCard({ project, index }) {
  const [hov, setHov] = useState(false)
  const accent = ACCENTS[(index+3) % ACCENTS.length]

  return (
    <motion.div
      initial={{ opacity:0, y:30 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, margin:'-20px' }}
      transition={{ delay: index * 0.1, duration:0.5, ease:[0.22,1,0.36,1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius:18, overflow:'hidden',
        border:`1px solid ${hov ? accent+'45' : 'var(--border-color)'}`,
        background:'var(--card-bg)',
        transition:'all 0.3s ease',
        transform: hov ? 'translateY(-4px)' : 'none',
        boxShadow: hov ? `0 20px 50px rgba(0,0,0,0.1), 0 0 0 1px ${accent}18` : 'none',
        display:'flex', flexDirection:'column',
      }}
    >
      <div style={{ height:3, background:`linear-gradient(90deg, ${accent}, transparent)`, opacity: hov ? 1 : 0.3, transition:'opacity 0.3s' }} />
      <div style={{ padding:'22px 22px 20px', flex:1, display:'flex', flexDirection:'column' }}>
        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:10 }}>
          <h3 style={{ fontSize:15, fontWeight:700, margin:0, color:'var(--text-primary)' }}>
            {project.title}
          </h3>
          <span style={{ fontSize:10, fontFamily:'monospace', fontWeight:700, color: hov ? accent : 'var(--text-faint)', transition:'color 0.25s', flexShrink:0, marginLeft:8 }}>
            {String(index+4).padStart(2,'0')}
          </span>
        </div>
        <p style={{ fontSize:13, lineHeight:1.65, color:'var(--text-muted)', margin:'0 0 14px', flex:1 }}>
          {project.description}
        </p>
        <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginBottom:14 }}>
          {(project.tags||[]).map(tag => (
            <span key={tag} style={{ fontSize:10, padding:'2px 8px', borderRadius:99, background:tc(tag)+'10', border:`1px solid ${tc(tag)}25`, color:tc(tag), fontFamily:'monospace', fontWeight:700 }}>
              {tag}
            </span>
          ))}
        </div>
        <div style={{ display:'flex', gap:10 }}>
          {project.liveUrl && project.liveUrl !== '#' && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              style={{ display:'inline-flex', alignItems:'center', gap:5, fontSize:12, fontWeight:600, color:accent, textDecoration:'none' }}>
              <FiExternalLink size={12} /> Live
            </a>
          )}
          {project.githubUrl && project.githubUrl !== '#' && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              style={{ display:'inline-flex', alignItems:'center', gap:5, fontSize:12, fontWeight:600, color:'var(--text-muted)', textDecoration:'none' }}>
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
  const others   = list.filter(p => !p.featured)
  const visibleOthers = showAll ? others : others.slice(0, 3)

  return (
    <section id="projects" style={{ padding:'110px 0', background:'var(--bg-primary)', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:'25%', right:'-8%', width:600, height:600, background:'radial-gradient(circle, rgba(124,58,237,0.04) 0%, transparent 70%)', pointerEvents:'none' }} />

      <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 28px', position:'relative' }}>
        <motion.div initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} style={{ marginBottom:56 }}>
          <p style={{ color:'var(--accent-amber)', fontSize:12, fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', fontFamily:'monospace', margin:'0 0 12px' }}>
            Selected Work
          </p>
          <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
            <h2 style={{ fontSize:48, fontWeight:800, color:'var(--text-primary)', margin:0, lineHeight:1.05, letterSpacing:'-0.03em' }}>
              Things I&apos;ve{' '}
              <span style={{ background:'linear-gradient(135deg, var(--accent-amber), #db2777)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                built
              </span>
            </h2>
            <span style={{ color:'var(--text-faint)', fontSize:13, fontFamily:'monospace' }}>
              {list.length} projects total
            </span>
          </div>
        </motion.div>

        {/* Featured */}
        {featured.length > 0 && (
          <div style={{ display:'flex', flexDirection:'column', gap:16, marginBottom:16 }}>
            {featured.map((p, i) => <FeaturedCard key={p.id} project={p} index={i} />)}
          </div>
        )}

        {/* Others */}
        {others.length > 0 && (
          <>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:14, marginBottom:36 }}>
              <AnimatePresence>
                {visibleOthers.map((p, i) => <SmallCard key={p.id} project={p} index={i} />)}
              </AnimatePresence>
            </div>
            {others.length > 3 && (
              <div style={{ textAlign:'center' }}>
                <motion.button
                  onClick={() => setShowAll(!showAll)}
                  whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
                  style={{
                    padding:'12px 30px', borderRadius:12, cursor:'pointer',
                    border:'1px solid var(--border-color)', background:'var(--card-bg)',
                    color:'var(--text-muted)', fontFamily:'inherit',
                    fontSize:14, fontWeight:600,
                    display:'inline-flex', alignItems:'center', gap:8,
                    transition:'all 0.2s',
                  }}>
                  {showAll ? 'Show less' : `See ${others.length - 3} more projects`}
                  <FiArrowRight size={14} style={{ transform: showAll ? 'rotate(90deg)' : 'none', transition:'transform 0.3s' }} />
                </motion.button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
