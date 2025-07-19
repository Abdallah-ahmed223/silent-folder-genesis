import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, User, Briefcase, Cpu, Mail, 
  Rocket, Zap, Target, Satellite, 
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
    color: '#0ea5e9',
    description: 'Command Center'
  },
  { 
    id: 'bio-lab' as SpaceModule, 
    icon: User, 
    label: 'nav.about', 
    status: 'ACTIVE',
    color: '#a855f7',
    description: 'Bio Analysis Lab'
  },
  { 
    id: 'engineering' as SpaceModule, 
    icon: Briefcase, 
    label: 'nav.projects', 
    status: 'OPERATIONAL',
    color: '#06b6d4',
    description: 'Engineering Bay'
  },
  { 
    id: 'tactical' as SpaceModule, 
    icon: Cpu, 
    label: 'nav.skills', 
    status: 'READY',
    color: '#10b981',
    description: 'Tactical Systems'
  },
  { 
    id: 'communications' as SpaceModule, 
    icon: Mail, 
    label: 'nav.contact', 
    status: 'STANDBY',
    color: '#f59e0b',
    description: 'Comm Array'
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
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 p-4"
      >
        <div className="max-w-7xl mx-auto">
          {/* Top Status Bar */}
          <div className="glow-card p-3 mb-4 flex justify-between items-center text-xs font-mono">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-accent">SYSTEM OPERATIONAL</span>
              </div>
              <div className="text-muted-foreground">
                STARDATE: {systemTime.toISOString().split('T')[0]}
              </div>
              <div className="text-muted-foreground">
                TIME: {systemTime.toLocaleTimeString()}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-primary">PWR: 100%</div>
              <div className="text-accent">NAV: LOCKED</div>
              <div className="text-green-400">SYS: ONLINE</div>
            </div>
          </div>

          {/* Main Navigation Console */}
          <div className="glow-card p-6 hologram-effect">
            <div className="flex items-center justify-between">
              {/* Ship Logo/Brand */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3"
              >
                <div className="relative">
                  <div className="w-12 h-12 cosmic-gradient rounded-full flex items-center justify-center">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur opacity-75"></div>
                </div>
                <div>
                  <h1 className="text-xl font-bold hero-text">STARSHIP PORTFOLIO</h1>
                  <p className="text-xs text-muted-foreground font-mono">DEEP SPACE EXPLORATION VESSEL</p>
                </div>
              </motion.div>

              {/* Module Navigation */}
              <div className="flex items-center space-x-2">
                {spaceModules.map((module) => {
                  const isActive = activeModule === module.id
                  const ModuleIcon = module.icon
                  
                  return (
                    <motion.div
                      key={module.id}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        size="lg"
                        onClick={() => handleModuleChange(module.id)}
                        className={`relative group flex flex-col items-center p-4 min-w-[120px] h-auto ${
                          isActive 
                            ? 'cosmic-gradient shadow-lg' 
                            : 'hover:bg-primary/10 border border-primary/20'
                        }`}
                        disabled={isWarping}
                      >
                        <ModuleIcon className={`w-5 h-5 mb-1 ${
                          isActive ? 'text-white' : 'text-primary'
                        }`} />
                        <span className={`text-xs font-medium ${
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
                          isActive ? 'bg-green-400' : 'bg-primary/60'
                        } ${isActive ? 'animate-pulse' : ''}`}>
                        </div>

                        {/* Hover Effect */}
                        <div className={`absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-md ${
                          isActive ? 'from-white/20 to-white/10' : 'from-primary/20 to-accent/20'
                        }`}></div>
                      </Button>
                    </motion.div>
                  )
                })}
              </div>

              {/* System Controls */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLanguage}
                  className="rounded-full w-10 h-10 p-0 glow-card"
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
                  className="rounded-full w-10 h-10 p-0 glow-card"
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