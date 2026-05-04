import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'
import CustomCursor from '@/components/CustomCursor'
import ScrollProgressBar from '@/components/ScrollProgressBar'
import SiteLoader from '@/components/SiteLoader'
import { useInitialSiteLoad } from '@/hooks/useInitialSiteLoad'

const queryClient = new QueryClient()

const App = () => {
  const showLoader = useInitialSiteLoad()

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SmoothScrollProvider>
            <SiteLoader open={showLoader} />
            <ScrollProgressBar />
            <CustomCursor hidden={showLoader} />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </SmoothScrollProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
