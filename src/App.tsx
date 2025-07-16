import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Helmet } from "react-helmet";
import logoSrc from "@/images/logo.png";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Abdallah’s Portfolio</title>
      <meta
        name="description"
        content="Experienced front-end developer crafting responsive, SEO-optimized websites with a focus on UX design, branding, and WordPress customization."
      />
      <meta
        name="keywords"
        content="Abdallah Ahmed, Front-End Developer, HTML5, CSS3, JavaScript, React, Redux, Responsive Web Design, Mobile-First Development, Accessibility, ARIA, User Experience, Web Performance, SEO Optimization, Semantic HTML, WordPress, Elementor, Branding, Visual Identity, Design Systems, Cross-Browser Compatibility, Interactive Interfaces, Web Animations, Component-Based Architecture, React, Dynamic Metadata, Structured Data, Schema Markup, Canonical URLs, 301 Redirects, GDPR Compliance, Cookie Banners, Open Graph Tags, Twitter Card Integration, Portfolio Website, Personal Branding"
      />
      <meta name="author" content="Abdallah Ahmed" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <link rel="icon" href={logoSrc} />
      {/* Open Graph tags */}
      <meta property="og:title" content="Abdallah’s Portfolio" />
      <meta
        property="og:description"
        content="Custom web development portfolio by Abdallah, focused on SEO and UX optimization."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="http://mysite.com/example" />
      <meta
        property="og:image"
        content="http://mysite.com/images/preview.jpg"
      />
    </Helmet>
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
