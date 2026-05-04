import { useEffect, useState } from 'react'

const MIN_VISIBLE_MS = 850

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

/**
 * Full-screen loader gate: fonts + window load, with a minimum display time.
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
      await Promise.all([whenFontsReady(), whenDocumentComplete()])
      if (!cancelled) reveal()
    })()

    return () => {
      cancelled = true
      document.body.style.overflow = ''
    }
  }, [])

  return showLoader
}
