import { motion } from 'framer-motion'

interface SectionSkeletonProps {
  height?: string
  label?: string
}

export default function SectionSkeleton({ height = '100vh', label }: SectionSkeletonProps) {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: height }}
    >
      <div className="absolute inset-0 neural-grid opacity-10" />
      <motion.div
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        className="flex flex-col items-center gap-3"
      >
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        {label && (
          <span className="text-xs text-muted-foreground font-mono tracking-wider uppercase">{label}</span>
        )}
      </motion.div>
    </section>
  )
}
