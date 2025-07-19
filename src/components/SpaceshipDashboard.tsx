import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, User, Briefcase, Cpu, Mail, 
  Activity, Database, Settings, Wifi,
  Languages, Sun, Moon, Monitor 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from './ThemeProvider'
import { useTranslation } from 'react-i18next'

export type SpaceModule = 'bridge' | 'bio-lab' | 'engineering' | 'tactical' | 'communications'

interface SpaceshipDashboardProps {
  activeModule: SpaceModule
  onModuleChange: (module: SpaceModule) => void
}

const spaceModules = [
  { 
    id: 'bridge' as SpaceModule, 
    icon: Home, 
    label: 'nav.home', 
    status: 'ONLINE',
    color: 'hsl(214, 100%, 60%)',
    description: 'Control Center'
  },
  { 
    id: 'bio-lab' as SpaceModule, 
    icon: User, 
    label: 'nav.about', 
    status: 'ACTIVE',
    color: 'hsl(189, 100%, 65%)',
    description: 'Personnel Data'
  },
  { 
    id: 'engineering' as SpaceModule, 
    icon: Briefcase, 
    label: 'nav.projects', 
    status: 'OPERATIONAL',
    color: 'hsl(142, 76%, 55%)',
    description: 'Project Systems'
  },
  { 
    id: 'tactical' as SpaceModule, 
    icon: Cpu, 
    label: 'nav.skills', 
    status: 'READY',
    color: 'hsl(25, 95%, 58%)',
    description: 'Technical Skills'
  },
  { 
    id: 'communications' as SpaceModule, 
    icon: Mail, 
    label: 'nav.contact', 
    status: 'STANDBY',
    color: 'hsl(210, 20%, 85%)',
    description: 'Communications'
  },
]

export default function SpaceshipDashboard({ activeModule, onModuleChange }: SpaceshipDashboardProps) {
  const { theme, setTheme } = useTheme()
  const { t, i18n } = useTranslation()
  const [systemTime, setSystemTime] = useState(new Date())
  const [isWarping, setIsWarping] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setSystemTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleModuleChange = (module: SpaceModule) => {
    if (module === activeModule) return
    
    setIsWarping(true)
    setTimeout(() => {
      onModuleChange(module)
      setIsWarping(false)
    }, 1000)
  }

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en"
    i18n.changeLanguage(newLang)
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr"
  }

  const ThemeIcon = theme === "dark" ? Sun : theme === "light" ? Moon : Monitor

  return (
    <>
      {/* Warp Effect Overlay */}
      <AnimatePresence>
        {isWarping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] pointer-events-none"
            style={{
              background: `
                radial-gradient(circle at center, transparent 0%, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%, transparent 100%),
                linear-gradient(0deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)
              `,
              backgroundSize: '200% 200%, 100% 100%',
              animation: 'warp-speed 1s ease-in-out'
            }}
          />
        )}
      </AnimatePresence>

      {/* Main Dashboard - Fixed Position */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 p-6"
      >
        <div className="max-w-7xl mx-auto">
          {/* Top Status Bar */}
          <div className="tech-card p-4 mb-4 professional-grid">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full status-indicator"></div>
                  <span className="text-accent font-medium text-sm">SYSTEM OPERATIONAL</span>
                </div>
                <div className="text-muted-foreground text-sm font-mono">
                  {systemTime.toISOString().split('T')[0]}
                </div>
                <div className="text-muted-foreground text-sm font-mono">
                  {systemTime.toLocaleTimeString()}
                </div>
              </div>
              <div className="flex items-center space-x-6 text-sm font-mono">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-primary" />
                  <span className="text-primary">PWR: 100%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Database className="w-4 h-4 text-accent" />
                  <span className="text-accent">SYS: ONLINE</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Wifi className="w-4 h-4 text-green-400" />
                  <span className="text-green-400">NET: ACTIVE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Navigation Console */}
          <div className="tech-card p-6">
            <div className="flex items-center justify-between">
              {/* Professional Logo/Brand */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-center space-x-4"
              >
                <div className="relative">
                  <div className="w-12 h-12 tech-gradient rounded-lg flex items-center justify-center">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg blur opacity-60"></div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold tech-text">AEROSPACE SYSTEMS</h1>
                  <p className="text-sm text-muted-foreground font-mono">MISSION CONTROL INTERFACE</p>
                </div>
              </motion.div>

              {/* Module Navigation */}
              <div className="flex items-center space-x-3">
                {spaceModules.map((module) => {
                  const isActive = activeModule === module.id
                  const ModuleIcon = module.icon
                  
                  return (
                    <motion.div
                      key={module.id}
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        size="lg"
                        onClick={() => handleModuleChange(module.id)}
                        className={`relative group flex flex-col items-center p-4 min-w-[110px] h-auto professional-transition ${
                          isActive 
                            ? 'tech-gradient shadow-lg border-0' 
                            : 'tech-card border hover:border-primary/50'
                        }`}
                        disabled={isWarping}
                      >
                        <ModuleIcon className={`w-5 h-5 mb-2 ${
                          isActive ? 'text-white' : 'text-primary'
                        }`} />
                        <span className={`text-xs font-medium mb-1 ${
                          isActive ? 'text-white' : 'text-foreground'
                        }`}>
                          {t(module.label)}
                        </span>
                        <span className={`text-[10px] font-mono ${
                          isActive ? 'text-white/80' : 'text-muted-foreground'
                        }`}>
                          {module.description}
                        </span>
                        
                        {/* Status Indicator */}
                        <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
                          isActive ? 'bg-green-400 status-indicator' : 'bg-primary/60'
                        }`}>
                        </div>
                      </Button>
                    </motion.div>
                  )
                })}
              </div>

              {/* System Controls */}
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLanguage}
                  className="tech-card w-10 h-10 p-0 professional-transition"
                  title={i18n.language === "en" ? "Switch to Arabic" : "Switch to English"}
                >
                  <Languages className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const themes = ["light", "dark", "system"] as const
                    const currentIndex = themes.indexOf(theme)
                    const nextTheme = themes[(currentIndex + 1) % themes.length]
                    setTheme(nextTheme)
                  }}
                  className="tech-card w-10 h-10 p-0 professional-transition"
                >
                  <ThemeIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Additional CSS for warp effect */}
      <style>{`
        @keyframes warp-speed {
          0% { 
            background-position: 0% 0%, 0% 0%;
            transform: scale(1) rotateZ(0deg);
          }
          50% { 
            background-position: 100% 100%, 50% 50%;
            transform: scale(1.1) rotateZ(2deg);
          }
          100% { 
            background-position: 200% 200%, 100% 100%;
            transform: scale(1) rotateZ(0deg);
          }
        }
      `}</style>
    </>
  )
}