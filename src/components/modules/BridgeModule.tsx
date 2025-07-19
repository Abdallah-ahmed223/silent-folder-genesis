import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail, Zap, Cpu, Satellite, Rocket, Target } from 'lucide-react'
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
  { icon: Zap, value: "100+", label: "Projects Deployed", color: "#0ea5e9" },
  { icon: Cpu, value: "5+", label: "Years Experience", color: "#a855f7" },
  { icon: Satellite, value: "∞", label: "Lines of Code", color: "#06b6d4" },
]

const quickActions = [
  { icon: Target, label: 'View Projects', module: 'engineering' as SpaceModuleType, color: "#06b6d4" },
  { icon: Cpu, label: 'Check Skills', module: 'tactical' as SpaceModuleType, color: "#10b981" },
  { icon: Mail, label: 'Open Comms', module: 'communications' as SpaceModuleType, color: "#f59e0b" },
]

export default function BridgeModule({ isActive, onNavigate }: BridgeModuleProps) {
  const { t } = useTranslation()

  return (
    <SpaceModule
      moduleId="BRIDGE-01"
      title={t('hero.title')}
      subtitle="COMMAND CENTER - MAIN OPERATIONS"
      isActive={isActive}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
        {/* Left Column - 3D Scene */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="h-[500px] glow-card overflow-hidden relative"
          >
            <Portfolio3DScene />
            
            {/* Overlay Controls */}
            <div className="absolute top-4 left-4 z-10">
              <div className="glow-card p-3 text-xs font-mono space-y-1">
                <div className="text-accent">3D VIEW: ENABLED</div>
                <div className="text-muted-foreground">RENDER: REAL-TIME</div>
                <div className="text-primary">FPS: 60</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Information Panels */}
        <div className="space-y-6">
          {/* Mission Brief */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="glow-card p-6"
          >
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
              <Rocket className="w-5 h-5 mr-2" />
              MISSION BRIEF
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {t('hero.description')}
            </p>
            
            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.label}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => onNavigate(action.module)}
                    className="w-full glow-card flex flex-col items-center p-4 h-auto bg-card hover:bg-primary/10 border border-primary/20"
                    variant="ghost"
                  >
                    <action.icon 
                      className="w-5 h-5 mb-2" 
                      style={{ color: action.color }} 
                    />
                    <span className="text-xs font-medium">{action.label}</span>
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* System Status */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="glow-card p-6"
          >
            <h3 className="text-xl font-bold text-primary mb-4">SYSTEM STATUS</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {systemStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="text-center p-4 bg-background/50 rounded-lg border border-primary/20"
                >
                  <stat.icon 
                    className="w-8 h-8 mx-auto mb-3 nebula-pulse" 
                    style={{ color: stat.color }}
                  />
                  <div className="text-2xl font-bold mb-1" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground font-mono">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Communications Array */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="glow-card p-6"
          >
            <h3 className="text-xl font-bold text-primary mb-4">EXTERNAL LINKS</h3>
            <div className="flex justify-center space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                >
                  <div className="w-12 h-12 rounded-full glow-card flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <social.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
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