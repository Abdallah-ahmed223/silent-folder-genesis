
import { motion } from "framer-motion";
import ImageSrc from "@/images/me.webp";

export default function AboutProfile() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="space-y-8"
    >
      <div style={{margin : 'auto'}} className="relative lg:mx-0 w-80 h-80">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl rotate-6 glow-card"></div>
        <div className="relative bg-card rounded-2xl overflow-hidden border border-primary/20">
          <img src={ImageSrc} alt="Profile" className="h-[21vw] w-full" />
        </div>
      </div>
    </motion.div>
  );
}
