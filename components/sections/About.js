// components/sections/About.js
'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { FaCode, FaCloud, FaWordpress } from 'react-icons/fa'

const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '20+', label: 'Projects Completed' },
  { value: '15+', label: 'Happy Clients' },
  { value: '10+', label: 'Tech Mastered' },
]

export default function About({ profile }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const name = profile?.name || 'Md Mamunur Rashid'
  const bio = profile?.bio || "Hi, I'm Mamun — a creative and detail-oriented Frontend Developer, WordPress Designer, and certified Salesforce Technical Consultant with over 3 years of experience helping businesses thrive online."
  const photo = profile?.photo || null

  return (
    <section id="about" className="section" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-primary text-sm tracking-widest uppercase">Get To Know Me</span>
          <h2 className="text-4xl md:text-5xl font-bold font-display mt-2">
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Decorative frame */}
              <div className="absolute inset-0 border-2 border-primary/20 rounded-2xl transform translate-x-4 translate-y-4" />
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-card border border-border">
                {photo && photo !== '/images/profile.png' ? (
                  <Image src={photo} alt={name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                    <div className="text-center">
                      <div className="text-8xl mb-4">👨‍💻</div>
                      <p className="text-gray-400 text-sm">Profile Photo</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Floating icons */}
            {[
              { icon: FaCode, color: 'text-primary', bg: 'bg-primary/10', top: '10%', left: '-5%' },
              { icon: FaCloud, color: 'text-secondary', bg: 'bg-secondary/10', top: '60%', right: '-5%' },
              { icon: FaWordpress, color: 'text-accent', bg: 'bg-accent/10', bottom: '10%', left: '10%' },
            ].map(({ icon: Icon, color, bg, ...pos }, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3 + i, repeat: Infinity, delay: i }}
                style={pos}
                className={`absolute w-12 h-12 ${bg} rounded-xl flex items-center justify-center ${color}`}
              >
                <Icon size={22} />
              </motion.div>
            ))}
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-4">
              A passionate developer from{' '}
              <span className="text-primary">Bangladesh</span>
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6">{bio}</p>
            <p className="text-gray-400 leading-relaxed mb-8">
              My digital expertise extends to <span className="text-primary">Meta Ads</span> (Facebook & Instagram) 
              and <span className="text-primary">on-page SEO</span> to boost visibility and ROI. 
              I&apos;m passionate about creating efficient, elegant solutions that solve real business problems.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="bg-card border border-border rounded-xl p-4 text-center card-glow"
                >
                  <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {['Dhaka, Bangladesh', 'Full-time Available', 'Remote Friendly'].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
