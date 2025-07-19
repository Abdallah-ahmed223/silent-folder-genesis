import { motion } from 'framer-motion'
import { 
  Code2, 
  Palette, 
  Database, 
  Smartphone, 
  Globe, 
  Zap,
  Layers3,
  Cpu,
  Paintbrush,
  Rocket
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

const skillCategories = [
  {
    title: 'skills.categories.frontend',
    icon: Code2,
    skills: ['React', 'TypeScript', 'Next.js', 'Vue.js', 'Tailwind CSS'],
    color: 'from-blue-500 to-cyan-500',
    delay: 0
  },
  {
    title: 'skills.categories.animation',
    icon: Layers3,
    skills: ['Three.js', 'React Three Fiber', 'Framer Motion'],
    color: 'from-purple-500 to-pink-500',
    delay: 0.2
  },
  {
    title: 'skills.categories.design',
    icon: Paintbrush,
    skills: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research', 'Accessibility'],
    color: 'from-pink-500 to-rose-500',
    delay: 0.4
  },
  {
    title: 'skills.categories.performance',
    icon: Rocket,
    skills: ['Webpack', 'Vite', 'Docker', 'AWS', 'Performance Optimization'],
    color: 'from-indigo-500 to-purple-500',
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

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0 }
}

const skillVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
}

export default function SkillsSection() {
  const { t } = useTranslation();
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-card/20">
      <div className="max-w-7xl mx-auto">
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
            <motion.div
              key={category.title}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <div className="glow-card p-6 h-full">
                {/* Category Header */}
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} mr-4 group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
                    {t(category.title)}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      variants={skillVariants}
                      initial="hidden"
                      whileInView="visible"
                      transition={{ delay: skillIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center group/skill"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full mr-3 group-hover/skill:scale-125 transition-transform duration-200"></div>
                      <span className="text-muted-foreground group-hover/skill:text-foreground transition-colors duration-200">
                        {skill}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Hover Effect Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-lg pointer-events-none`}></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: '3+', label: 'skills.stats.experience' },
            { number: '50+', label: 'skills.stats.projects' },
            { number: '15+', label: 'skills.stats.technologies' },
            { number: '100%', label: 'skills.stats.satisfaction' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold hero-text mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {t(stat.label)}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}