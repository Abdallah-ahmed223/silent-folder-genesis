import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ExternalLink, Github, LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRef, MouseEvent } from 'react'
import { site } from '@/content/site'

interface ProjectCardProps {
  title: string
  description: string
  technologies: string[]
  github?: string
  live?: string
  icon: LucideIcon
  accentColor: string
  index: number
}

export default function ProjectCard({
  title,
  description,
  technologies,
  github,
  live,
  icon: Icon,
  accentColor,
  index,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 20,
  })
  const glowX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%'])
  const glowY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%'])

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, rotateY: 30 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ duration: 0.8, delay: index * 0.12, type: 'spring', stiffness: 80 }}
      viewport={{ once: true, margin: '-50px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group h-full"
      style={{ perspective: '1200px' }}
    >
      <motion.div
        className="premium-card h-full flex flex-col p-7 relative overflow-hidden"
        style={{
          rotateX,
          rotateY,
          borderColor: `${accentColor}40`,
          transformStyle: 'preserve-3d',
        }}
        data-cursor="hover"
      >
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glowX} ${glowY}, ${accentColor}1f, transparent 50%)`,
          }}
        />

        <div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${accentColor}, transparent 70%)` }}
        />

        <div
          className="flex items-start justify-between mb-6 relative z-10"
          style={{ transform: 'translateZ(40px)' }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{
              background: `${accentColor}1a`,
              border: `1px solid ${accentColor}40`,
            }}
          >
            <Icon className="w-6 h-6" style={{ color: accentColor }} />
          </div>
          <span className="text-3xl font-bold opacity-30 font-neural" style={{ color: accentColor }}>
            0{index + 1}
          </span>
        </div>

        <h3
          className="text-xl sm:text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300 relative z-10"
          style={{ transform: 'translateZ(30px)' }}
        >
          {title}
        </h3>
        <p
          className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1 relative z-10"
          style={{ transform: 'translateZ(20px)' }}
        >
          {description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-6 relative z-10" style={{ transform: 'translateZ(15px)' }}>
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-xs font-medium rounded-md font-mono"
              style={{
                background: `${accentColor}14`,
                color: accentColor,
                border: `1px solid ${accentColor}30`,
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        <div
          className="flex gap-2 pt-4 border-t border-border/30 relative z-10"
          style={{ transform: 'translateZ(20px)' }}
        >
          {github && (
            <Button variant="outline" size="sm" className="flex-1 group/btn" asChild>
              <a href={github} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform duration-300" />
                {site.projects.buttons.code}
              </a>
            </Button>
          )}
          {live && (
            <Button size="sm" className="flex-1 group/btn" asChild>
              <a href={live} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform duration-300" />
                {site.projects.buttons.live}
              </a>
            </Button>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
