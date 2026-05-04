import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const NotFound = () => {
  const location = useLocation()

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname)
  }, [location.pathname])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4 text-primary">404</h1>
        <p className="text-lg text-muted-foreground mb-6">Page not found</p>
        <a href="/" className="text-primary hover:text-primary/80 underline underline-offset-4 font-medium">
          Return to Home
        </a>
      </div>
    </div>
  )
}

export default NotFound
