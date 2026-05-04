import { useEffect, useRef, useState } from 'react'

export default function CustomCursor({ hidden = false }: { hidden?: boolean }) {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isTouch || reduced) return
    setEnabled(true)
  }, [])

  useEffect(() => {
    if (!enabled) return

    let mouseX = 0
    let mouseY = 0
    let dotX = 0
    let dotY = 0
    let ringX = 0
    let ringY = 0
    let raf = 0
    let isHovering = false

    const interactiveSelector = 'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]'

    const handleMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const handleOver = (e: MouseEvent) => {
      const target = e.target as Element
      const interactive = target?.closest?.(interactiveSelector)
      isHovering = !!interactive
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) scale(${
          isHovering ? 2.2 : 1
        })`
        ringRef.current.style.borderColor = isHovering ? 'hsl(var(--accent))' : 'hsl(var(--primary) / 0.6)'
      }
    }

    const tick = () => {
      dotX += (mouseX - dotX) * 0.6
      dotY += (mouseY - dotY) * 0.6
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) scale(${
          isHovering ? 2.2 : 1
        })`
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    window.addEventListener('mouseover', handleOver, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseover', handleOver)
      cancelAnimationFrame(raf)
    }
  }, [enabled])

  if (!enabled || hidden) return null

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[9999]"
        style={{
          background: 'hsl(var(--primary))',
          willChange: 'transform',
          mixBlendMode: 'difference',
        }}
        aria-hidden
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998] border"
        style={{
          borderColor: 'hsl(var(--primary) / 0.6)',
          borderWidth: '1.5px',
          willChange: 'transform, border-color',
          transition: 'border-color 200ms ease-out',
        }}
        aria-hidden
      />
    </>
  )
}
