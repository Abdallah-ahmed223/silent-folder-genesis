import { useEffect, useState } from 'react'

const MIN_VISIBLE_MS = 850
const CHUNK_PRELOAD_TIMEOUT_MS = 8000

function whenDocumentComplete(): Promise<void> {
  if (document.readyState === 'complete') return Promise.resolve()
  return new Promise((resolve) => {
    window.addEventListener('load', () => resolve(), { once: true })
  })
}

async function whenFontsReady(): Promise<void> {
  try {
    if (document.fonts?.ready) await document.fonts.ready
  } catch {
    /* ignore */
  }
}

function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = window.setTimeout(() => {
      reject(new Error('Preload timeout'))
    }, timeoutMs)

    promise
      .then((value) => {
        window.clearTimeout(timer)
        resolve(value)
      })
      .catch((error) => {
        window.clearTimeout(timer)
        reject(error)
      })
  })
}

async function preloadCriticalChunks(): Promise<void> {
  // Preload sections and heavy 3D scene so Skills appears instantly on first scroll.
  const preloadTask = Promise.allSettled([
    import('../components/ExperienceSection'),
    import('../components/ProjectsSection'),
    import('../components/SkillsSection'),
    import('../components/ContactSection'),
    import('../components/Footer'),
    import('../components/3d/SkillsGlobe3D'),
  ])

  try {
    await withTimeout(preloadTask, CHUNK_PRELOAD_TIMEOUT_MS)
  } catch {
    // If preloading takes too long, continue to avoid loader lock.
  }
}

/**
 * Full-screen loader gate: fonts + window load + critical chunk preload,
 * with a minimum display time.
 */
export function useInitialSiteLoad() {
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    let cancelled = false
    const t0 = performance.now()

    const reveal = () => {
      const elapsed = performance.now() - t0
      const wait = Math.max(0, MIN_VISIBLE_MS - elapsed)
      window.setTimeout(() => {
        if (!cancelled) {
          setShowLoader(false)
          document.body.style.overflow = ''
        }
      }, wait)
    }

    document.body.style.overflow = 'hidden'

    void (async () => {
      await Promise.all([whenFontsReady(), whenDocumentComplete(), preloadCriticalChunks()])
      if (!cancelled) reveal()
    })()

    return () => {
      cancelled = true
      document.body.style.overflow = ''
    }
  }, [])

  return showLoader
}
