
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { lazy, Suspense } from 'react'
import ContactInfo from './contact/ContactInfo'
import ContactForm from './contact/ContactForm'
import SocialLinks from './contact/SocialLinks'

const Contact3DScene = lazy(() => import('./3d/Contact3DScene'))

export default function ContactSection() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <Suspense fallback={<div />}>
          <Contact3DScene />
        </Suspense>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            {t('contact.title')} <span className="hero-text">{t('contact.titleHighlight')}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('contact.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6">{t('contact.letsConnect')}</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {t('contact.connectDescription')}
              </p>
            </div>

            <ContactInfo />
            <SocialLinks />
          </motion.div>

          <ContactForm />
        </div>
      </div>

      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
      </div>
    </section>
  )
}
