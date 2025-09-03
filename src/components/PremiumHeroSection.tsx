
import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail, Code2, Palette, Zap } from 'lucide-react'
import { MagneticButton } from '@/components/ui/magnetic-button'

import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'

const socialLinks = [
  { icon: Github, href: 'https://github.com/abdallah-ahmed222', label: 'GitHub', color: 'hover:text-cyber-blue' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/abdallah-ahmed-783512231/', label: 'LinkedIn', color: 'hover:text-electric-cyan' },
  { icon: Mail, href: 'mailto:abdallah.ahmed2022222@gmail.com', label: 'Email', color: 'hover:text-neon-purple' },
]

const techStack = [
  { name: 'Vue.js', icon: Code2, percentage: 95 },
  { name: 'React', icon: Code2, percentage: 90 },
  { name: 'TypeScript', icon: Code2, percentage: 88 },
  { name: '3D Web', icon: Zap, percentage: 85 },
]

const floatingElements = [
  { id: 1, delay: 0, x: '10%', y: '20%' },
  { id: 2, delay: 2, x: '80%', y: '30%' },
  { id: 3, delay: 4, x: '15%', y: '70%' },
  { id: 4, delay: 1, x: '85%', y: '80%' },
]

export default function PremiumHeroSection() {
  const { t } = useTranslation()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden neural-grid">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 neural-grid opacity-30"></div>
      
      {/* 3D Background Scene */}


      {/* Floating Elements */}
      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute w-4 h-4 bg-primary/20 rounded-full floating-element"
          style={{
            left: element.x,
            top: element.y,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: element.delay,
          }}
        />
      ))}

      {/* Data Streams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute data-particles"
            style={{
              left: `${20 + i * 15}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="space-y-12"
          style={{
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
          }}
        >
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center"
          >
            <div className="premium-card px-6 py-3 holographic">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-quantum-green rounded-full animate-pulse" />
                <span className="text-sm font-neural text-accent font-code">SYSTEM ONLINE • READY FOR DEPLOYMENT</span>
              </div>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="space-y-6"
          >
            <h1 className="text-5xl sm:text-7xl lg:text-9xl font-neural leading-tight">
              <motion.span 
                className="block"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  ease: "linear" 
                }}
              >
                {t('hero.title')}
              </motion.span>
              <motion.span 
                className="hero-text block quantum-float"
                style={{ height: 'clamp(4rem, 12vw, 8rem)' }}
              >
                {t('hero.subtitle')}
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed premium-card p-6"
            >
              {t('hero.description')}
            </motion.p>
          </motion.div>

          {/* Tech Stack Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                className="skill-orb text-center group"
                whileHover={{ scale: 1.1, rotateY: 15 }}
              >
                <tech.icon className="w-8 h-8 mx-auto mb-3 text-primary group-hover:text-accent transition-colors duration-300" />
                <div className="text-lg font-bold text-primary mb-1">{tech.percentage}%</div>
                <div className="text-sm text-muted-foreground font-neural">{tech.name}</div>
                
                {/* Skill bar */}
                <div className="w-full bg-muted/20 rounded-full h-1 mt-2 overflow-hidden">
                  <motion.div
                    className="h-full neural-gradient"
                    initial={{ width: 0 }}
                    animate={{ width: `${tech.percentage}%` }}
                    transition={{ duration: 1.5, delay: 1.5 + index * 0.2 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <MagneticButton
              variant="primary"
              size="lg"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="group"
            >
              <span>{t('hero.viewWork')}</span>
              <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
            </MagneticButton>
            
            <MagneticButton
              variant="secondary"
              size="lg"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('hero.getInTouch')}
            </MagneticButton>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="flex justify-center gap-6"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`premium-card p-4 group relative overflow-hidden interactive-hover ${social.color}`}
                whileHover={{ scale: 1.1, rotateY: 10 }}
                whileTap={{ scale: 0.95 }}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <social.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors duration-300 relative z-10" />
                <span className="sr-only">{social.label}</span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs font-neural">SCROLL TO EXPLORE</span>
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-primary rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-background/60 pointer-events-none z-[5]"></div>
    </section>
  )
}
