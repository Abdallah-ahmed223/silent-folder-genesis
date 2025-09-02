
import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' }
]

export default function SocialLinks() {
  const { t } = useTranslation()

  return (
    <div className="pt-8">
      <h4 className="text-lg font-semibold mb-4">{t('contact.followMe')}</h4>
      <div className="flex space-x-4">
        {socialLinks.map((social, index) => (
          <motion.a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            <social.icon className="w-5 h-5" />
            <span className="sr-only">{social.label}</span>
          </motion.a>
        ))}
      </div>
    </div>
  )
}
