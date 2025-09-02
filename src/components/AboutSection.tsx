
import { motion } from "framer-motion";
import { lazy, Suspense, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AboutContent from './about/AboutContent';
import AboutProfile from './about/AboutProfile';
import AboutStats from './about/AboutStats';

const About3DScene = lazy(() => import('./3d/About3DScene'));

const floatingElements = [
  { id: 1, delay: 0, x: '15%', y: '25%' },
  { id: 2, delay: 1.5, x: '85%', y: '35%' },
  { id: 3, delay: 3, x: '20%', y: '75%' },
];

export default function AboutSection() {
  const { t } = useTranslation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 10,
        y: (e.clientY / window.innerHeight - 0.5) * 10,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8 neural-grid overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 neural-grid opacity-20"></div>
      
      {/* 3D Background Scene */}
      <div className="absolute inset-0 opacity-30 pointer-events-none z-0">
        <Suspense fallback={<div />}>
          <About3DScene />
        </Suspense>
      </div>

      {/* Floating Elements */}
      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute w-3 h-3 bg-primary/30 rounded-full floating-element"
          style={{
            left: element.x,
            top: element.y,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.7, 0.3],
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
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute data-particles"
            style={{
              left: `${25 + i * 20}%`,
              animationDelay: `${i * 0.8}s`,
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
            transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`,
          }}
        >
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
        </motion.div>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-background/20 pointer-events-none z-[5]"></div>
    </section>
  );
}
