
import { motion } from 'framer-motion'
import { Code2, Layers3, Paintbrush, Rocket } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { lazy, Suspense } from 'react'
import SkillCategory from './skills/SkillCategory'
import SkillsStats from './skills/SkillsStats'

const Skills3DScene = lazy(() => import('./3d/Skills3DScene'))

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

export default function SkillsSection() {
  const { t } = useTranslation();
  
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-card/20 relative">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <Suspense fallback={<div />}>
          <Skills3DScene />
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
            {t('skills.title')} <span className="hero-text">{t('skills.titleHighlight')}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
      </div>
    </section>
  )
}
