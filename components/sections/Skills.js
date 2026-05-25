'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CATS = ['All', 'Salesforce', 'Frontend', 'Backend', 'WordPress']

const META = {
  Salesforce: { color: '#00a1e0' },
  Frontend:   { color: '#a78bfa' },
  Backend:    { color: '#f59e0b' },
  WordPress:  { color: '#34d399' },
}

// Fallback devicon logos by exact skill name
const DEVICON_LOGOS = {
  'JavaScript':   'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  'TypeScript':   'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  'React':        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'Next.js':      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  'Vue.js':       'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
  'HTML5':        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  'CSS3':         'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  'SASS':         'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg',
  'SCSS':         'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg',
  'Bootstrap':    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
  'Tailwind CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  'Tailwind':     'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  'Node.js':      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'Express.js':   'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  'Express':      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  'Python':       'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  'PHP':          'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
  'MongoDB':      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  'PostgreSQL':   'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  'MySQL':        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  'Git':          'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  'GitHub':       'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
  'WordPress':    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-original.svg',
  'Figma':        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
  'Django':       'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
  'GraphQL':      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
}

// Skills to invert (dark icons on dark bg)
const INVERT_ICONS = ['Next.js', 'GitHub', 'Express.js', 'Express', 'Django']

const DEFAULT_SKILLS = [
  { id:1,  name:'JavaScript',   category:'Frontend',   icon: DEVICON_LOGOS['JavaScript'] },
  { id:2,  name:'React',        category:'Frontend',   icon: DEVICON_LOGOS['React'] },
  { id:3,  name:'Next.js',      category:'Frontend',   icon: DEVICON_LOGOS['Next.js'] },
  { id:4,  name:'Tailwind CSS', category:'Frontend',   icon: DEVICON_LOGOS['Tailwind CSS'] },
  { id:5,  name:'Bootstrap',    category:'Frontend',   icon: DEVICON_LOGOS['Bootstrap'] },
  { id:6,  name:'TypeScript',   category:'Frontend',   icon: DEVICON_LOGOS['TypeScript'] },
  { id:7,  name:'HTML5',        category:'Frontend',   icon: DEVICON_LOGOS['HTML5'] },
  { id:8,  name:'CSS3',         category:'Frontend',   icon: DEVICON_LOGOS['CSS3'] },
  { id:9,  name:'Node.js',      category:'Backend',    icon: DEVICON_LOGOS['Node.js'] },
  { id:10, name:'MongoDB',      category:'Backend',    icon: DEVICON_LOGOS['MongoDB'] },
  { id:11, name:'PostgreSQL',   category:'Backend',    icon: DEVICON_LOGOS['PostgreSQL'] },
  { id:12, name:'Python',       category:'Backend',    icon: DEVICON_LOGOS['Python'] },
  { id:13, name:'MySQL',        category:'Backend',    icon: DEVICON_LOGOS['MySQL'] },
  { id:14, name:'PHP',          category:'Backend',    icon: DEVICON_LOGOS['PHP'] },
  { id:15, name:'Git',          category:'Backend',    icon: DEVICON_LOGOS['Git'] },
  { id:16, name:'GitHub',       category:'Backend',    icon: DEVICON_LOGOS['GitHub'] },
  { id:17, name:'Admin',        category:'Salesforce', icon: '' },
  { id:18, name:'LWC',          category:'Salesforce', icon: '' },
  { id:19, name:'Apex',         category:'Salesforce', icon: '' },
  { id:20, name:'Flows',        category:'Salesforce', icon: '' },
  { id:21, name:'Sales Cloud',  category:'Salesforce', icon: '' },
  { id:22, name:'Integration',  category:'Salesforce', icon: '' },
  { id:23, name:'WordPress',    category:'WordPress',  icon: DEVICON_LOGOS['WordPress'] },
  { id:24, name:'Elementor',    category:'WordPress',  icon: '' },
  { id:25, name:'WooCommerce',  category:'WordPress',  icon: '' },
  { id:26, name:'PHP',          category:'WordPress',  icon: DEVICON_LOGOS['PHP'] },
  { id:27, name:'MySQL',        category:'WordPress',  icon: DEVICON_LOGOS['MySQL'] },
  { id:28, name:'Figma',        category:'WordPress',  icon: DEVICON_LOGOS['Figma'] },
]

function SkillIcon({ skill, color }) {
  // Priority: 1. Custom icon from DB/Cloudinary  2. Devicon fallback  3. Text badge
  const iconUrl = skill.icon || DEVICON_LOGOS[skill.name] || ''
  const shouldInvert = INVERT_ICONS.includes(skill.name)
  const initials = skill.name.slice(0, 2).toUpperCase()

  if (iconUrl) {
    return (
      <img
        src={iconUrl}
        alt={skill.name}
        width={28} height={28}
        style={{
          objectFit: 'contain',
          filter: shouldInvert ? 'invert(1) brightness(0.75)' : 'none',
          transition: 'transform 0.25s ease',
          flexShrink: 0,
        }}
        onError={(e) => { e.target.style.display = 'none' }}
      />
    )
  }

  return (
    <div style={{
      width: 28, height: 28, borderRadius: 6,
      background: color + '20', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      fontSize: 9, fontWeight: 800, color,
      fontFamily: 'monospace', letterSpacing: '-0.02em',
      flexShrink: 0,
    }}>
      {initials}
    </div>
  )
}

