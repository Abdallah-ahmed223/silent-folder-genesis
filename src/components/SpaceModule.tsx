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
      initial={{ opacity: 0, scale: 0.8, rotateX: -20 }}
      animate={{ 
        opacity: isActive ? 1 : 0, 
        scale: isActive ? 1 : 0.8,
        rotateX: isActive ? 0 : -20,
        y: isActive ? 0 : 100
      }}
      exit={{ 
        opacity: 0, 
        scale: 0.8, 
        rotateX: 20,
        y: -100
      }}
      transition={{ 
        duration: 0.8, 
        ease: "easeInOut",
        opacity: { duration: 0.6 },
        scale: { duration: 0.8 },
        rotateX: { duration: 0.8 },
        y: { duration: 0.8 }
      }}
      className={`fixed inset-0 pt-32 pb-8 px-4 overflow-hidden ${className}`}
      style={{ 
        perspective: '1000px',
        display: isActive ? 'block' : 'none'
      }}
    >
      {/* Module Background */}
      <div className="absolute inset-0 bg-gradient-space opacity-90"></div>
      
      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Module Content Container */}
      <div className="relative z-10 h-full max-w-7xl mx-auto">
        {/* Module Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8"
        >
          <div className="glow-card p-6 scanner-line">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold hero-text mb-2">{title}</h1>
                <p className="text-accent font-mono text-sm">{subtitle}</p>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground font-mono">MODULE ID</div>
                <div className="text-primary font-mono font-bold">{moduleId.toUpperCase()}</div>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400 font-mono">ACTIVE</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Module Content */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="h-[calc(100vh-300px)] overflow-y-auto custom-scrollbar"
        >
          {children}
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ 
          y: [0, -10, 0],
          rotateZ: [0, 1, -1, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 right-8 w-4 h-4 bg-accent/30 rounded-full blur-sm"
      />
      
      <motion.div
        animate={{ 
          y: [0, 15, 0],
          x: [0, 5, 0],
          rotateZ: [0, -2, 2, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-1/3 left-12 w-6 h-6 bg-primary/20 rounded-full blur-sm"
      />

      <motion.div
        animate={{ 
          y: [0, -20, 0],
          x: [0, -10, 0],
          rotateZ: [0, 3, -1, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
        className="absolute top-2/3 left-1/4 w-3 h-3 bg-green-400/25 rounded-full blur-sm"
      />
    </motion.div>
  )
}