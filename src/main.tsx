import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(<App />)

if (import.meta.env.DEV) {
  import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
    const log = (label: string, color: string) => (m: { value: number; rating: string }) => {
      console.log(
        `%c${label}%c ${m.value.toFixed(2)}ms %c${m.rating}`,
        `background:${color};color:#fff;padding:2px 6px;border-radius:4px;font-weight:700`,
        'color:inherit;font-weight:700',
        `color:${m.rating === 'good' ? '#10b981' : m.rating === 'needs-improvement' ? '#f59e0b' : '#ef4444'}`,
      )
    }
    onLCP(log('LCP', '#3b82f6'))
    onCLS(log('CLS', '#a855f7'))
    onINP(log('INP', '#22d3ee'))
    onFCP(log('FCP', '#10b981'))
    onTTFB(log('TTFB', '#f59e0b'))
  })
}
