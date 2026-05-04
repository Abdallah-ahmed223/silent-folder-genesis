import { motion, useScroll, useTransform } from 'framer-motion'
import { Briefcase, Building2, Calendar } from 'lucide-react'
import { useRef } from 'react'
import { site } from '@/content/site'

type RoleKey = keyof typeof site.experience.roles

interface Role {
  key: RoleKey
  accentColor: string
}

const ROLES: Role[] = [
  { key: 'numo', accentColor: '#3b82f6' },
  { key: 'santeon', accentColor: '#22d3ee' },
  { key: 'ilerra', accentColor: '#a855f7' },
  { key: 'motajer', accentColor: '#10b981' },
]

function RoleCard({ role, index }: { role: Role; index: number }) {
  const roleContent = site.experience.roles[role.key]
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 0.85', 'start 0.3'],
  })

  const isLeft = index % 2 === 0
  const x = useTransform(scrollYProgress, [0, 1], [isLeft ? -80 : 80, 0])
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const rotateY = useTransform(scrollYProgress, [0, 1], [isLeft ? 25 : -25, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1])
  const dotScale = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1.6, 1])

  return (
    <div
      ref={cardRef}
      className={`relative flex flex-col sm:flex-row items-start ${
        isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'
      }`}
      style={{ perspective: '1000px' }}
    >
      <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-6 z-20">
        <motion.div style={{ scale: dotScale }} className="w-4 h-4 rounded-full border-2 border-background">
          <div
            className="w-full h-full rounded-full"
            style={{
              background: role.accentColor,
              boxShadow: `0 0 0 4px ${role.accentColor}33, 0 0 24px ${role.accentColor}99`,
            }}
          />
        </motion.div>
      </div>

      <motion.div
        style={{ x, opacity, rotateY, scale, transformStyle: 'preserve-3d' }}
        className={`pl-12 sm:pl-0 w-full sm:w-[calc(50%-2rem)] ${isLeft ? 'sm:pr-8' : 'sm:pl-8'}`}
      >
        <motion.div
          whileHover={{ y: -6, scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="premium-card p-6 sm:p-7 relative overflow-hidden"
          style={{ borderColor: `${role.accentColor}40` }}
          data-cursor="hover"
        >
          <div
            className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-20"
            style={{ background: `radial-gradient(circle, ${role.accentColor}, transparent 70%)` }}
          />

          <div className="relative">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1">{roleContent.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Building2 className="w-3.5 h-3.5" style={{ color: role.accentColor }} />
                  <span className="font-medium">{roleContent.company}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-5 pb-4 border-b border-border/40">
              <Calendar className="w-3.5 h-3.5" />
              <span className="font-mono">{roleContent.period}</span>
              <span className="text-muted-foreground/50">·</span>
              <span className="font-mono">{roleContent.type}</span>
            </div>

            <ul className="space-y-2.5 text-sm text-muted-foreground leading-relaxed">
              {roleContent.achievements.map((achievement, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span
                    className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                    style={{ background: role.accentColor }}
                  />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.5', 'end 0.5'],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="section-stage relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 neural-grid opacity-10" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="identity-panel px-6 py-3 holographic inline-flex items-center mb-8">
            <Briefcase className="w-3.5 h-3.5 text-accent mr-3" />
            <span className="text-xs sm:text-sm font-neural text-accent font-code tracking-wider">
              {site.experience.badge}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            {site.experience.title} <span className="text-primary">{site.experience.titleHighlight}</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {site.experience.description}
          </p>
        </motion.div>

        <div ref={timelineRef} className="relative">
          <div
            className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px sm:-translate-x-px bg-border/30"
            aria-hidden
          />

          <motion.div
            className="absolute left-4 sm:left-1/2 top-0 w-px sm:-translate-x-px"
            style={{
              height: lineHeight,
              background:
                'linear-gradient(to bottom, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--neon-purple)))',
              boxShadow: '0 0 12px hsl(var(--primary) / 0.6)',
            }}
            aria-hidden
          />

          <div className="space-y-10 sm:space-y-16">
            {ROLES.map((role, index) => (
              <RoleCard key={role.key} role={role} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
