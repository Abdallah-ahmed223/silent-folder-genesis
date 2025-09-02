
import { motion } from 'framer-motion'
import { Code2, Layers3, Paintbrush, Rocket } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import SkillCategory from './skills/SkillCategory'
import SkillsStats from './skills/SkillsStats'
import Portfolio3DScene from './Portfolio3DScene'

const skillCategories = [
  {
    title: 'skills.categories.frontend',
    icon: Code2,
    skills: ['React', 'TypeScript', 'Next.js', 'Vue.js', 'Tailwind CSS'],
    delay: 0
  },
  {
    title: 'skills.categories.animation',
    icon: Layers3,
    skills: ['Three.js', 'React Three Fiber', 'Framer Motion'],
    delay: 0.2
  },
  {
    title: 'skills.categories.design',
    icon: Paintbrush,
    skills: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research', 'Accessibility'],
    delay: 0.4
  },
  {
    title: 'skills.categories.performance',
    icon: Rocket,
    skills: ['Webpack', 'Vite', 'Docker', 'AWS', 'Performance Optimization'],
    delay: 0.6
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const floatingElements = [
  { id: 1, delay: 1, x: '8%', y: '15%' },
  { id: 2, delay: 2.5, x: '92%', y: '25%' },
  { id: 3, delay: 0.5, x: '12%', y: '85%' },
  { id: 4, delay: 3, x: '88%', y: '75%' },
];

export default function SkillsSection() {
  const { t } = useTranslation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 6,
        y: (e.clientY / window.innerHeight - 0.5) * 6,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <section id="skills" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-card/10 neural-grid overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 neural-grid opacity-10"></div>
      
      {/* 3D Background Scene */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Portfolio3DScene opacity={0.1} />
      </div>

      {/* Floating Elements */}
      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute w-2 h-2 bg-primary/15 rounded-full"
          style={{
            left: element.x,
            top: element.y,
          }}
          animate={{
            y: [0, -25, 0],
            opacity: [0.15, 0.4, 0.15],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: element.delay,
          }}
        />
      ))}

      {/* Data Streams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute data-particles"
            style={{
              left: `${25 + i * 25}%`,
              animationDelay: `${i * 1.2}s`,
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
              <span className="text-sm font-neural text-accent font-code">SKILLS • ANALYSIS MODE</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              {t('skills.title')} <span className="hero-text">{t('skills.titleHighlight')}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto premium-card p-4">
              {t('skills.description')}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {skillCategories.map((category, index) => (
              <SkillCategory
                key={category.title}
                title={category.title}
                icon={category.icon}
                skills={category.skills}
                delay={category.delay}
              />
            ))}
          </motion.div>

          <SkillsStats />
        </motion.div>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-background/30 pointer-events-none z-[5]"></div>
    </section>
  )
}
