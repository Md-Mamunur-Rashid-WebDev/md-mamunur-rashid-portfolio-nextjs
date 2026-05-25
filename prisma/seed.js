// prisma/seed.js
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  await prisma.user.upsert({
    where: { email: 'admin@portfolio.com' },
    update: {},
    create: {
      email: 'admin@portfolio.com',
      password: hashedPassword,
    },
  })
  console.log('✅ Admin user created: admin@portfolio.com / admin123')

  // Create profile
  await prisma.profile.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Md Mamunur Rashid',
      title: 'Salesforce Admin & Developer | Frontend Developer | WordPress Expert',
      bio: "Hi, I'm Mamun — a creative and detail-oriented Frontend Developer, WordPress Designer, and certified Salesforce Technical Consultant with over 3 years of experience helping businesses thrive online. I specialize in designing and building high-converting, responsive websites using WordPress and Elementor.",
      email: 'your@email.com',
      phone: '+880 1234 567890',
      location: 'Dhaka, Bangladesh',
      linkedin: 'https://www.linkedin.com/in/webdevmamun/',
      github: 'https://github.com/Md-Mamunur-Rashid-WebDev',
      facebook: 'https://www.facebook.com/mamun1064/',
    },
  })
  console.log('✅ Profile created')

  // Seed skills
  const skills = [
    // Salesforce
    { name: 'LWC', category: 'Salesforce', level: 85, order: 1 },
    { name: 'Apex', category: 'Salesforce', level: 80, order: 2 },
    { name: 'Flows', category: 'Salesforce', level: 90, order: 3 },
    { name: 'Admin', category: 'Salesforce', level: 95, order: 4 },
    { name: 'Integration', category: 'Salesforce', level: 75, order: 5 },
    { name: 'Reports', category: 'Salesforce', level: 88, order: 6 },
    { name: 'Visualforce', category: 'Salesforce', level: 70, order: 7 },
    { name: 'Sales Cloud', category: 'Salesforce', level: 85, order: 8 },
    // Frontend
    { name: 'React', category: 'Frontend', level: 90, order: 1 },
    { name: 'Vue.js', category: 'Frontend', level: 75, order: 2 },
    { name: 'JavaScript', category: 'Frontend', level: 92, order: 3 },
    { name: 'TypeScript', category: 'Frontend', level: 70, order: 4 },
    { name: 'Tailwind CSS', category: 'Frontend', level: 95, order: 5 },
    { name: 'Bootstrap', category: 'Frontend', level: 88, order: 6 },
    { name: 'SASS/SCSS', category: 'Frontend', level: 82, order: 7 },
    { name: 'Next.js', category: 'Frontend', level: 80, order: 8 },
    // Backend
    { name: 'Node.js', category: 'Backend', level: 80, order: 1 },
    { name: 'Express.js', category: 'Backend', level: 78, order: 2 },
    { name: 'Python', category: 'Backend', level: 70, order: 3 },
    { name: 'Django', category: 'Backend', level: 65, order: 4 },
    { name: 'MongoDB', category: 'Backend', level: 75, order: 5 },
    { name: 'PostgreSQL', category: 'Backend', level: 72, order: 6 },
    { name: 'REST API', category: 'Backend', level: 85, order: 7 },
    { name: 'GraphQL', category: 'Backend', level: 65, order: 8 },
    // WordPress
    { name: 'Theme Dev', category: 'WordPress', level: 90, order: 1 },
    { name: 'Plugin Dev', category: 'WordPress', level: 80, order: 2 },
    { name: 'Elementor', category: 'WordPress', level: 95, order: 3 },
    { name: 'WooCommerce', category: 'WordPress', level: 85, order: 4 },
    { name: 'Gutenberg', category: 'WordPress', level: 78, order: 5 },
    { name: 'ACF', category: 'WordPress', level: 82, order: 6 },
  ]

  for (const skill of skills) {
    await prisma.skill.create({ data: skill })
  }
  console.log('✅ Skills created')

  // Seed projects
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-featured e-commerce solution with payment integration, inventory management, and an admin dashboard. Built with React, Node.js, and MongoDB.',
      tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
      order: 1,
    },
    {
      title: 'Salesforce CRM Solution',
      description: 'Custom Salesforce implementation with advanced automation, LWC components, and third-party integrations for a mid-size enterprise.',
      tags: ['Apex', 'LWC', 'Flows', 'Integration'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
      order: 2,
    },
    {
      title: 'Corporate Website',
      description: 'Modern corporate website with CMS integration, SEO optimization, and custom WordPress theme development using Elementor.',
      tags: ['WordPress', 'PHP', 'MySQL', 'Elementor'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
      order: 3,
    },
  ]

  for (const project of projects) {
    await prisma.project.create({ data: project })
  }
  console.log('✅ Projects created')

  // Seed services
  const services = [
    {
      title: 'Web Development',
      description: 'Custom websites and web applications built with modern technologies. Responsive, fast, and optimized for all devices.',
      icon: 'FaCode',
      points: ['Responsive Design', 'Performance Optimization', 'SEO Friendly'],
      order: 1,
    },
    {
      title: 'Salesforce Solutions',
      description: 'End-to-end Salesforce implementation, customization, and integration services to streamline your business processes.',
      icon: 'FaCloud',
      points: ['Custom Development (LWC, Apex)', 'Integration & Automation', 'Migration & Support'],
      order: 2,
    },
    {
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive interfaces that provide exceptional user experiences and drive engagement.',
      icon: 'FaPalette',
      points: ['User Research & Testing', 'Wireframing & Prototyping', 'Brand Identity Design'],
      order: 3,
    },
    {
      title: 'E-Commerce Solutions',
      description: 'Complete online store development with secure payment gateways, inventory management, and order tracking.',
      icon: 'FaShoppingCart',
      points: ['Payment Gateway Integration', 'Inventory Management', 'WooCommerce & Shopify'],
      order: 4,
    },
    {
      title: 'API Development',
      description: 'Robust and scalable RESTful and GraphQL APIs for seamless data exchange and third-party integrations.',
      icon: 'FaServer',
      points: ['RESTful API Design', 'Third-Party Integrations', 'API Documentation'],
      order: 5,
    },
    {
      title: 'Maintenance & Support',
      description: 'Ongoing website maintenance, updates, security patches, and technical support to keep your site running smoothly.',
      icon: 'FaTools',
      points: ['24/7 Monitoring', 'Security Updates', 'Performance Optimization'],
      order: 6,
    },
  ]

  for (const service of services) {
    await prisma.service.create({ data: service })
  }
  console.log('✅ Services created')

  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
