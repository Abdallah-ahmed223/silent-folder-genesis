
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';

export default function AboutContent() {
  const { t } = useTranslation();

  return (
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
        <p>{t('about.paragraph1')}</p>
        <p>{t('about.paragraph2')}</p>
        <p>{t('about.paragraph3')}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button size="lg" className="glow-card">
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
  );
}
