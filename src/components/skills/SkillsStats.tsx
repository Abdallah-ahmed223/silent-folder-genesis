
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const statsData = [
  { number: '3+', label: 'skills.stats.experience' },
  { number: '50+', label: 'skills.stats.projects' },
  { number: '15+', label: 'skills.stats.technologies' },
  { number: '100%', label: 'skills.stats.satisfaction' }
]

export default function SkillsStats() {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      viewport={{ once: true }}
      className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
    >
      {statsData.map((stat, index) => (
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
  )
}
