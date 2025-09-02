
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface SkillCategoryProps {
  title: string
  icon: LucideIcon
  skills: string[]
  delay: number
}

export default function SkillCategory({ title, icon: Icon, skills, delay }: SkillCategoryProps) {
  const { t } = useTranslation()

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0 }
  }

  const skillVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  }

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group"
    >
      <div className="glow-card p-6 h-full">
        <div className="flex items-center mb-6">
          <div className="p-3 rounded-xl bg-primary/10 mr-4 group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
            {t(title)}
          </h3>
        </div>

        <div className="space-y-3">
          {skills.map((skill, skillIndex) => (
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
      </div>
    </motion.div>
  )
}
