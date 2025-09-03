
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import ContactInfo from './contact/ContactInfo'
import ContactForm from './contact/ContactForm'
import SocialLinks from './contact/SocialLinks'


const floatingElements = [
  { id: 1, delay: 0.8, x: '10%', y: '20%' },
  { id: 2, delay: 2.2, x: '90%', y: '30%' },
  { id: 3, delay: 1.5, x: '15%', y: '80%' },
];

export default function ContactSection() {
  const { t } = useTranslation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 4,
        y: (e.clientY / window.innerHeight - 0.5) * 4,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8 neural-grid overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 neural-grid opacity-8"></div>
      


      {/* Floating Elements */}
      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute w-2 h-2 bg-primary/15 rounded-full"
          style={{
            left: element.x,
            top: element.y,
          }}
          animate={{
            y: [0, -18, 0],
            opacity: [0.15, 0.4, 0.15],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            delay: element.delay,
          }}
        />
      ))}

      {/* Data Streams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-15">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="absolute data-particles"
            style={{
              left: `${35 + i * 30}%`,
              animationDelay: `${i * 1.5}s`,
            }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{
            transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="premium-card px-6 py-3 holographic inline-flex items-center mb-8">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse mr-3" />
              <span className="text-sm font-neural text-accent font-code">CONTACT • COMMUNICATION READY</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              {t('contact.title')} <span className="hero-text">{t('contact.titleHighlight')}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto premium-card p-4">
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
              <div className="premium-card p-6">
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
        </motion.div>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-background/40 pointer-events-none z-[5]"></div>
    </section>
  )
}
