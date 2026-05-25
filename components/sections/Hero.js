// components/sections/Hero.js
'use client'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { FaGithub, FaLinkedin, FaFacebook, FaDownload } from 'react-icons/fa'
import { FiArrowDown } from 'react-icons/fi'
import Image from 'next/image'

export default function Hero({ profile }) {
  const name = profile?.name || 'Md Mamunur Rashid'
  const photo = profile?.photo || '/images/profile.png'
  const linkedin = profile?.linkedin || '#'
  const github = profile?.github || '#'
  const facebook = profile?.facebook || '#'
  const resumeUrl = profile?.resumeUrl || '#'

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden grid-bg"
    >
      {/* Background Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 blob filter blur-3xl animate-float" />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/5 blob filter blur-3xl animate-float"
        style={{ animationDelay: '3s' }}
      />

      <div className="max-w-7xl mx-auto px-6 pt-20 w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 text-center lg:text-left"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-mono mb-6">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Available for Work
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-bold font-display leading-tight mb-4"
            >
              Hello, I&apos;m{' '}
              <span className="gradient-text text-glow">{name.split(' ')[1] || 'Mamun'}</span>
            </motion.h1>

            <motion.div variants={itemVariants} className="text-xl md:text-2xl text-gray-400 mb-6 h-16">
              <TypeAnimation
                sequence={[
                  'Salesforce Admin & Developer',
                  2000,
                  'Frontend Developer',
                  2000,
                  'WordPress Elementor Expert',
                  2000,
                  'Meta Ads Specialist',
                  2000,
                  'On-Page SEO Expert',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-primary font-semibold"
              />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-gray-400 text-lg max-w-xl mb-8 leading-relaxed"
            >
              Creative and detail-oriented developer with{' '}
              <span className="text-primary font-semibold">3+ years</span> of experience
              building digital solutions that make a difference.
            </motion.p>

            {/* Code Card */}
            <motion.div
              variants={itemVariants}
              className="bg-card border border-border rounded-xl p-4 font-mono text-sm mb-8 text-left max-w-md"
            >
              <div className="flex gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="space-y-1">
                <div><span className="text-purple-400">const</span> <span className="text-primary">developer</span> = {'{'}</div>
                <div className="pl-4"><span className="text-green-400">name</span>: <span className="text-yellow-300">&apos;{name}&apos;</span>,</div>
                <div className="pl-4"><span className="text-green-400">skills</span>: [<span className="text-yellow-300">&apos;Salesforce&apos;</span>, <span className="text-yellow-300">&apos;React&apos;</span>, <span className="text-yellow-300">&apos;WordPress&apos;</span>],</div>
                <div className="pl-4"><span className="text-green-400">available</span>: <span className="text-blue-400">true</span>,</div>
                <div className="pl-4"><span className="text-green-400">passion</span>: <span className="text-yellow-300">&apos;Building amazing things&apos;</span></div>
                <div>{'}'}</div>
              </div>
            </motion.div>

            {/* Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                View My Work
              </motion.a>
              <motion.a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-gray-300 hover:border-primary hover:text-primary transition-all duration-200 font-semibold"
              >
                <FaDownload size={14} />
                Resume
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex gap-4 justify-center lg:justify-start">
              {[
                { icon: FaGithub, href: github, label: 'GitHub' },
                { icon: FaLinkedin, href: linkedin, label: 'LinkedIn' },
                { icon: FaFacebook, href: facebook, label: 'Facebook' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -3 }}
                  className="w-11 h-11 rounded-xl bg-card border border-border flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all duration-200"
                  aria-label={label}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="flex-1 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-spin" style={{ animationDuration: '8s' }} />
              {/* Glow */}
              <div className="absolute inset-4 rounded-full bg-primary/10 blur-2xl animate-pulse" />
              {/* Image container */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-2 border-primary/50 animated-border">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  {photo && photo !== '/images/profile.png' ? (
                    <Image
                      src={photo}
                      alt={name}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="text-8xl">👨‍💻</div>
                  )}
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-card border border-primary/30 rounded-xl px-3 py-2 text-xs font-mono"
              >
                <span className="text-primary">3+</span> Years Exp
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-card border border-secondary/30 rounded-xl px-3 py-2 text-xs font-mono"
              >
                <span className="text-secondary">20+</span> Projects
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex justify-center mt-16"
        >
          <motion.a
            href="#about"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-gray-500 hover:text-primary transition-colors"
          >
            <span className="text-xs font-mono">scroll down</span>
            <FiArrowDown size={20} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
