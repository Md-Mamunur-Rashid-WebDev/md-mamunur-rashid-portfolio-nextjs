'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiBriefcase, FiCalendar, FiMapPin, FiExternalLink } from 'react-icons/fi'

const EXPERIENCES = [
  {
    id: 1,
    role: 'Salesforce Technical Consultant',
    company: 'GFGG IT Solutions',
    companyUrl: 'https://www.linkedin.com/in/webdevmamun/',
    location: 'United States · Remote',
    type: 'Full-time',
    from: 'Apr 2023',
    to: 'Present',
    current: true,
    description: 'Acted as a Salesforce Administrator and Developer for client organizations. Designed and built custom Lightning pages using LWC. Managed Salesforce automations using Flow Builder, Process Builder, and validation rules. Conducted system analysis and optimized CRM processes to improve operational efficiency.',
    achievements: [
      'Acted as Salesforce Admin & Developer for client orgs',
      'Built custom Lightning pages using LWC',
      'Managed automations with Flow & Process Builder',
      'Optimized CRM processes for operational efficiency',
      'Collaborated with stakeholders on Salesforce enhancements',
      'Ensured data integrity via regular audits & backups',
    ],
    platforms: 'Salesforce · LWC · Flow Builder · Process Builder · Apex · Data Loader · CRM Analytics',
    skills: ['Salesforce', 'LWC', 'Apex', 'Flow Builder', 'Process Builder', 'Data Loader', 'CRM Analytics'],
    color: '#00a1e0',
  },
  {
    id: 2,
    role: 'Meta Ads Specialist (Facebook/Instagram)',
    company: 'Self-employed',
    companyUrl: 'https://www.linkedin.com/in/webdevmamun/',
    location: 'Remote',
    type: 'Self-employed',
    from: 'Jan 2023',
    to: 'Present',
    current: true,
    description: 'Created and managed Meta Ad campaigns for small and medium businesses. Conducted audience research, ad copywriting, creative selection, and A/B testing. Optimized ads to reduce cost per conversion and improve overall ad performance. Helped local businesses generate leads and boost product sales through data-driven strategies.',
    achievements: [
      'Created & managed Meta Ad campaigns for SMBs',
      'Audience research, copywriting & A/B testing',
      'Reduced cost per conversion through optimization',
      'Delivered detailed campaign performance reports',
      'Boosted product sales via data-driven strategies',
    ],
    platforms: 'Meta Ads Manager · Facebook Pixel · Instagram Ads · Google Analytics · Canva',
    skills: ['Meta Ads', 'Facebook Ads', 'Instagram Ads', 'A/B Testing', 'Google Analytics', 'Canva'],
    color: '#1877f2',
  },
  {
    id: 3,
    role: 'WordPress Designer & Frontend Developer',
    company: 'Freelance',
    companyUrl: 'https://www.linkedin.com/in/webdevmamun/',
    location: 'Remote',
    type: 'Freelance',
    from: 'Jan 2018',
    to: 'Present',
    current: true,
    description: 'Designed and developed fully responsive websites using WordPress and Elementor for clients in various industries. Customized premium and free themes to meet client branding requirements. Implemented on-page SEO strategies and keyword optimization. Assisted small business owners with domain setup, hosting configuration, and site deployment.',
    achievements: [
      'Built responsive WordPress sites with Elementor',
      'Customized themes for client branding needs',
      'Implemented on-page SEO & keyword strategies',
      'Ensured mobile-friendly, performance-optimized builds',
      'Managed domain setup, hosting & deployments',
      'Collaborated with clients to deliver real business value',
    ],
    platforms: 'WordPress · Elementor · Astra Theme · OceanWP · Yoast SEO · HTML5 · CSS3 · Canva',
    skills: ['WordPress', 'Elementor', 'PHP', 'HTML5', 'CSS3', 'SEO', 'Canva'],
    color: '#21759b',
  },
]

