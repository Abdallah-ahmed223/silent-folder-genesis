import { Suspense, lazy } from 'react'
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import SpaceParticles from '@/components/SpaceParticles'

// Lazy load sections for better performance
const AboutSection = lazy(() => import('@/components/AboutSection'))
const ProjectsSection = lazy(() => import('@/components/ProjectsSection'))
const SkillsSection = lazy(() => import('@/components/SkillsSection'))
const ContactSection = lazy(() => import('@/components/ContactSection'))
const Footer = lazy(() => import('@/components/Footer'))

// Loading component for 3D scenes
function PageLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-primary font-medium">Loading Portfolio...</p>
      </div>
    </div>
  )
}

const Index = () => {
  return (
    <Suspense fallback={<PageLoading />}>
      <div className="min-h-screen bg-gradient-space relative overflow-hidden">
        {/* Animated space particles background */}
        <SpaceParticles />
        
        {/* Navigation */}
        <Navigation />
        
        {/* Hero Section */}
        <HeroSection />
        
        {/* Main Content Sections */}
        <Suspense fallback={
          <div className="h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4 nebula-pulse"></div>
              <p className="text-primary font-mono">LOADING COSMIC INTERFACE...</p>
            </div>
          </div>
        }>
          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
          <ContactSection />
          <Footer />
        </Suspense>
      </div>
    </Suspense>
  );
};

export default Index;
