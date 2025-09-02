
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Languages } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { useTranslation } from "react-i18next";

const navItems = [
  { name: "nav.home", href: "#home", icon: "◉" },
  { name: "nav.about", href: "#about", icon: "◈" },
  { name: "nav.projects", href: "#projects", icon: "◊" },
  { name: "nav.skills", href: "#skills", icon: "◉" },
  { name: "nav.contact", href: "#contact", icon: "◈" },
];

export default function FloatingNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.substring(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const ThemeIcon = theme === "dark" ? Sun : Moon;

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  return (
    <>
      {/* Main Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
          scrolled
            ? "premium-card backdrop-blur-xl shadow-glow-primary"
            : "bg-transparent"
        }`}
        style={{
          background: scrolled 
            ? 'linear-gradient(90deg, hsl(var(--card) / 0.8), hsl(var(--card) / 0.6), hsl(var(--card) / 0.8))'
            : 'transparent'
        }}
      >
        <div className="px-6 py-3">
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="flex-shrink-0"
            >
              <div className="w-10 h-10 rounded-full neural-gradient flex items-center justify-center shadow-glow-primary">
                <span className="text-white font-bold font-neural">◉</span>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium font-neural transition-all duration-300 group ${
                    activeSection === item.href.substring(1)
                      ? 'text-primary shadow-glow-primary'
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-xs">{item.icon}</span>
                    {t(item.name)}
                  </span>
                  
                  {/* Active indicator */}
                  {activeSection === item.href.substring(1) && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 bg-primary/10 rounded-lg border border-primary/30"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  
                  {/* Hover effect */}
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </motion.a>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-3">
              <MagneticButton
                variant="secondary"
                size="sm"
                onClick={toggleLanguage}
                className="w-10 h-10 p-0 rounded-full"
                title={i18n.language === "en" ? "Switch to Arabic" : "Switch to English"}
              >
                <Languages className="h-4 w-4" />
              </MagneticButton>
              
              <MagneticButton
                variant="secondary"
                size="sm"
                onClick={() => {
                  const themes = ["light", "dark"] as const;
                  const currentIndex = themes.indexOf(theme);
                  const nextTheme = themes[(currentIndex + 1) % themes.length];
                  setTheme(nextTheme);
                }}
                className="w-10 h-10 p-0 rounded-full"
              >
                <ThemeIcon className="h-4 w-4" />
              </MagneticButton>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <MagneticButton
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-10 h-10 p-0 rounded-full"
                >
                  {isOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.95 }}
              animate={{ opacity: 1, height: "auto", scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="md:hidden premium-card mt-2 backdrop-blur-xl border-t border-primary/20"
            >
              <div className="px-4 py-3 space-y-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-sm">{item.icon}</span>
                    <span className="font-medium">{t(item.name)}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Floating Progress Indicator */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: scrolled ? 1 : 0, x: scrolled ? 0 : 50 }}
        className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40"
      >
        <div className="flex flex-col space-y-3">
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === item.href.substring(1)
                  ? 'bg-primary shadow-glow-primary scale-125'
                  : 'bg-muted-foreground/30 hover:bg-primary/60'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </motion.div>
    </>
  );
}
