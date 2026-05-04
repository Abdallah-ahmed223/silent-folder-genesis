import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { site } from '@/content/site'
import { useSmoothScroll } from './SmoothScrollProvider'

const navItems = [
  { id: 'home', label: site.nav.home, number: '01' },
  { id: 'about', label: site.nav.about, number: '02' },
  { id: 'experience', label: site.nav.experience, number: '03' },
  { id: 'projects', label: site.nav.projects, number: '04' },
  { id: 'skills', label: site.nav.skills, number: '05' },
  { id: 'contact', label: site.nav.contact, number: '06' },
]

export default function SideRailNav() {
  const [active, setActive] = useState('home')
  const [progress, setProgress] = useState(0)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { lenis, scrollTo } = useSmoothScroll()

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0)

      let current = 'home'
      for (const item of navItems) {
        const el = document.getElementById(item.id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= window.innerHeight * 0.4) current = item.id
      }
      setActive(current)
    }

    if (lenis) {
      lenis.on('scroll', update)
      update()
      return () => {
        lenis.off('scroll', update)
      }
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [lenis])

  const handleNavClick = (id: string) => {
    const target = document.getElementById(id)
    if (!target) return
    scrollTo(target, { offset: -20, duration: 1.2 })
    setMobileOpen(false)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="fixed top-6 left-6 z-[60] flex items-center gap-3 pointer-events-auto"
      >
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault()
            handleNavClick('home')
          }}
          className="group flex items-center gap-3"
          data-cursor="hover"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30">
            <span className="text-background font-black text-sm font-neural">AA</span>
            <motion.div
              className="absolute inset-0 rounded-xl border border-primary/40"
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-xs font-bold text-foreground tracking-wide">Abdallah Ahmed</span>
            <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
              Senior Frontend Engineer
            </span>
          </div>
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="fixed top-6 right-6 z-[60] flex items-center gap-3 pointer-events-auto"
      >
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/40 bg-card/40 backdrop-blur-md">
          <span className="font-mono text-xs text-primary font-bold">
            {navItems.find((n) => n.id === active)?.number ?? '01'}
          </span>
          <span className="text-xs text-muted-foreground">/</span>
          <span className="font-mono text-xs text-muted-foreground">06</span>
        </div>
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="lg:hidden w-9 h-9 rounded-full border border-border/40 bg-card/40 backdrop-blur-md flex items-center justify-center text-muted-foreground hover:text-primary"
          data-cursor="hover"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </motion.div>

      <motion.nav
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="fixed top-1/2 -translate-y-1/2 z-[55] hidden lg:flex flex-col items-end gap-3 pointer-events-auto right-6"
        aria-label="Section navigation"
      >
        <div
          className="absolute top-0 bottom-0 w-px bg-border/40"
          style={{ right: '13px' }}
          aria-hidden
        >
          <motion.div
            className="absolute top-0 left-0 right-0 origin-top"
            style={{
              background:
                'linear-gradient(to bottom, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--neon-purple)))',
              boxShadow: '0 0 8px hsl(var(--primary) / 0.6)',
              transform: `scaleY(${progress})`,
              transformOrigin: 'top',
              transition: 'transform 100ms linear',
              height: '100%',
              width: '100%',
            }}
          />
        </div>

        {navItems.map((item) => {
          const isActive = active === item.id
          const isHover = hoveredId === item.id
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative flex items-center gap-3 flex-row"
              data-cursor="hover"
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <AnimatePresence>
                {(isActive || isHover) && (
                  <motion.div
                    initial={{ opacity: 0, x: 10, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 10, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/80 backdrop-blur-md border border-primary/30 shadow-lg whitespace-nowrap"
                  >
                    <span className="font-mono text-[10px] text-primary font-bold">{item.number}</span>
                    <span className="text-xs font-medium text-foreground">{item.label}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <span className="relative w-7 h-7 flex items-center justify-center">
                <motion.span
                  className="absolute rounded-full"
                  animate={{
                    width: isActive ? 14 : isHover ? 12 : 10,
                    height: isActive ? 14 : isHover ? 12 : 10,
                    backgroundColor: isActive
                      ? 'hsl(var(--primary))'
                      : isHover
                        ? 'hsl(var(--accent))'
                        : 'hsl(var(--muted-foreground) / 0.3)',
                    boxShadow: isActive
                      ? '0 0 12px hsl(var(--primary)), 0 0 24px hsl(var(--primary) / 0.5)'
                      : isHover
                        ? '0 0 8px hsl(var(--accent) / 0.7)'
                        : 'none',
                  }}
                  transition={{ duration: 0.25 }}
                />
                {isActive && (
                  <motion.span
                    className="absolute rounded-full border-2"
                    style={{ borderColor: 'hsl(var(--primary))' }}
                    initial={{ width: 14, height: 14, opacity: 0.6 }}
                    animate={{ width: 28, height: 28, opacity: 0 }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                  />
                )}
              </span>
            </button>
          )
        })}
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 lg:hidden bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-6"
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                onClick={() => handleNavClick(item.id)}
                className="group flex items-center gap-4"
              >
                <span className="font-mono text-sm text-primary/60">{item.number}</span>
                <span
                  className={`text-3xl sm:text-4xl font-bold tracking-tight transition-colors ${
                    active === item.id ? 'text-primary' : 'text-foreground hover:text-primary'
                  }`}
                >
                  {item.label}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

