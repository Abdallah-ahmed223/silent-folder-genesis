import {
  motion,
  useScroll,
  useTransform,
  useAnimationControls,
} from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Code2, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import HeroScene3D from "@/components/3d/HeroScene3D";
import SplineScene from "@/components/3d/SplineScene";
import { site } from "@/content/site";

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/abdallah-ahmed222",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/abdallah-ahmed-783512231/",
    label: "LinkedIn",
  },
  {
    icon: Mail,
    href: "mailto:abdallah.ahmed2022222@gmail.com",
    label: "Email",
  },
];

const techStack = [
  { name: "React", icon: Code2 },
  { name: "Vue 3", icon: Code2 },
  { name: "TypeScript", icon: Code2 },
  { name: "Next.js", icon: Zap },
];

/** Percent / corner positions — kept away from center headline on md+ */
const heroSkillSlots = [
  "top-[11%] left-[2%] sm:left-[4%] md:left-[6%] lg:left-[8%]",
  "top-[14%] right-[1%] sm:right-[3%] md:right-[5%] lg:top-[18%]",
  "bottom-[36%] left-[2%] sm:left-[3%] md:bottom-[30%] md:left-[5%]",
  "bottom-[14%] right-[1%] sm:bottom-[16%] sm:right-[3%] md:right-[6%]",
];

function FloatingHeroSkillCard({
  tech,
  index,
  slotClassName,
}: {
  tech: { name: string; icon: LucideIcon };
  index: number;
  slotClassName: string;
}) {
  const float = useAnimationControls();
  const dir = index % 2 === 0 ? 1 : -1;

  const startFloat = () =>
    float.start({
      y: [0, -8 * dir, 5, -7 * dir, 0],
      x: [0, 6 * dir, -4, 4 * dir, 0],
      rotate: [0, 0.9 * dir, -0.7 * dir, 0.5 * dir, 0],
      transition: {
        duration: 7 + index * 0.5,
        repeat: Infinity,
        ease: "easeInOut",
        repeatDelay: 0.2,
      },
    });

  useEffect(() => {
    void startFloat();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.55, delay: 0.9 + index * 0.12 }}
      className={cn("absolute z-10 pointer-events-auto", slotClassName)}
    >
      <motion.div
        animate={float}
        onHoverStart={() => float.stop()}
        onHoverEnd={() => void startFloat()}
        className="hero-skill-node hero-skill-node--compact group will-change-transform flex flex-row items-center gap-2 pl-2.5 pr-3 py-2 sm:pl-3 sm:pr-3.5 sm:py-2.5 max-w-[min(42vw,10.5rem)] sm:max-w-none"
        whileHover={{ scale: 1.06 }}
        transition={{ type: "spring", stiffness: 420, damping: 26 }}
        data-cursor="hover"
      >
        <div className="relative z-10 shrink-0 rounded-md border border-primary/35 bg-primary/12 p-1.5 shadow-[0_0_14px_-6px_hsl(var(--primary)/0.5)]">
          <tech.icon
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary"
            aria-hidden
          />
        </div>
        <p className="relative z-10 text-[11px] sm:text-xs font-semibold text-foreground font-neural leading-tight tracking-tight">
          {tech.name}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function PremiumHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const hasSplineHero = site.spline.heroScene.length > 0;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="section-stage relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 neural-grid opacity-20" />

      <motion.div
        className="absolute inset-0"
        style={{ scale: sceneScale, opacity: sceneOpacity }}
      >
        {hasSplineHero ? (
          <SplineScene
            scene={site.spline.heroScene}
            className="absolute inset-0 opacity-95"
            placeholderClassName="absolute inset-0"
            fallback={<HeroScene3D className="opacity-80" />}
            onLoad={(app: unknown) => {
              // Optional runtime variable if the scene defines it.
              const runtime = app as { setVariable?: (name: string, value: string) => void };
              runtime.setVariable?.("heroRole", site.hero.subtitle);
            }}
          />
        ) : (
          <HeroScene3D className="opacity-80" />
        )}
      </motion.div>

      <div className="absolute inset-0 bg-background/30 pointer-events-none z-[2]" />

      <motion.div
        className="absolute inset-0 z-[7] pointer-events-none"
        style={{ opacity: contentOpacity }}
        aria-label="Core technologies"
      >
        {techStack.map((tech, index) => (
          <FloatingHeroSkillCard
            key={tech.name}
            tech={tech}
            index={index}
            slotClassName={heroSkillSlots[index] ?? heroSkillSlots[0]!}
          />
        ))}
      </motion.div>

      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pointer-events-none"
        style={{ opacity: contentOpacity }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="space-y-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center pointer-events-auto"
          >
            <div className="identity-panel px-6 py-3 holographic">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-quantum-green rounded-full animate-pulse" />
                <span className="text-xs sm:text-sm font-neural text-accent font-code tracking-wider">
                  {site.hero.status}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            style={{ scale: titleScale, y: titleY }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="space-y-4"
          >
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-neural leading-[1.05] tracking-tight">
              <span className="block text-foreground">{site.hero.title}</span>
              <span className="block text-primary mt-2">
                {site.hero.subtitle}
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed pt-4"
            >
              {site.hero.description}
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pointer-events-auto"
          >
            <MagneticButton
              variant="secondary"
              size="lg"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group"
            >
              <span>{site.hero.viewWork}</span>
              <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
            </MagneticButton>

            <MagneticButton
              variant="secondary"
              size="lg"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              {site.hero.getInTouch}
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="flex justify-center gap-4 pointer-events-auto"
          >
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="premium-card p-3.5 group"
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
                data-cursor="hover"
              >
                <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                <span className="sr-only">{social.label}</span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2 }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-2 left-[49.4%] -translate-x-1/2 z-10 sm:bottom-4 md:bottom-5 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <div className="w-6 h-10 border-2 border-primary/40 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-primary rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-background/80 pointer-events-none z-[5]" />
    </section>
  );
}
