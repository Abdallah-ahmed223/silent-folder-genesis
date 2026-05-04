import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ImageSrc from "@/images/me.jpg";

export default function AboutProfile() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-2.5, 2.5]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative order-1 lg:order-2 w-full flex justify-center lg:justify-end lg:sticky lg:top-28"
      style={{ y }}
    >
      <motion.div
        style={{ rotate }}
        className="relative w-full max-w-[min(100%,420px)] sm:max-w-[480px] lg:max-w-[520px] aspect-[3/4] sm:aspect-[4/5]"
      >
        <div className="absolute -inset-3 sm:-inset-4 bg-gradient-to-br from-primary/25 via-accent/15 to-neon-purple/20 rounded-[1.75rem] blur-2xl opacity-90" />
        <div className="absolute inset-0 border border-primary/35 rounded-3xl rotate-[4deg] pointer-events-none" />
        <div className="relative h-full rounded-3xl overflow-hidden border border-primary/40 shadow-2xl shadow-primary/25 ring-1 ring-white/5 bg-card">
          <img
            src={ImageSrc}
            alt="Abdallah Ahmed"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-[center_30%]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
        </div>
      </motion.div>
    </motion.div>
  );
}
