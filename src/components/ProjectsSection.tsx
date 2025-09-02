
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import ProjectCard from './projects/ProjectCard'
import Portfolio3DScene from './Portfolio3DScene'

const projects = [
  {
    id: 1,
    title: 'AI Dashboard',
    description: 'Modern dashboard with AI analytics',
    image: '/api/placeholder/400/250',
    tech: ['React', 'TypeScript', 'AI'],
    link: '#'
  },
  {
    id: 2,
    title: 'E-commerce Platform',
    description: 'Full-stack e-commerce solution',
    image: '/api/placeholder/400/250',
    tech: ['Vue.js', 'Node.js', 'MongoDB'],
    link: '#'
  },
  {
    id: 3,
    title: '3D Portfolio',
    description: 'Interactive 3D web experience',
    image: '/api/placeholder/400/250',
    tech: ['Three.js', 'WebGL', 'GSAP'],
    link: '#'
  }
]

const floatingElements = [
  { id: 1, delay: 0.5, x: '12%', y: '20%' },
  { id: 2, delay: 2, x: '88%', y: '30%' },
  { id: 3, delay: 3.5, x: '18%', y: '80%' },
];

export default function ProjectsSection() {
  const { t } = useTranslation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 8,
        y: (e.clientY / window.innerHeight - 0.5) * 8,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="projects" className="relative py-20 px-4 sm:px-6 lg:px-8 neural-grid overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 neural-grid opacity-10"></div>
      
      {/* 3D Background Scene */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Portfolio3DScene opacity={0.12} />
      </div>

      {/* Floating Elements */}
      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute w-2 h-2 bg-primary/20 rounded-full"
          style={{
            left: element.x,
            top: element.y,
          }}
          animate={{
            y: [0, -20, 0],
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
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-25">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute data-particles"
            style={{
              left: `${15 + i * 20}%`,
              animationDelay: `${i * 0.8}s`,
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
            transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px)`,
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
              <span className="text-sm font-neural text-accent font-code">PROJECTS • PORTFOLIO MODE</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              {t('projects.title')} <span className="hero-text">{t('projects.titleHighlight')}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto premium-card p-4">
              {t('projects.description')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-background/30 pointer-events-none z-[5]"></div>
    </section>
  )
}
