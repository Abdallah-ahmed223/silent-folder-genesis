import { useEffect, useState } from 'react'

interface MousePos {
  x: number
  y: number
  /** Normalized [-0.5, 0.5] from viewport center */
  normX: number
  normY: number
}

/* Singleton state — one global listener serves every subscriber. */
const listeners = new Set<(p: MousePos) => void>()
let current: MousePos = { x: 0, y: 0, normX: 0, normY: 0 }
let installed = false
let raf = 0
let pendingX = 0
let pendingY = 0

function flush() {
  raf = 0
  current = {
    x: pendingX,
    y: pendingY,
    normX: pendingX / window.innerWidth - 0.5,
    normY: pendingY / window.innerHeight - 0.5,
  }
  listeners.forEach((cb) => cb(current))
}

function handleMove(e: MouseEvent) {
  pendingX = e.clientX
  pendingY = e.clientY
  if (!raf) raf = requestAnimationFrame(flush)
}

function install() {
  if (installed || typeof window === 'undefined') return
  installed = true
  window.addEventListener('mousemove', handleMove, { passive: true })
}

function uninstall() {
  if (!installed) return
  installed = false
  window.removeEventListener('mousemove', handleMove)
  if (raf) cancelAnimationFrame(raf)
  raf = 0
}

/**
 * Subscribes to the shared mouse position stream.
 * The component re-renders when the mouse moves (throttled to one render per frame).
 *
 * Pass a `factor` to scale the normalized position (handy for parallax intensity).
 */
export function useMousePosition(factor = 1): { x: number; y: number } {
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    install()
    const cb = (p: MousePos) => {
      setPos({ x: p.normX * factor * 100, y: p.normY * factor * 100 })
    }
    listeners.add(cb)
    return () => {
      listeners.delete(cb)
      if (listeners.size === 0) uninstall()
    }
  }, [factor])

  return pos
}