const TYPE_COLORS = {
  'Self-employed': { bg: 'rgba(0,212,255,0.08)',   border: 'rgba(0,212,255,0.22)',   color: '#22d3ee' },
  'Full-time':     { bg: 'rgba(52,211,153,0.08)',  border: 'rgba(52,211,153,0.22)',  color: '#34d399' },
  'Freelance':     { bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.22)',  color: '#f59e0b' },
  'Contract':      { bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.22)', color: '#a78bfa' },
}

function ExperienceCard({ exp, index, isLast }) {
  const [hov, setHov] = useState(false)
  const typeStyle = TYPE_COLORS[exp.type] || TYPE_COLORS['Full-time']

  return (
    <div style={{ display: 'flex', gap: 0 }}>
      {/* Timeline */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 32, flexShrink: 0, width: 20 }}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15, type: 'spring', stiffness: 220, damping: 18 }}
          style={{
            width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
            background: exp.current ? exp.color : 'rgba(255,255,255,0.18)',
            border: `2.5px solid ${exp.current ? exp.color : 'rgba(255,255,255,0.22)'}`,
            boxShadow: exp.current ? `0 0 20px ${exp.color}66, 0 0 40px ${exp.color}22` : 'none',
            marginTop: 30, position: 'relative', zIndex: 1,
          }}
        >
          {exp.current && (
            <>
              <motion.div
                animate={{ scale: [1, 2.4], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                style={{ position: 'absolute', inset: -3, borderRadius: '50%', border: `2px solid ${exp.color}` }}
              />
              <motion.div
                animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
                style={{ position: 'absolute', inset: -3, borderRadius: '50%', border: `2px solid ${exp.color}` }}
              />
            </>
          )}
        </motion.div>

        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + 0.3, duration: 0.7 }}
            style={{
              width: 1, flex: 1, marginTop: 10,
              background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)',
              transformOrigin: 'top',
            }}
          />
        )}
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: -28 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-30px' }}
        transition={{ delay: index * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          flex: 1, marginBottom: isLast ? 0 : 24,
          borderRadius: 20,
          border: `1px solid ${hov ? exp.color + '45' : 'rgba(255,255,255,0.07)'}`,
          background: hov
            ? `linear-gradient(135deg, ${exp.color}08, rgba(255,255,255,0.02))`
            : 'rgba(255,255,255,0.02)',
          transition: 'all 0.32s cubic-bezier(0.4,0,0.2,1)',
          transform: hov ? 'translateX(5px)' : 'none',
          position: 'relative', overflow: 'hidden',
        }}
      >
        {/* Left accent bar */}
        <div style={{
          position: 'absolute', left: 0, top: '12%', bottom: '12%', width: 3,
          borderRadius: '0 3px 3px 0',
          background: hov ? exp.color : 'transparent',
          transition: 'all 0.3s ease',
        }} />

        {/* Main content */}
        <div style={{ padding: '26px 28px 20px' }}>
          <div style={{
            display: 'flex', alignItems: 'flex-start',
            justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 14,
          }}>
            {/* Left: role + company */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                <h3 style={{
                  fontSize: 20, fontWeight: 800, margin: 0,
                  color: hov ? '#fff' : 'rgba(255,255,255,0.9)',
                  letterSpacing: '-0.02em', transition: 'color 0.25s',
                }}>
                  {exp.role}
                </h3>
                {exp.current && (
                  <span style={{
                    fontSize: 9, padding: '3px 10px', borderRadius: 99,
                    background: exp.color + '18', border: `1px solid ${exp.color}40`,
                    color: exp.color, fontWeight: 800, letterSpacing: '0.1em',
                  }}>
                    CURRENT
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer"
                  style={{
                    fontSize: 14, fontWeight: 600,
                    color: hov ? exp.color : 'rgba(255,255,255,0.5)',
                    textDecoration: 'none', transition: 'color 0.25s',
                    display: 'flex', alignItems: 'center', gap: 4,
                  }}>
                  <FiBriefcase size={12} />
                  {exp.company}
                  <FiExternalLink size={10} />
                </a>
                <span style={{ color: 'rgba(255,255,255,0.18)' }}>·</span>
                <span style={{
                  fontSize: 11, padding: '2px 10px', borderRadius: 99,
                  background: typeStyle.bg, border: `1px solid ${typeStyle.border}`,
                  color: typeStyle.color, fontWeight: 700,
                }}>
                  {exp.type}
                </span>
              </div>
            </div>

            {/* Right: date + location */}
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 5,
                justifyContent: 'flex-end', marginBottom: 5,
                fontSize: 13, fontFamily: 'monospace', color: 'rgba(255,255,255,0.35)',
              }}>
                <FiCalendar size={12} />
                <span>{exp.from}</span>
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>—</span>
                {exp.current
                  ? <span style={{ color: exp.color, fontWeight: 700 }}>Present</span>
                  : <span>{exp.to}</span>
                }
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 5,
                justifyContent: 'flex-end', fontSize: 12, color: 'rgba(255,255,255,0.25)',
              }}>
                <FiMapPin size={11} />
                {exp.location}
              </div>
            </div>
          </div>

          {/* Description */}
          <p style={{
            fontSize: 14, lineHeight: 1.75, margin: '0 0 18px',
            color: 'rgba(255,255,255,0.4)',
            paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.05)',
          }}>
            {exp.description}
          </p>

          {/* Achievement bullets */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 8, marginBottom: 18,
          }}>
            {exp.achievements.map((a, j) => (
              <motion.div key={j}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + j * 0.06 }}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}
              >
                <div style={{
                  width: 5, height: 5, borderRadius: '50%',
                  background: exp.color, flexShrink: 0, marginTop: 7,
                  boxShadow: `0 0 6px ${exp.color}66`,
                }} />
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.52)', lineHeight: 1.5 }}>
                  {a}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tech stack strip */}
        <div style={{
          padding: '12px 28px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          background: 'rgba(255,255,255,0.015)',
          display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap',
        }}>
          <span style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
            color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase',
            fontFamily: 'monospace', flexShrink: 0,
          }}>
            Stack
          </span>
          <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: 12 }}>·</span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.32)', fontFamily: 'monospace' }}>
            {exp.platforms}
          </span>
        </div>

        {/* Skill tags */}
        <div style={{ padding: '14px 28px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {exp.skills.map(skill => (
            <span key={skill} style={{
              fontSize: 10, padding: '3px 11px', borderRadius: 99,
              background: exp.color + '10', border: `1px solid ${exp.color}28`,
              color: exp.color, fontFamily: 'monospace', fontWeight: 700,
            }}>
              {skill}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" style={{
      padding: '110px 0',
      background: 'linear-gradient(180deg, #060610 0%, #080814 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)',
        width: 800, height: 400,
        background: 'radial-gradient(ellipse, rgba(0,161,224,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 28px', position: 'relative' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: 60 }}
        >
          <p style={{
            color: '#a78bfa', fontSize: 12, fontWeight: 700,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            fontFamily: 'monospace', margin: '0 0 12px',
          }}>
            Career Journey
          </p>
          <h2 style={{
            fontSize: 52, fontWeight: 800, color: '#fff',
            margin: '0 0 12px', lineHeight: 1.05, letterSpacing: '-0.03em',
          }}>
            Work{' '}
            <span style={{
              background: 'linear-gradient(135deg, #a78bfa 0%, #00d4ff 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Experience
            </span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 15, margin: 0 }}>
            {EXPERIENCES.length} roles · 7+ years of professional experience
          </p>
        </motion.div>

        {/* Timeline */}
        <div>
          {EXPERIENCES.map((exp, i) => (
            <ExperienceCard
              key={exp.id}
              exp={exp}
              index={i}
              isLast={i === EXPERIENCES.length - 1}
            />
          ))}
        </div>

        {/* LinkedIn CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginTop: 48, textAlign: 'center' }}
        >
          <a
            href="https://www.linkedin.com/in/webdevmamun/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '13px 30px', borderRadius: 12,
              border: '1px solid rgba(167,139,250,0.3)',
              background: 'rgba(167,139,250,0.05)',
              color: '#a78bfa', fontSize: 14, fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            <FiBriefcase size={15} />
            View Full Profile on LinkedIn
            <FiExternalLink size={13} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
