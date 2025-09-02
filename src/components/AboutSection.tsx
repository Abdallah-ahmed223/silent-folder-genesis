import { motion } from "framer-motion";
import { Download, MapPin, Calendar, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImageSrc from "@/images/me.webp";
import CVFile from "@/images/Abdallah_Ahmed_Web_Front_end (1).pdf";
import { useTranslation } from 'react-i18next';
import { lazy, Suspense } from 'react';

const About3DScene = lazy(() => import('./3d/About3DScene'));
const stats = [
  { label: "about.stats.experience", value: "3+", icon: Calendar },
  { label: "about.stats.projects", value: "50+", icon: Heart },
  { label: "about.stats.clients", value: "25+", icon: MapPin },
  { label: "about.stats.technologies", value: "15+", icon: Download },
];

export default function AboutSection() {
  const { t } = useTranslation();
  
  const handleDownloadCV = () => {
    // Create a link element
    const link = document.createElement('a');
    // Use the imported CV file
    link.href = CVFile;
    // Set download attribute with filename
    link.download = 'Abdallah_Ahmed_Web_Front_end_CV.pdf';
    // Append to body
    document.body.appendChild(link);
    // Trigger click
    link.click();
    // Clean up
    document.body.removeChild(link);
  };
  
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <Suspense fallback={<div />}>
          <About3DScene />
        </Suspense>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              {t('about.title')} <span className="hero-text">{t('about.titleHighlight')}</span>
            </h2>

            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                {t('about.paragraph1')}
              </p>

              <p>
                {t('about.paragraph2')}
              </p>

              <p>
                {t('about.paragraph3')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="glow-card"
                onClick={handleDownloadCV}
              >
                <Download className="w-5 h-5 mr-2" />
                {t('about.downloadResume')}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                {t('about.getInTouch')}
              </Button>
            </div>
          </motion.div>

          {/* Profile Image & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Profile Image */}
            <div style={{margin : 'auto'}} className="relative lg:mx-0 w-80 h-80">
              <div className="absolute inset-0 bg-gradient-primary rounded-2xl rotate-6 glow-card"></div>
              <div className="relative bg-card rounded-2xl overflow-hidden border border-primary/20">
                <img src={ImageSrc} alt="Profile" className="h-[21vw] w-full" />
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glow-card p-4 text-center group hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="text-2xl font-bold hero-text mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t(stat.label)}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
