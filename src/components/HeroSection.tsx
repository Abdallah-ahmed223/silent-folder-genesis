import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail, Zap, Cpu, Satellite } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Portfolio3DScene from './Portfolio3DScene'
import { useTranslation } from 'react-i18next'

const socialLinks = [
  { icon: Github, href: 'https://github.com/abdallah-ahmed222', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/abdallah-ahmed-783512231/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:abdallah.ahmed2022222@gmail.com', label: 'Email' },
]

const spaceStats = [
  { icon: Zap, value: "30+", label: "Projects Deployed" },
  { icon: Cpu, value: "3+", label: "Years Experience" },
  { icon: Satellite, value: "∞", label: "Lines of Code" },
]

export default function HeroSection() {
  const { t } = useTranslation();
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Starfield Background */}
      <div className="absolute inset-0 starfield-bg opacity-30"></div>
      
      {/* 3D Background Scene */}
      <div className="absolute inset-0 z-0">
        <Portfolio3DScene />
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
            <span className="hero-text block cosmic-float h-[7.8vw]">{t('hero.subtitle')}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl  p-4 rounded-sm lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed light-mode-panel dark-mode-panel"
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
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
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
            className="flex justify-center pt-3"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full glow-card light-mode-panel dark-mode-panel group relative overflow-hidden  mx-3 "
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <social.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors duration-300 relative z-10 " />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="sr-only">{social.label}</span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
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