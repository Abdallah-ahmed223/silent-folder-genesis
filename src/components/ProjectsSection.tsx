import { motion } from 'framer-motion'
import { Github, ExternalLink, Code, Palette, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useTranslation } from 'react-i18next'
import { lazy, Suspense } from 'react'

const Projects3DScene = lazy(() => import('./3d/Projects3DScene'))

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'Modern React-based e-commerce solution with 3D product previews, real-time inventory, and seamless checkout experience.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    technologies: ['React', 'Three.js', 'Node.js', 'PostgreSQL'],
    github: 'https://github.com',
    live: 'https://example.com',
    icon: Code,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Design System',
    description: 'Comprehensive design system with reusable components, design tokens, and interactive documentation.',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop',
    technologies: ['React', 'Storybook', 'Figma', 'TypeScript'],
    github: 'https://github.com',
    live: 'https://example.com',
    icon: Palette,
    color: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Real-time Dashboard',
    description: 'Interactive analytics dashboard with real-time data visualization, custom charts, and responsive design.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    technologies: ['Next.js', 'D3.js', 'WebSockets', 'Tailwind'],
    github: 'https://github.com',
    live: 'https://example.com',
    icon: Zap,
    color: 'from-emerald-500 to-teal-500'
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
            <motion.div
              key={project.title}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group"
            >
              <Card className="glow-card h-full overflow-hidden">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                  
                  {/* Project Icon */}
                  <div className="absolute top-4 left-4">
                    <div className="p-2 rounded-lg bg-background/80 backdrop-blur-sm">
                      <project.icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 group/btn"
                      asChild
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform duration-300" />
                        {t('projects.buttons.code')}
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 group/btn"
                      asChild
                    >
                      <a href={project.live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform duration-300" />
                        {t('projects.buttons.live')}
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Projects Button */}
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