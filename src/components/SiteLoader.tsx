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
          aria-label="Loading experience"
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
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative mb-7 h-[11rem] w-[11rem] flex items-center justify-center"
              aria-hidden
            >
              {!reduceMotion && (
                <>
                  <motion.div
                    className="absolute h-[10.4rem] w-[10.4rem] rounded-full border-2 border-primary/60"
                    animate={{ rotate: [0, 360] }}
                    transition={{ repeat: Infinity, duration: 3.4, ease: 'linear' }}
                    style={{ borderTopColor: 'transparent', borderLeftColor: 'transparent' }}
                  />
                  <motion.div
                    className="absolute h-[8.2rem] w-[8.2rem] rounded-full border-2 border-accent/70"
                    animate={{ rotate: [360, 0] }}
                    transition={{ repeat: Infinity, duration: 2.8, ease: 'linear' }}
                    style={{ borderBottomColor: 'transparent', borderRightColor: 'transparent' }}
                  />
                  <motion.div
                    className="absolute h-[6rem] w-[6rem] rounded-full border-2 border-neon-purple/65"
                    animate={{ rotate: [0, 360] }}
                    transition={{ repeat: Infinity, duration: 2.3, ease: 'linear' }}
                    style={{ borderTopColor: 'transparent', borderBottomColor: 'transparent' }}
                  />
                </>
              )}

              <motion.div
                className="h-4 w-4 rounded-full bg-primary shadow-[0_0_26px_hsl(var(--primary)/0.9)]"
                animate={!reduceMotion ? { scale: [1, 1.24, 1], opacity: [0.9, 0.45, 0.9] } : undefined}
                transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.4 }}
              className="text-[11px] sm:text-xs text-muted-foreground font-mono uppercase tracking-[0.28em] mb-6 text-center"
            >
              PREPARING EXPERIENCE
            </motion.p>

            <div className="identity-panel px-5 py-2.5 holographic w-full max-w-xs mb-6 flex items-center justify-center gap-2 border-primary/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-quantum-green" />
              </span>
              <span className="text-[10px] sm:text-xs font-neural text-accent font-code tracking-wider">
                LOADING SCENE
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

            <div className="mt-4 h-px w-20 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
