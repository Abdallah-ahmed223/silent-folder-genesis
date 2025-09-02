
import { motion } from 'framer-motion'
import { Code, Palette, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
import { lazy, Suspense } from 'react'
import ProjectCard from './projects/ProjectCard'

const Projects3DScene = lazy(() => import('./3d/Projects3DScene'))

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'Modern React-based e-commerce solution with 3D product previews, real-time inventory, and seamless checkout experience.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    technologies: ['React', 'Three.js', 'Node.js', 'PostgreSQL'],
    github: 'https://github.com',
    live: 'https://example.com',
    icon: Code
  },
  {
    title: 'Design System',
    description: 'Comprehensive design system with reusable components, design tokens, and interactive documentation.',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop',
    technologies: ['React', 'Storybook', 'Figma', 'TypeScript'],
    github: 'https://github.com',
    live: 'https://example.com',
    icon: Palette
  },
  {
    title: 'Real-time Dashboard',
    description: 'Interactive analytics dashboard with real-time data visualization, custom charts, and responsive design.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    technologies: ['Next.js', 'D3.js', 'WebSockets', 'Tailwind'],
    github: 'https://github.com',
    live: 'https://example.com',
    icon: Zap
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
}

export default function ProjectsSection() {
  const { t } = useTranslation();
  
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <Suspense fallback={<div />}>
          <Projects3DScene />
        </Suspense>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            {t('projects.title')} <span className="hero-text">{t('projects.titleHighlight')}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('projects.description')}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div key={project.title} variants={itemVariants}>
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-3 text-lg font-semibold border-primary/50 hover:border-primary glow-card"
          >
            {t('projects.viewAll')}
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
