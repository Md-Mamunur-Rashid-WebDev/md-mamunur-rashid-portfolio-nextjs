// components/sections/Footer.js
import { FaGithub, FaLinkedin, FaFacebook, FaHeart } from 'react-icons/fa'

const navLinks = ['Home', 'About', 'Skills', 'Services', 'Projects', 'Contact']

export default function Footer({ profile }) {
  const name = profile?.name || 'Md Mamunur Rashid'

  return (
    <footer className="bg-darker border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="text-xl font-bold font-mono mb-3">
              <span className="text-primary">&lt;</span>
              Mamun
              <span className="text-primary">/&gt;</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Building digital solutions that make a difference. Let&apos;s create something amazing together.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-200">Navigation</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-primary transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-200">Connect</h4>
            <div className="flex gap-3 mb-4">
              {[
                { icon: FaGithub, href: profile?.github || '#', label: 'GitHub' },
                { icon: FaLinkedin, href: profile?.linkedin || '#', label: 'LinkedIn' },
                { icon: FaFacebook, href: profile?.facebook || '#', label: 'Facebook' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 bg-card border border-border rounded-lg flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <p className="text-gray-500 text-sm">{profile?.email || 'your@email.com'}</p>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} {name}. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm flex items-center gap-1">
            Made with <FaHeart className="text-red-500 text-xs" /> in Bangladesh
          </p>
        </div>
      </div>
    </footer>
  )
}
