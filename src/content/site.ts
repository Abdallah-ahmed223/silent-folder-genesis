export const site = {
  spline: {
    // Keep Spline only in Hero for now.
    heroScene: 'https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode',
    loaderScene: 'https://prod.spline.design/KFonZGtsoUXP-qx7/scene.splinecode',
  },
  nav: {
    home: 'Home',
    about: 'About',
    experience: 'Experience',
    projects: 'Projects',
    skills: 'Skills',
    contact: 'Contact',
  },
  hero: {
    status: 'OPEN TO WORK • AVAILABLE FOR PROJECTS',
    title: 'Abdallah Ahmed',
    subtitle: 'Senior Frontend Engineer',
    description:
      'I architect scalable, performant web applications with React, Vue 3, and TypeScript. 4+ years shipping enterprise ERP, SaaS, and AI-powered products.',
    viewWork: 'View Projects',
    getInTouch: 'Get In Touch',
  },
  about: {
    badge: 'ABOUT • WHO I AM',
    title: 'About',
    titleHighlight: 'Me',
    description:
      'Senior Frontend Engineer in Giza — multi-tenant ERP, SaaS, and high-performance interfaces with React, Vue 3, and TypeScript.',
    paragraph1:
      "I'm a Senior Frontend Engineer based in Giza, Egypt, with 4+ years of experience architecting multi-tenant ERP platforms, SaaS products, and AI-powered tooling.",
    paragraph2:
      'I specialize in React, Vue 3, and TypeScript — building scalable component architectures, design systems, and high-performance interfaces with Core Web Vitals scores in the 90s.',
    paragraph3:
      "I care about strict typing, clean abstractions, and shipping reliable software. Recently I've been deep in 3D web (React Three Fiber) and bilingual RTL/LTR systems serving real users in production.",
    downloadResume: 'Download CV',
    getInTouch: 'Get In Touch',
    stats: {
      experience: 'Years of Experience',
      projects: 'Production Projects',
      location: 'Based in Giza',
      technologies: 'Technologies Mastered',
    },
  },
  experience: {
    badge: 'EXPERIENCE • CAREER TIMELINE',
    title: "Where I've",
    titleHighlight: 'Built',
    description: 'Four roles. Real production systems serving real users.',
    present: 'Present',
    roles: {
      numo: {
        title: 'Senior Frontend Engineer',
        company: 'Numo Training',
        period: 'Apr 2025 — Present',
        type: 'Part-time',
        achievements: [
          'Architected Vue 3 + TypeScript SPA from scratch — scalable routing, lazy-loaded modules, reusable component patterns for an enterprise multi-tenant ERP platform.',
          'Enforced strict TypeScript (generics, utility types, discriminated unions), eliminating runtime data-shape bugs.',
          'Built a 30+ component design system (Tailwind CSS 4 + shadcn + Reka UI) with full RTL/LTR support across 10+ modules.',
          'Owned end-to-end feature delivery: API contract definition with Laravel backend → component build → production deployment.',
          'Implemented TanStack Query stale-while-revalidate caching, reducing redundant API calls by ~50%.',
        ],
      },
      santeon: {
        title: 'Mid-level Frontend Engineer',
        company: 'Santeon Inc.',
        period: 'Feb 2024 — Present',
        type: 'Full-time',
        achievements: [
          'Architected and owned frontend for 3+ enterprise React products — establishing component patterns, state management strategy, and module boundaries.',
          'Optimized Core Web Vitals via code splitting, lazy loading, and asset optimization — achieving sub-2s LCP and 90+ Lighthouse scores.',
          'Containerized build pipelines with Docker and integrated CI/CD workflow — reducing deployment time by 40%.',
          'Wrote Jest unit and integration tests maintaining 80%+ coverage on all critical business-logic modules.',
          'Applied security best practices: JWT refresh logic, role-based route guards, input sanitization, CSP headers.',
        ],
      },
      ilerra: {
        title: 'Frontend Developer',
        company: 'Ilerra',
        period: 'Feb 2023 — Jan 2024',
        type: 'Full-time',
        achievements: [
          'Translated high-fidelity Figma designs into responsive, accessible SPAs using React and Redux Toolkit.',
          'Defined API data contracts with the backend team — reducing integration rework across 4 product modules.',
          'Built reusable component library adopted across multiple teams, improving development velocity.',
        ],
      },
      motajer: {
        title: 'Frontend Developer Intern',
        company: 'Motajer',
        period: 'Aug 2022 — Dec 2022',
        type: 'Internship',
        achievements: [
          'Built custom e-commerce themes with Redux Toolkit state management, cart functionality, and responsive layouts.',
          'Translated design mockups into production-ready interactive web pages with cross-browser compatibility.',
        ],
      },
    },
  },
  projects: {
    badge: 'PROJECTS • SELECTED WORK',
    title: 'Selected',
    titleHighlight: 'Work',
    description: "Production systems I've architected, built, and shipped.",
    viewAll: 'View All',
    buttons: {
      code: 'View Code',
      live: 'Live Site',
    },
    items: {
      numoErp: {
        title: 'Numo ERP',
        description:
          'Multi-tenant Enterprise Resource Planning + SaaS platform. Architected a multi-tenant SPA with isolated tenant workspaces, super-admin module, full CRM/HR modules, and a 30+ component design system with RTL/LTR i18n.',
      },
      modelEditor: {
        title: '3D Model Editor',
        description:
          'Browser-based glTF scene editor with real-time transform controls, material property editing, declarative 3D scenes via React Three Fiber + Drei (orbit controls, lighting, shadows), and Zustand-powered undo/redo.',
      },
      tms: {
        title: 'TMS Admin Dashboard',
        description:
          'Real-time admin dashboard for full eSIM lifecycle management — plan assignment, bundle configuration, balance recharging, usage history tracking, with role-based access control restricting sensitive actions.',
      },
      ideaConsult: {
        title: 'Idea-consult AI Platform',
        description:
          'AI-powered market intelligence platform that generates AI-driven market reports and tailored business plans with a dynamic tool integration. Optimized Core Web Vitals + on-page SEO strategy.',
      },
    },
  },
  skills: {
    badge: 'SKILLS • TECHNICAL STACK',
    title: 'Tech',
    titleHighlight: 'Stack',
    description: 'Tools I use every day to ship production software.',
    categories: {
      frameworks: 'Frameworks',
      stateData: 'State & Data',
      styling: 'Styling & Design Systems',
      devops: 'DevOps & Testing',
    },
    stats: {
      experience: 'Years Building',
      projects: 'Production Apps',
      technologies: 'Technologies',
      satisfaction: 'Test Coverage',
    },
  },
  seo: {
    title: 'Abdallah Ahmed — Senior Frontend Engineer',
    description:
      'Senior Frontend Engineer with 4+ years building scalable enterprise React, Vue 3, and TypeScript applications. Multi-tenant ERP, SaaS, and AI-powered products.',
    siteName: 'Abdallah Ahmed Portfolio',
    author: 'Abdallah Ahmed',
    jobTitle: 'Senior Frontend Engineer',
  },
  contact: {
    badge: "CONTACT • LET'S TALK",
    title: "Let's Build",
    titleHighlight: 'Together',
    description:
      "Have a project in mind, or looking for a senior frontend engineer? I'd love to hear about it.",
    letsConnect: "Let's Connect",
    connectDescription:
      "Whether you have an idea you want to ship, an existing product to scale, or a team you want to strengthen, I'm available for senior frontend roles and contract work.",
    followMe: 'Find Me Online',
    sendMessage: 'Send a Message',
    form: {
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
      send: 'Send Message',
      placeholders: {
        firstName: 'Your first name',
        lastName: 'Your last name',
        email: 'you@company.com',
        subject: "What's this about?",
        message: 'Tell me about your project...',
      },
    },
    info: {
      email: 'Email',
      phone: 'Phone',
      location: 'Location',
    },
  },
} as const

export type Site = typeof site
