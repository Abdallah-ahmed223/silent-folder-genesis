
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useGSAPScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sections = gsap.utils.toArray('.scroll-section');
    
    // Set up section-by-section scrolling
    sections.forEach((section: any, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onToggle: self => {
          if (self.isActive) {
            gsap.to(window, {
              scrollTo: { y: section, offsetY: 0 },
              duration: 1,
              ease: "power2.inOut"
            });
          }
        }
      });

      // Animate section content on entry
      gsap.fromTo(section.querySelector('.section-content'), 
        {
          opacity: 0,
          y: 50,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Add snap scrolling behavior
    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      if (isScrolling) return;
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const currentSection = Math.round(scrollTop / windowHeight);
        const targetSection = Math.min(Math.max(currentSection, 0), sections.length - 1);
        
        if (Math.abs(scrollTop - targetSection * windowHeight) > 50) {
          isScrolling = true;
          gsap.to(window, {
            scrollTo: { y: targetSection * windowHeight },
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
              isScrolling = false;
            }
          });
        }
      }, 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return { containerRef };
};
