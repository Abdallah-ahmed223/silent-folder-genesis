
import Navigation from "@/components/Navigation";
import FloatingNavigation from "@/components/FloatingNavigation";
import PremiumHeroSection from "@/components/PremiumHeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground font-exo">
      <Navigation />
      <FloatingNavigation />
      <main>
        <PremiumHeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
