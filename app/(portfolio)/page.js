// app/(portfolio)/page.js
import { prisma } from '@/lib/db'
import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Services from '@/components/sections/Services'
import Projects from '@/components/sections/Projects'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'
import CursorGlow from '@/components/ui/CursorGlow'
import Experience from '@/components/sections/Experience'

async function getData() {
  try {
    const [profile, skills, projects, services] = await Promise.all([
      prisma.profile.findFirst(),
      prisma.skill.findMany({ orderBy: [{ category: 'asc' }, { order: 'asc' }] }),
      prisma.project.findMany({ orderBy: { order: 'asc' } }),
      prisma.service.findMany({ orderBy: { order: 'asc' } }),
    ])
    return { profile, skills, projects, services }
  } catch {
    // Return default data if DB not connected yet
    return { profile: null, skills: [], projects: [], services: [] }
  }
}

export default async function HomePage() {
  const { profile, skills, projects, services } = await getData()

  return (
    <main className="min-h-screen bg-dark relative">
      <CursorGlow />
      <Navbar profile={profile} />
      <Hero profile={profile} />
      <About profile={profile} />
      <Experience />
      <Skills skills={skills} />
      <Services services={services} />
      <Projects projects={projects} />
      <Contact profile={profile} />
      <Footer profile={profile} />
    </main>
  )
}
