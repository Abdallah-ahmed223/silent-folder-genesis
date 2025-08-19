
import { Suspense, lazy } from 'react'
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import SpaceParticles from '@/components/SpaceParticles'
import SmoothScrollContainer from '@/components/SmoothScrollContainer'

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
      <div className="min-h-screen bg-gradient-space relative">
        {/* Animated space particles background */}
        <SpaceParticles />
        
        {/* Navigation - Fixed position */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navigation />
        </div>
        
        {/* Hero Section - Full screen */}
        <section className="scroll-section min-h-screen w-screen flex-shrink-0">
          <div className="section-content h-full">
            <HeroSection />
          </div>
        </section>
        
        {/* Smooth scroll container for other sections */}
        <SmoothScrollContainer>
          <Suspense fallback={
            <div className="h-screen flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4 nebula-pulse"></div>
                <p className="text-primary font-mono">LOADING COSMIC INTERFACE...</p>
              </div>
            </div>
          }>
            <section className="scroll-section min-h-screen w-screen flex-shrink-0">
              <div className="section-content h-full">
                <AboutSection />
              </div>
            </section>
            
            <section className="scroll-section min-h-screen w-screen flex-shrink-0">
              <div className="section-content h-full">
                <ProjectsSection />
              </div>
            </section>
            
            <section className="scroll-section min-h-screen w-screen flex-shrink-0">
              <div className="section-content h-full">
                <SkillsSection />
              </div>
            </section>
            
            <section className="scroll-section min-h-screen w-screen flex-shrink-0">
              <div className="section-content h-full">
                <ContactSection />
              </div>
            </section>
            
            <section className="scroll-section min-h-screen w-screen flex-shrink-0">
              <div className="section-content h-full">
                <Footer />
              </div>
            </section>
          </Suspense>
        </SmoothScrollContainer>
      </div>
    </Suspense>
  );
};

export default Index;
