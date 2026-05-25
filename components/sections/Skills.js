'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CATS = ['All', 'Salesforce', 'Frontend', 'Backend', 'WordPress']

const META = {
  Salesforce: { color: '#00a1e0' },
  Frontend:   { color: '#7c3aed' },
  Backend:    { color: '#d97706' },
  WordPress:  { color: '#059669' },
}

const DEVICON = {
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

const INVERT = ['Next.js', 'GitHub', 'Express.js', 'Express', 'Django']

const DEFAULT_SKILLS = [
  { id:1,  name:'JavaScript',   category:'Frontend',   icon:'' },
  { id:2,  name:'React',        category:'Frontend',   icon:'' },
  { id:3,  name:'Next.js',      category:'Frontend',   icon:'' },
  { id:4,  name:'Tailwind CSS', category:'Frontend',   icon:'' },
  { id:5,  name:'Bootstrap',    category:'Frontend',   icon:'' },
  { id:6,  name:'TypeScript',   category:'Frontend',   icon:'' },
  { id:7,  name:'HTML5',        category:'Frontend',   icon:'' },
  { id:8,  name:'CSS3',         category:'Frontend',   icon:'' },
  { id:9,  name:'Node.js',      category:'Backend',    icon:'' },
  { id:10, name:'MongoDB',      category:'Backend',    icon:'' },
  { id:11, name:'PostgreSQL',   category:'Backend',    icon:'' },
  { id:12, name:'Python',       category:'Backend',    icon:'' },
  { id:13, name:'MySQL',        category:'Backend',    icon:'' },
  { id:14, name:'PHP',          category:'Backend',    icon:'' },
  { id:15, name:'Git',          category:'Backend',    icon:'' },
  { id:16, name:'GitHub',       category:'Backend',    icon:'' },
  { id:17, name:'Admin',        category:'Salesforce', icon:'' },
  { id:18, name:'LWC',          category:'Salesforce', icon:'' },
  { id:19, name:'Apex',         category:'Salesforce', icon:'' },
  { id:20, name:'Flows',        category:'Salesforce', icon:'' },
  { id:21, name:'Sales Cloud',  category:'Salesforce', icon:'' },
  { id:22, name:'Integration',  category:'Salesforce', icon:'' },
  { id:23, name:'WordPress',    category:'WordPress',  icon:'' },
  { id:24, name:'Elementor',    category:'WordPress',  icon:'' },
  { id:25, name:'WooCommerce',  category:'WordPress',  icon:'' },
  { id:26, name:'PHP',          category:'WordPress',  icon:'' },
  { id:27, name:'MySQL',        category:'WordPress',  icon:'' },
  { id:28, name:'Figma',        category:'WordPress',  icon:'' },
]

function SkillIcon({ skill, color, isDark }) {
  const iconUrl = skill.icon || DEVICON[skill.name] || ''
  const shouldInvert = INVERT.includes(skill.name)

  if (iconUrl) {
    return (
      <img
        src={iconUrl} alt={skill.name} width={26} height={26}
        style={{
          objectFit: 'contain', flexShrink: 0,
          filter: shouldInvert
            ? (isDark ? 'invert(1) brightness(0.75)' : 'invert(0) brightness(0.3)')
            : 'none',
          transition: 'transform 0.25s ease',
        }}
        onError={e => { e.target.style.display = 'none' }}
      />
    )
  }
  return (
    <div style={{
      width: 26, height: 26, borderRadius: 6, flexShrink: 0,
      background: color + '22', display: 'flex', alignItems: 'center',
      justifyContent: 'center', fontSize: 9, fontWeight: 800,
      color, fontFamily: 'monospace',
    }}>
      {skill.name.slice(0, 2).toUpperCase()}
    </div>
  )
}

function SkillCard({ skill, index, color, isDark }) {
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
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '12px 16px', borderRadius: 13, cursor: 'default',
        border: `1.5px solid ${hov ? color + '66' : 'var(--border-color)'}`,
        background: hov ? `linear-gradient(135deg, ${color}0d, var(--card-bg))` : 'var(--card-bg)',
        transition: 'all 0.22s ease',
        transform: hov ? 'translateY(-3px) scale(1.02)' : 'none',
        boxShadow: hov ? `0 8px 28px ${color}20` : 'none',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <div style={{
        width: 40, height: 40, borderRadius: 10, flexShrink: 0,
        background: hov ? color + '18' : 'var(--bg-surface)',
        border: `1px solid ${hov ? color + '35' : 'var(--border-color)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.22s', overflow: 'hidden',
      }}>
        <SkillIcon skill={skill} color={color} isDark={isDark} />
      </div>
      <span style={{
        fontSize: 13, fontWeight: 600, letterSpacing: '0.01em',
        color: hov ? 'var(--text-primary)' : 'var(--text-secondary)',
        transition: 'color 0.22s', whiteSpace: 'nowrap',
        overflow: 'hidden', textOverflow: 'ellipsis',
      }}>
        {skill.name}
      </span>
    </motion.div>
  )
}

export default function Skills({ skills }) {
  const [activeCat, setActiveCat] = useState('All')
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const check = () => {
      setIsDark(document.documentElement.getAttribute('data-theme') !== 'light')
    }
    check()
    const observer = new MutationObserver(check)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  const list = skills?.length ? skills : DEFAULT_SKILLS
  const filtered = activeCat === 'All' ? list : list.filter(s => s.category === activeCat)
  const counts = CATS.reduce((acc, c) => {
    acc[c] = c === 'All' ? list.length : list.filter(s => s.category === c).length
    return acc
  }, {})
  const activeColor = activeCat === 'All' ? 'var(--accent)' : (META[activeCat]?.color || 'var(--accent)')

  return (
    <section id="skills" style={{ padding: '110px 0', background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)', backgroundSize: '52px 52px' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px', position: 'relative' }}>
        <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 48, fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 8px', letterSpacing: '-0.025em' }}>Skills</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 15, margin: '0 0 14px' }}>My technical level</p>
          <div style={{ width: 44, height: 2.5, background: `linear-gradient(90deg, var(--accent), transparent)`, margin: '0 auto', borderRadius: 2 }} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
          style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 44 }}>
          {CATS.map(cat => {
            const active = activeCat === cat
            const catColor = cat === 'All' ? 'var(--accent)' : (META[cat]?.color || 'var(--accent)')
            return (
              <motion.button key={cat} onClick={() => setActiveCat(cat)}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                style={{
                  padding: '9px 22px', borderRadius: 99, cursor: 'pointer',
                  fontFamily: 'inherit', fontSize: 14, fontWeight: 600,
                  border: `1.5px solid ${active ? catColor : 'var(--border-color)'}`,
                  background: active ? catColor + '14' : 'transparent',
                  color: active ? catColor : 'var(--text-muted)',
                  transition: 'all 0.2s ease',
                  display: 'flex', alignItems: 'center', gap: 7,
                }}>
                <span>{cat}</span>
                <span style={{ fontSize: 11, fontFamily: 'monospace', color: active ? catColor : 'var(--text-faint)' }}>
                  {counts[cat]}
                </span>
              </motion.button>
            )
          })}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={activeCat} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(185px, 1fr))', gap: 9 }}>
            {filtered.map((skill, i) => (
              <SkillCard key={`${skill.id}-${skill.name}`} skill={skill} index={i}
                color={META[skill.category]?.color || 'var(--accent)'} isDark={isDark} />
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{ textAlign: 'center', marginTop: 44, color: 'var(--text-faint)', fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.12em' }}>
          {filtered.length} SKILLS · ALWAYS EXPANDING
        </motion.p>
      </div>
    </section>
  )
}
