import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail, Zap, Cpu, Satellite } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Portfolio3DScene from './Portfolio3DScene'
import { useTranslation } from 'react-i18next'

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:hello@example.com', label: 'Email' },
]

const spaceStats = [
  { icon: Zap, value: "100+", label: "Projects Deployed" },
  { icon: Cpu, value: "5+", label: "Years Experience" },
  { icon: Satellite, value: "∞", label: "Lines of Code" },
]

export default function HeroSection() {
  const { t } = useTranslation();
  
  const scrollToNext = () => {
    const element = document.getElementById('about')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Starfield Background */}
      <div className="absolute inset-0 starfield-bg opacity-30"></div>
      
      {/* 3D Background Scene */}
      <div className="absolute inset-0 z-0">
        <Portfolio3DScene />
      </div>

      {/* Spaceship Dashboard UI Elements */}
      <div className="absolute top-4 left-4 z-20 hidden lg:block">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5 }}
          className="glow-card light-mode-panel dark-mode-panel p-4 space-y-2"
        >
          <div className="text-xs text-accent font-mono">STATUS: ONLINE</div>
          <div className="text-xs text-muted-foreground font-mono">CONN: STABLE</div>
          <div className="text-xs text-primary font-mono">SYS: OPERATIONAL</div>
        </motion.div>
      </div>

      <div className="absolute top-4 right-4 z-20 hidden lg:block">
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.7 }}
          className="glow-card light-mode-panel dark-mode-panel p-4 space-y-2"
        >
          <div className="text-xs text-accent font-mono">PWR: 100%</div>
          <div className="text-xs text-muted-foreground font-mono">THR: NOMINAL</div>
          <div className="text-xs text-primary font-mono">NAV: LOCKED</div>
        </motion.div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Mission Status */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="inline-block"
          >
            <div className="px-4 py-2 rounded-full border border-primary/30 bg-card/60 backdrop-blur-sm light-mode-panel dark-mode-panel">
              <span className="text-sm text-accent font-mono">◉ MISSION STATUS: ACTIVE</span>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl lg:text-8xl font-bold leading-tight"
          >
            <span className="block">{t('hero.title')}</span>
            <span className="hero-text block cosmic-float">{t('hero.subtitle')}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            {t('hero.description')}
          </motion.p>

          {/* Space Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-4"
          >
            {spaceStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="glow-card light-mode-panel dark-mode-panel p-4 text-center group hover:scale-105 transition-transform duration-300"
              >
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary nebula-pulse" />
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground font-mono">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <Button
              size="lg"
              className="cosmic-gradient px-8 py-4 text-lg font-semibold relative overflow-hidden group"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="relative z-10">{t('hero.viewWork')}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg font-semibold border-primary/50 hover:border-primary glow-card light-mode-panel dark-mode-panel"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('hero.getInTouch')}
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex justify-center space-x-6 pt-8"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full glow-card light-mode-panel dark-mode-panel group relative overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <social.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors duration-300 relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="sr-only">{social.label}</span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToNext}
            className="p-2 rounded-full glow-card light-mode-panel dark-mode-panel hover:bg-primary/10 transition-colors duration-300"
          >
            <ArrowDown className="w-6 h-6 text-primary" />
          </Button>
        </motion.div>
      </motion.div>

      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background/60 pointer-events-none z-[5]"></div>
      
      {/* Grid Overlay for Spaceship Feel */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-[6]" 
           style={{
             backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)`,
             backgroundSize: '50px 50px'
           }}>
      </div>
    </section>
  )
}