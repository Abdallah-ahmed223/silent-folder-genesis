
import { motion } from "framer-motion";
import { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import AboutContent from './about/AboutContent';
import AboutProfile from './about/AboutProfile';
import AboutStats from './about/AboutStats';

const About3DScene = lazy(() => import('./3d/About3DScene'));

export default function AboutSection() {
  const { t } = useTranslation();
  
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <Suspense fallback={<div />}>
          <About3DScene />
        </Suspense>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AboutContent />
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <AboutProfile />
            <AboutStats />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
