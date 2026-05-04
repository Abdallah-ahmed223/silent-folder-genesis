import { useEffect, useRef } from 'react'
import { useSmoothScroll } from './SmoothScrollProvider'

export default function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null)
  const { lenis } = useSmoothScroll()

  useEffect(() => {
    if (!barRef.current) return

    const update = () => {
      if (!barRef.current) return
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      barRef.current.style.transform = `scaleX(${progress})`
    }

    if (lenis) {
      const onScroll = () => update()
      lenis.on('scroll', onScroll)
      update()
      return () => {
        lenis.off('scroll', onScroll)
      }
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [lenis])

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9997] pointer-events-none"
      style={{ height: '2px' }}
      aria-hidden
    >
      <div
        ref={barRef}
        className="h-full origin-left"
        style={{
          background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--neon-purple)))',
          transform: 'scaleX(0)',
          willChange: 'transform',
          transition: 'transform 80ms linear',
          boxShadow: '0 0 10px hsl(var(--primary) / 0.8)',
        }}
      />
    </div>
  )
}
