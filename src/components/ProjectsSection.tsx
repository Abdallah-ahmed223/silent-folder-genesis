import { motion } from 'framer-motion'
import { Database, Box, Settings, Sparkles } from 'lucide-react'
import ProjectCard from './projects/ProjectCard'
import { site } from '@/content/site'

type ProjectKey = keyof typeof site.projects.items

const projects: {
  key: ProjectKey
  icon: typeof Database
  accentColor: string
  technologies: string[]
  live?: string
}[] = [
  {
    key: 'numoErp',
    icon: Database,
    accentColor: '#3b82f6',
    technologies: [
      'Vue 3',
      'TypeScript',
      'Inertia.js',
      'TanStack Query',
      'TanStack Table',
      'Tailwind 4',
      'shadcn',
      'Reka UI',
    ],
  },
  {
    key: 'modelEditor',
    icon: Box,
    accentColor: '#22d3ee',
    technologies: ['React', 'TypeScript', 'React Three Fiber', 'Three.js', 'Drei', 'Zustand'],
  },
  {
    key: 'tms',
    icon: Settings,
    accentColor: '#a855f7',
    technologies: ['React', 'TypeScript', 'Bootstrap 5', 'RESTful APIs'],
  },
  {
    key: 'ideaConsult',
    icon: Sparkles,
    accentColor: '#10b981',
    technologies: ['JavaScript', 'Bootstrap 5', 'WordPress', 'PHP'],
    live: 'https://ideaconsult.biz/',
  },
]

export default function ProjectsSection() {
  return (
    <section id="projects" className="section-stage relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 neural-grid opacity-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="identity-panel px-6 py-3 holographic inline-flex items-center mb-8">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse mr-3" />
            <span className="text-xs sm:text-sm font-neural text-accent font-code tracking-wider">
              {site.projects.badge}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            {site.projects.title} <span className="text-primary">{site.projects.titleHighlight}</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {site.projects.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => {
            const item = site.projects.items[project.key]
            return (
              <ProjectCard
                key={project.key}
                index={index}
                icon={project.icon}
                accentColor={project.accentColor}
                title={item.title}
                description={item.description}
                technologies={project.technologies}
                live={project.live}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
