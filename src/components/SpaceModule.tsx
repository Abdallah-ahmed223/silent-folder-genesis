import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface SpaceModuleProps {
  children: ReactNode
  moduleId: string
  title: string
  subtitle: string
  isActive: boolean
  className?: string
}

export default function SpaceModule({ 
  children, 
  moduleId, 
  title, 
  subtitle, 
  isActive, 
  className = "" 
}: SpaceModuleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ 
        opacity: isActive ? 1 : 0, 
        scale: isActive ? 1 : 0.95,
        y: isActive ? 0 : 20
      }}
      exit={{ 
        opacity: 0, 
        scale: 0.95, 
        y: -20
      }}
      transition={{ 
        duration: 0.4, 
        ease: "easeInOut"
      }}
      className={`fixed inset-0 pt-36 pb-8 px-6 overflow-hidden ${className}`}
      style={{ 
        display: isActive ? 'block' : 'none'
      }}
    >
      {/* Professional Background */}
      <div className="absolute inset-0 bg-gradient-space"></div>
      
      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-5 professional-grid"
      />

      {/* Module Content Container */}
      <div className="relative z-10 h-full max-w-7xl mx-auto">
        {/* Module Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mb-8"
        >
          <div className="tech-card p-6 scan-effect">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tech-text mb-2">{title}</h1>
                <p className="text-accent font-medium text-sm">{subtitle}</p>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground font-mono uppercase">Module ID</div>
                <div className="text-primary font-mono font-bold text-lg">{moduleId}</div>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full status-indicator"></div>
                  <span className="text-xs text-green-400 font-mono">ACTIVE</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Module Content */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="h-[calc(100vh-280px)] overflow-y-auto custom-scrollbar"
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  )
}