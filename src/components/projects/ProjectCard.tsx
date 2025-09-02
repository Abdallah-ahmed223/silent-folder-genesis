
import { motion } from 'framer-motion'
import { Github, ExternalLink, LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useTranslation } from 'react-i18next'

interface ProjectCardProps {
  title: string
  description: string
  image: string
  technologies: string[]
  github: string
  live: string
  icon: LucideIcon
}

export default function ProjectCard({ 
  title, 
  description, 
  image, 
  technologies, 
  github, 
  live, 
  icon: Icon 
}: ProjectCardProps) {
  const { t } = useTranslation()

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group"
    >
      <Card className="glow-card h-full overflow-hidden">
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300"></div>
          
          <div className="absolute top-4 left-4">
            <div className="p-2 rounded-lg bg-background/80 backdrop-blur-sm">
              <Icon className="w-5 h-5 text-primary" />
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            {description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 group/btn"
              asChild
            >
              <a href={github} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform duration-300" />
                {t('projects.buttons.code')}
              </a>
            </Button>
            <Button
              size="sm"
              className="flex-1 group/btn"
              asChild
            >
              <a href={live} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform duration-300" />
                {t('projects.buttons.live')}
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
