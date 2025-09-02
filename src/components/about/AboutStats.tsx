
import { motion } from "framer-motion";
import { Calendar, Heart, MapPin, Download } from "lucide-react";
import { useTranslation } from 'react-i18next';

const stats = [
  { label: "about.stats.experience", value: "3+", icon: Calendar },
  { label: "about.stats.projects", value: "50+", icon: Heart },
  { label: "about.stats.clients", value: "25+", icon: MapPin },
  { label: "about.stats.technologies", value: "15+", icon: Download },
];

export default function AboutStats() {
  const { t } = useTranslation();

  return (
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
  );
}
