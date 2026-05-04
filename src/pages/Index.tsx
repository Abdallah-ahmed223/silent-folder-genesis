import { Suspense, lazy } from 'react'
import SideRailNav from '@/components/SideRailNav'
import PremiumHeroSection from '@/components/PremiumHeroSection'
import AboutSection from '@/components/AboutSection'
import SectionSkeleton from '@/components/SectionSkeleton'

const ExperienceSection = lazy(() => import('@/components/ExperienceSection'))
const ProjectsSection = lazy(() => import('@/components/ProjectsSection'))
const SkillsSection = lazy(() => import('@/components/SkillsSection'))
const ContactSection = lazy(() => import('@/components/ContactSection'))
const Footer = lazy(() => import('@/components/Footer'))

export default function Index() {
  return (
    <div className="min-h-screen bg-background font-exo overflow-x-hidden">
      <SideRailNav />
      <main>
        <PremiumHeroSection />
        <AboutSection />
        <Suspense fallback={<SectionSkeleton label="Loading experience" />}>
          <ExperienceSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton label="Loading projects" />}>
          <ProjectsSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton label="Loading skills" />}>
          <SkillsSection />
        </Suspense>
        <Suspense fallback={<SectionSkeleton label="Loading contact" />}>
          <ContactSection />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  )
}
