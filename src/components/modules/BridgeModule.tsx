import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail, TrendingUp, Code, Globe, Target, Database, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Portfolio3DScene from '../Portfolio3DScene'
import { useTranslation } from 'react-i18next'
import SpaceModule from '../SpaceModule'
import { SpaceModule as SpaceModuleType } from '../SpaceshipDashboard'

interface BridgeModuleProps {
  isActive: boolean
  onNavigate: (module: SpaceModuleType) => void
}

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:hello@example.com', label: 'Email' },
]

const systemStats = [
  { icon: TrendingUp, value: "150+", label: "Projects Completed", color: "hsl(214, 100%, 60%)" },
  { icon: Code, value: "5+", label: "Years Experience", color: "hsl(189, 100%, 65%)" },
  { icon: Globe, value: "∞", label: "Lines of Code", color: "hsl(142, 76%, 55%)" },
]

const quickActions = [
  { 
    icon: Target, 
    label: 'View Projects', 
    module: 'engineering' as SpaceModuleType, 
    color: "hsl(142, 76%, 55%)",
    description: "Explore technical work"
  },
  { 
    icon: Database, 
    label: 'Technical Skills', 
    module: 'tactical' as SpaceModuleType, 
    color: "hsl(25, 95%, 58%)",
    description: "Review capabilities"
  },
  { 
    icon: Mail, 
    label: 'Get In Touch', 
    module: 'communications' as SpaceModuleType, 
    color: "hsl(210, 20%, 85%)",
    description: "Start conversation"
  },
]

export default function BridgeModule({ isActive, onNavigate }: BridgeModuleProps) {
  const { t } = useTranslation()

  return (
    <SpaceModule
      moduleId="CTRL-001"
      title={t('hero.title')}
      subtitle="MISSION CONTROL CENTER"
      isActive={isActive}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
        {/* Left Column - 3D Scene */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="h-[500px] tech-card overflow-hidden relative"
          >
            <Portfolio3DScene />
            
            {/* Professional Overlay */}
            <div className="absolute top-4 left-4 z-10">
              <div className="tech-card p-3 text-xs font-mono space-y-1 bg-background/90">
                <div className="text-accent">RENDER: REAL-TIME</div>
                <div className="text-muted-foreground">STATUS: ACTIVE</div>
                <div className="text-primary">FPS: 60</div>
              </div>
            </div>
            
            <div className="absolute bottom-4 right-4 z-10">
              <div className="tech-card p-2 bg-background/90">
                <Zap className="w-4 h-4 text-primary" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Information Panels */}
        <div className="space-y-6">
          {/* Mission Overview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="tech-card p-6"
          >
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2" />
              MISSION OVERVIEW
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {t('hero.description')}
            </p>
            
            {/* Quick Actions */}
            <div className="grid grid-cols-1 gap-3">
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.label}
                  whileHover={{ scale: 1.02, x: 2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={() => onNavigate(action.module)}
                    className="w-full tech-card flex items-center justify-between p-4 h-auto bg-background/50 hover:bg-primary/5 border professional-transition text-left"
                    variant="ghost"
                  >
                    <div className="flex items-center space-x-3">
                      <action.icon 
                        className="w-5 h-5" 
                        style={{ color: action.color }} 
                      />
                      <div>
                        <div className="font-medium">{action.label}</div>
                        <div className="text-xs text-muted-foreground">{action.description}</div>
                      </div>
                    </div>
                    <ArrowDown className="w-4 h-4 rotate-[-90deg] text-muted-foreground" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Performance Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="tech-card p-6"
          >
            <h3 className="text-xl font-bold text-primary mb-4">PERFORMANCE METRICS</h3>
            <div className="grid grid-cols-1 gap-4">
              {systemStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-background/50 rounded border border-border professional-transition hover:border-primary/50"
                >
                  <div className="flex items-center space-x-3">
                    <stat.icon 
                      className="w-6 h-6" 
                      style={{ color: stat.color }}
                    />
                    <div>
                      <div className="font-medium">{stat.label}</div>
                      <div className="text-xs text-muted-foreground font-mono">CURRENT STATUS</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold" style={{ color: stat.color }}>
                      {stat.value}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* External Communications */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="tech-card p-6"
          >
            <h3 className="text-xl font-bold text-primary mb-4">EXTERNAL CONNECTIONS</h3>
            <div className="flex justify-center space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                >
                  <div className="w-12 h-12 rounded-lg tech-card flex items-center justify-center group-hover:border-primary/50 professional-transition">
                    <social.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary professional-transition" />
                  </div>
                  <span className="sr-only">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </SpaceModule>
  )
}