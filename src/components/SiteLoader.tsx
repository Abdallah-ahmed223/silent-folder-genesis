import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

interface SiteLoaderProps {
  open: boolean
}

export default function SiteLoader({ open }: SiteLoaderProps) {
  const reduceMotion = useReducedMotion()

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="site-loader"
          role="status"
          aria-live="polite"
          aria-busy="true"
          aria-label="Loading portfolio"
          className="fixed inset-0 z-[11000] flex flex-col items-center justify-center cursor-wait bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.2 : 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="absolute inset-0 neural-grid opacity-[0.12] pointer-events-none"
            aria-hidden
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 80% 60% at 50% 35%, hsl(var(--primary) / 0.08), transparent 55%), radial-gradient(ellipse 70% 50% at 50% 100%, hsl(var(--accent) / 0.06), transparent 50%)',
            }}
            aria-hidden
          />

          <div className="relative z-10 flex flex-col items-center px-6 max-w-md w-full">
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative mb-8"
            >
              <div className="relative w-[4.5rem] h-[4.5rem] rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/40">
                <span className="text-background font-black text-2xl font-neural tracking-tight">AA</span>
                {!reduceMotion && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-primary/50"
                    animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.4 }}
              className="text-xl sm:text-2xl font-bold text-foreground font-neural tracking-tight text-center mb-1"
            >
              Abdallah Ahmed
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.4 }}
              className="text-[10px] sm:text-xs text-muted-foreground font-mono uppercase tracking-[0.2em] mb-8 text-center"
            >
              Senior Frontend Engineer
            </motion.p>

            <div className="premium-card px-5 py-2.5 holographic w-full max-w-xs mb-8 flex items-center justify-center gap-2 border-primary/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-quantum-green" />
              </span>
              <span className="text-[10px] sm:text-xs font-neural text-accent font-code tracking-wider">
                INITIALIZING INTERFACE
              </span>
            </div>

            <div className="w-full max-w-xs h-1 rounded-full bg-muted/50 overflow-hidden border border-border/40">
              {!reduceMotion ? (
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-neon-purple"
                  style={{ width: '45%' }}
                  animate={{ x: ['-120%', '280%'] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.35,
                    ease: 'linear',
                  }}
                />
              ) : (
                <div className="h-full w-2/5 rounded-full bg-gradient-to-r from-primary to-accent mx-auto" />
              )}
            </div>

            <p className="mt-4 text-[10px] text-muted-foreground/70 font-mono tracking-widest uppercase">
              Portfolio v1
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
