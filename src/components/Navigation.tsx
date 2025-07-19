import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Monitor, Languages } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const navItems = [
  { name: "nav.home", href: "#home" },
  { name: "nav.about", href: "#about" },
  { name: "nav.projects", href: "#projects" },
  { name: "nav.skills", href: "#skills" },
  { name: "nav.contact", href: "#contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const ThemeIcon = theme === "dark" ? Sun : theme === "light" ? Moon : Monitor;

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/90 backdrop-blur-xl border-b border-primary/30 glow-card"
            : "bg-background/20 backdrop-blur-sm"
        }`}
        style={{
          background: scrolled 
            ? 'linear-gradient(90deg, hsl(var(--background) / 0.9), hsl(var(--background) / 0.8), hsl(var(--background) / 0.9))'
            : 'linear-gradient(90deg, hsl(var(--background) / 0.1), hsl(var(--background) / 0.05), hsl(var(--background) / 0.1))'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} className="flex-shrink-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full cosmic-gradient flex items-center justify-center">
                  <span className="text-white font-bold text-sm">◉</span>
                </div>
                <span className="text-2xl font-bold hero-text font-mono">
                  SPACE.DEV
                </span>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:block pe-[9vw]">
              <div className="flex items-baseline space-x-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 relative group"
                    onClick={() => setIsOpen(false)}
                  >
                     {t(item.name)}
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Language Toggle, Theme Toggle & Mobile Menu */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="rounded-full w-9 h-9 p-0"
                title={i18n.language === "en" ? "Switch to Arabic" : "Switch to English"}
              >
                <Languages className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const themes = ["light", "dark", "system"] as const;
                  const currentIndex = themes.indexOf(theme);
                  const nextTheme = themes[(currentIndex + 1) % themes.length];
                  setTheme(nextTheme);
                }}
                className="rounded-full w-9 h-9 p-0"
              >
                <ThemeIcon className="h-4 w-4" />
              </Button>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(!isOpen)}
                  className="rounded-full w-9 h-9 p-0"
                >
                  {isOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-background/95 backdrop-blur-lg border-t border-primary/20"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {t(item.name)}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer for fixed navigation */}
      <div className="h-16"></div>
    </>
  );
}
