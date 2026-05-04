import { motion } from 'framer-motion'
import { User } from 'lucide-react'
import AboutContent from './about/AboutContent'
import AboutProfile from './about/AboutProfile'
import AboutStats from './about/AboutStats'
import { site } from '@/content/site'

const floatingElements = [
  { id: 1, delay: 0, x: '15%', y: '25%' },
  { id: 2, delay: 1.5, x: '85%', y: '35%' },
  { id: 3, delay: 3, x: '20%', y: '75%' },
]

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 neural-grid opacity-10" />

      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute w-2 h-2 bg-primary/20 rounded-full"
          style={{
            left: element.x,
            top: element.y,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: element.delay,
          }}
        />
      ))}

      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute data-particles"
            style={{
              left: `${25 + i * 25}%`,
              animationDelay: `${i * 1}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="premium-card px-6 py-3 holographic inline-flex items-center mb-8">
            <User className="w-3.5 h-3.5 text-accent mr-3" />
            <span className="text-xs sm:text-sm font-neural text-accent font-code tracking-wider">
              {site.about.badge}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            {site.about.title} <span className="text-primary">{site.about.titleHighlight}</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {site.about.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 xl:gap-16 items-start">
          <div className="space-y-8 order-2 lg:order-1">
            <AboutContent />
            <AboutStats />
          </div>

          <AboutProfile />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-background/20 pointer-events-none z-[5]" />
    </section>
  )
}
