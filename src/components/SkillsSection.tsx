import { motion, useScroll, useTransform } from 'framer-motion'
import { Code2, Database, Palette, Wrench } from 'lucide-react'
import { Suspense, lazy, useRef, useState, useEffect } from 'react'
import LazyMount from './3d/LazyMount'
import { site } from '@/content/site'

const SkillsGlobe3D = lazy(() => import('./3d/SkillsGlobe3D'))

const categoryLegend = [
  { key: 'frameworks' as const, color: '#3b82f6', icon: Code2 },
  { key: 'stateData' as const, color: '#22d3ee', icon: Database },
  { key: 'styling' as const, color: '#a855f7', icon: Palette },
  { key: 'devops' as const, color: '#10b981', icon: Wrench },
]

const stats = [
  { value: '4+', label: site.skills.stats.experience },
  { value: '10+', label: site.skills.stats.projects },
  { value: '23', label: site.skills.stats.technologies },
  { value: '80%+', label: site.skills.stats.satisfaction },
]

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinnedRef = useRef<HTMLDivElement>(null)
  const [splitProgress, setSplitProgress] = useState(0)

  const { scrollYProgress: pinScrollProgress } = useScroll({
    target: pinnedRef,
    offset: ['start end', 'end start'],
  })

  const splitValue = useTransform(pinScrollProgress, [0.05, 0.82], [0, 1])

  useEffect(() => {
    const unsubscribe = splitValue.on('change', (v) => {
      setSplitProgress(v)
    })
    return () => unsubscribe()
  }, [splitValue])

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="section-stage relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 neural-grid opacity-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="identity-panel px-6 py-3 holographic inline-flex items-center mb-8">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse mr-3" />
            <span className="text-xs sm:text-sm font-neural text-accent font-code tracking-wider">
              {site.skills.badge}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            {site.skills.title} <span className="text-primary">{site.skills.titleHighlight}</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {site.skills.description}
          </p>
        </motion.div>

        <div ref={pinnedRef} className="relative mb-12">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <div
              className="w-96 h-96 rounded-full opacity-20 blur-3xl"
              style={{
                background: 'radial-gradient(circle, hsl(var(--primary)), transparent 70%)',
              }}
            />
          </div>
          <LazyMount
            rootMargin="400px"
            placeholderClassName="h-[500px] sm:h-[650px]"
            fallback={
              <div className="h-[500px] sm:h-[650px] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            }
          >
            <Suspense fallback={null}>
              <SkillsGlobe3D className="h-[500px] sm:h-[650px]" splitProgress={splitProgress} />
            </Suspense>
          </LazyMount>
          <p className="text-center text-xs text-muted-foreground/60 mt-2 font-mono">
            SCROLL TO SPLIT · HOVER TO EXPAND · DRAG TO ROTATE
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12"
        >
          {categoryLegend.map((cat, i) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="premium-card p-4 flex items-center gap-3"
              style={{ borderColor: `${cat.color}40` }}
              data-cursor="hover"
            >
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ background: cat.color, boxShadow: `0 0 12px ${cat.color}` }}
              />
              <cat.icon className="w-4 h-4" style={{ color: cat.color }} />
              <span className="text-sm font-medium text-foreground">{site.skills.categories[cat.key]}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="premium-card p-6 text-center"
              data-cursor="hover"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
