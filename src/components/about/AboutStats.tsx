import { motion } from 'framer-motion'
import { Calendar, Rocket, MapPin, Layers } from 'lucide-react'
import { site } from '@/content/site'

const stats = [
  { label: site.about.stats.experience, value: '4+', icon: Calendar },
  { label: site.about.stats.projects, value: '10+', icon: Rocket },
  { label: site.about.stats.location, value: 'Giza, EG', icon: MapPin },
  { label: site.about.stats.technologies, value: '20+', icon: Layers },
]

export default function AboutStats() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="premium-card p-4 group hover:scale-[1.02] transition-transform duration-300"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <stat.icon className="w-4 h-4 text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
          </div>
          <div className="text-xs text-muted-foreground">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  )
}
