import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, MapPin } from 'lucide-react'
import { site } from '@/content/site'

const socialLinks = [
  { icon: Github, href: 'https://github.com/abdallah-ahmed222', label: 'GitHub' },
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/abdallah-ahmed-783512231/',
    label: 'LinkedIn',
  },
  { icon: Mail, href: 'mailto:abdallah.ahmed2022222@gmail.com', label: 'Email' },
]

const quickLinks = [
  { name: site.nav.home, href: '#home' },
  { name: site.nav.about, href: '#about' },
  { name: site.nav.experience, href: '#experience' },
  { name: site.nav.projects, href: '#projects' },
  { name: site.nav.skills, href: '#skills' },
  { name: site.nav.contact, href: '#contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-primary/20 bg-card/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold text-primary tracking-tight">Abdallah Ahmed</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Senior Frontend Engineer building scalable enterprise React, Vue 3, and TypeScript applications.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-2.5 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                  <span className="sr-only">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground font-mono">
              Navigate
            </h4>
            <ul className="grid grid-cols-2 gap-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground font-mono">
              Get In Touch
            </h4>
            <a
              href="mailto:abdallah.ahmed2022222@gmail.com"
              className="block text-sm text-primary hover:text-primary/80 transition-colors duration-200 font-medium"
            >
              abdallah.ahmed2022222@gmail.com
            </a>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-3.5 h-3.5" />
              <span>Giza, Egypt</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-primary/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3"
        >
          <p className="text-xs text-muted-foreground font-mono">© {year} Abdallah Ahmed. All rights reserved.</p>
          <p className="text-xs text-muted-foreground font-mono">Built with React, TypeScript, and Three.js.</p>
        </motion.div>
      </div>
    </footer>
  )
}
