import { ReactNode, useEffect, useRef, useState } from 'react'

interface LazyMountProps {
  children: ReactNode
  /** Render placeholder height while children are not yet mounted */
  placeholderClassName?: string
  /** rootMargin for the IntersectionObserver — start loading early */
  rootMargin?: string
  /** Once mounted, never unmount (default true) */
  once?: boolean
  fallback?: ReactNode
}

export default function LazyMount({
  children,
  placeholderClassName = '',
  rootMargin = '200px',
  once = true,
  fallback = null,
}: LazyMountProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [intersecting, setIntersecting] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true)
          setIntersecting(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setIntersecting(false)
        }
      },
      { rootMargin, threshold: 0.01 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin, once])

  return (
    <div ref={ref} className={placeholderClassName} data-mounted={mounted} data-visible={intersecting}>
      {mounted ? children : fallback}
    </div>
  )
}

/**
 * Hook variant: returns whether the element is currently in view.
 * Useful for toggling R3F frameloop="always" / "never".
 */
export function useInView(rootMargin = '0px', threshold = 0.01) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin, threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin, threshold])

  return [ref, inView] as const
}
