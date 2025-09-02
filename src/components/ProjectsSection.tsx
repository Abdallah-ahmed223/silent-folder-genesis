
import { motion } from 'framer-motion'
import { Code, Palette, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
import { lazy, Suspense, useState, useEffect } from 'react'
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

const floatingElements = [
  { id: 1, delay: 0.5, x: '12%', y: '18%' },
  { id: 2, delay: 2, x: '88%', y: '28%' },
  { id: 3, delay: 1, x: '18%', y: '78%' },
  { id: 4, delay: 3, x: '82%', y: '85%' },
];

export default function ProjectsSection() {
  const { t } = useTranslation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <section id="projects" className="relative py-20 px-4 sm:px-6 lg:px-8 neural-grid overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 neural-grid opacity-25"></div>
      
      {/* 3D Background Scene */}
      <div className="absolute inset-0 opacity-25 pointer-events-none z-0">
        <Suspense fallback={<div />}>
          <Projects3DScene />
        </Suspense>
      </div>

      {/* Floating Elements */}
      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute w-4 h-4 bg-primary/20 rounded-full floating-element"
          style={{
            left: element.x,
            top: element.y,
          }}
          animate={{
            y: [0, -25, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: element.delay,
          }}
        />
      ))}

      {/* Data Streams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute data-particles"
            style={{
              left: `${15 + i * 18}%`,
              animationDelay: `${i * 0.6}s`,
            }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{
            transform: `translate(${mousePosition.x * 0.4}px, ${mousePosition.y * 0.4}px)`,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="premium-card px-6 py-3 holographic inline-flex items-center mb-8">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse mr-3" />
              <span className="text-sm font-neural text-accent font-code">PORTFOLIO • SHOWCASE MODE</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              {t('projects.title')} <span className="hero-text">{t('projects.titleHighlight')}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto premium-card p-4">
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
              className="premium-card px-8 py-3 text-lg font-semibold border-primary/50 hover:border-primary glow-card group"
            >
              <span>{t('projects.viewAll')}</span>
              <div className="w-1 h-1 bg-primary rounded-full ml-2 group-hover:scale-150 transition-transform duration-300"></div>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-background/30 pointer-events-none z-[5]"></div>
    </section>
  )
}
