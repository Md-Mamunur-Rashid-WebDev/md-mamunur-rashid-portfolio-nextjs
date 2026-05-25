'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
import ThemeToggle from '@/components/ui/ThemeToggle'

const navLinks = [
  { href: '#home',       label: 'Home'       },
  { href: '#about',      label: 'About'      },
  { href: '#experience', label: 'Experience' },
  { href: '#skills',     label: 'Skills'     },
  { href: '#services',   label: 'Services'   },
  { href: '#projects',   label: 'Projects'   },
  { href: '#contact',    label: 'Contact'    },
]

export default function Navbar({ profile }) {
  const [scrolled, setScrolled]   = useState(false)
  const [active, setActive]       = useState('#home')
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'all 0.3s ease',
        background: scrolled ? 'var(--navbar-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-color)' : 'none',
      }}
    >
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        padding: '16px 28px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <motion.a
          href="#home"
          style={{
            fontSize: 20, fontWeight: 800,
            fontFamily: 'monospace', textDecoration: 'none',
            color: 'var(--text-primary)',
          }}
          whileHover={{ scale: 1.05 }}
        >
          <span style={{ color: 'var(--accent)' }}>&lt;</span>
          Mamun
          <span style={{ color: 'var(--accent)' }}>/&gt;</span>
        </motion.a>

        {/* Desktop Links */}
        <ul style={{
          display: 'flex', alignItems: 'center', gap: 32,
          listStyle: 'none', margin: 0, padding: 0,
        }}
          className="hidden md:flex"
        >
          {navLinks.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setActive(link.href)}
                style={{
                  fontSize: 13, fontWeight: 500,
                  textDecoration: 'none',
                  color: active === link.href ? 'var(--accent)' : 'var(--text-muted)',
                  transition: 'color 0.2s',
                  position: 'relative',
                }}
              >
                {link.label}
                {active === link.href && (
                  <motion.span
                    layoutId="nav-underline"
                    style={{
                      position: 'absolute', bottom: -4, left: 0, right: 0,
                      height: 1, background: 'var(--accent)', borderRadius: 1,
                    }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side — Theme toggle + Hire Me + Mobile menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <ThemeToggle />

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex"
            style={{
              padding: '8px 20px', borderRadius: 10,
              border: '1.5px solid var(--accent)',
              color: 'var(--accent)',
              fontSize: 13, fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
          >
            Hire Me
          </motion.a>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--text-primary)', padding: 4,
            }}
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: 'var(--navbar-bg)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--border-color)',
              overflow: 'hidden',
            }}
          >
            <ul style={{ padding: '16px 28px 20px', listStyle: 'none', margin: 0 }}>
              {navLinks.map(link => (
                <li key={link.href} style={{ marginBottom: 14 }}>
                  <a
                    href={link.href}
                    onClick={() => { setActive(link.href); setMenuOpen(false) }}
                    style={{
                      fontSize: 15, fontWeight: 500,
                      textDecoration: 'none',
                      color: active === link.href ? 'var(--accent)' : 'var(--text-muted)',
                      display: 'block',
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  style={{
                    color: 'var(--accent)', fontWeight: 600,
                    fontSize: 15, textDecoration: 'none',
                  }}
                >
                  Hire Me
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