function SkillCard({ skill, index, color }) {
  const [hov, setHov] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.88, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.88 }}
      transition={{ delay: index * 0.035, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 13,
        padding: '13px 17px', borderRadius: 13,
        border: `1.5px solid ${hov ? color + '55' : 'rgba(0,212,255,0.1)'}`,
        background: hov
          ? `linear-gradient(135deg, ${color}0a, rgba(255,255,255,0.02))`
          : 'rgba(255,255,255,0.02)',
        cursor: 'default',
        transition: 'all 0.22s ease',
        transform: hov ? 'translateY(-3px) scale(1.02)' : 'none',
        boxShadow: hov ? `0 8px 28px ${color}18` : 'none',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Icon box */}
      <div style={{
        width: 40, height: 40, borderRadius: 10, flexShrink: 0,
        background: hov ? color + '15' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${hov ? color + '30' : 'rgba(255,255,255,0.07)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.22s',
        overflow: 'hidden',
      }}>
        <SkillIcon skill={skill} color={color} />
      </div>

      {/* Name */}
      <span style={{
        fontSize: 13, fontWeight: 600, letterSpacing: '0.01em',
        color: hov ? '#fff' : 'rgba(255,255,255,0.72)',
        transition: 'color 0.22s',
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
      }}>
        {skill.name}
      </span>
    </motion.div>
  )
}

export default function Skills({ skills }) {
  const [activeCat, setActiveCat] = useState('All')

  const list = skills?.length ? skills : DEFAULT_SKILLS

  const filtered = activeCat === 'All'
    ? list
    : list.filter(s => s.category === activeCat)

  const counts = CATS.reduce((acc, c) => {
    acc[c] = c === 'All' ? list.length : list.filter(s => s.category === c).length
    return acc
  }, {})

  const activeColor = activeCat === 'All' ? '#00d4ff' : (META[activeCat]?.color || '#00d4ff')

  return (
    <section id="skills" style={{
      padding: '110px 0',
      background: '#060610',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Grid bg */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px)
        `,
        backgroundSize: '52px 52px',
      }} />

      {/* Top glow */}
      <div style={{
        position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)',
        width: 700, height: 300,
        background: `radial-gradient(ellipse, ${activeColor}09 0%, transparent 65%)`,
        transition: 'background 0.6s ease',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px', position: 'relative' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <h2 style={{
            fontSize: 48, fontWeight: 800, color: '#fff',
            margin: '0 0 8px', letterSpacing: '-0.025em',
          }}>
            Skills
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 15, margin: '0 0 14px' }}>
            My technical level
          </p>
          <div style={{
            width: 44, height: 2.5,
            background: `linear-gradient(90deg, ${activeColor}, transparent)`,
            margin: '0 auto', borderRadius: 2,
            transition: 'background 0.5s',
          }} />
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 44 }}
        >
          {CATS.map(cat => {
            const active = activeCat === cat
            const catColor = cat === 'All' ? '#00d4ff' : (META[cat]?.color || '#00d4ff')
            return (
              <motion.button
                key={cat}
                onClick={() => setActiveCat(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '9px 22px', borderRadius: 99, cursor: 'pointer',
                  fontFamily: 'inherit', fontSize: 14, fontWeight: 600,
                  border: `1.5px solid ${active ? catColor : 'rgba(255,255,255,0.1)'}`,
                  background: active ? catColor + '12' : 'transparent',
                  color: active ? catColor : 'rgba(255,255,255,0.4)',
                  transition: 'all 0.2s ease',
                  boxShadow: active ? `0 0 20px ${catColor}22` : 'none',
                  display: 'flex', alignItems: 'center', gap: 7,
                }}
              >
                <span>{cat}</span>
                <span style={{
                  fontSize: 11, minWidth: 18, textAlign: 'center',
                  fontFamily: 'monospace',
                  color: active ? catColor + 'cc' : 'rgba(255,255,255,0.22)',
                }}>
                  {counts[cat]}
                </span>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCat}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(185px, 1fr))',
              gap: 9,
            }}
          >
            {filtered.map((skill, i) => (
              <SkillCard
                key={`${skill.id}-${skill.name}`}
                skill={skill}
                index={i}
                color={META[skill.category]?.color || '#00d4ff'}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center', marginTop: 44,
            color: 'rgba(255,255,255,0.15)', fontSize: 11,
            fontFamily: 'monospace', letterSpacing: '0.12em',
          }}
        >
          {filtered.length} SKILLS · ALWAYS EXPANDING
        </motion.p>
      </div>
    </section>
  )
}
