export interface ProjectData {
  name: string;
  liveUrl?: string;
  githubUrl: string;
  description: string;
  techStack: string[];
  category: string;
  featured?: boolean;
  screenshot?: string;
}

export const projectsData: ProjectData[] = [
  {
    name: "Swanthana Rehabilitation Centre",
    liveUrl: "https://swanthana-web.vercel.app/",
    githubUrl: "https://github.com/shivambarkule/swanthana-web",
    description: "Women-exclusive rehabilitation center website featuring comprehensive mental health services, de-addiction programs, psychiatric care, and trauma therapy with modern responsive design",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
    category: "Website",
    featured: true
  },
  {
    name: "XMB",
    liveUrl: "https://xmb-website.vercel.app/",
    githubUrl: "https://github.com/shivambarkule/XMB",
    description: "Professional manufacturing business website for Xtrawrkx—Next.js 14 SPA with TypeScript, Tailwind CSS, Framer Motion, and responsive design",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    category: "Website",
    featured: true
  },
  {
    name: "IndieCaters",
    liveUrl: "https://indiecaters.vercel.app/",
    githubUrl: "https://github.com/shivambarkule/indiecaters",
    description: "India's leading manufacturer of professional industrial indicators. Specializing in sterilization, moisture, and temperature monitoring solutions for healthcare, pharmaceutical, and manufacturing industries. Modern corporate website showcasing products, company information, and industry expertise.",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "JavaScript", "HTML5", "CSS3", "Vercel"],
    category: "Website",
    featured: true
  },
  {
    name: "Koshak Web",
    liveUrl: "https://koshak-web.vercel.app/",
    githubUrl: "https://github.com/Abhirajmaid/koshak-web",
    description: "Koshak Web is a modern web application built using Next.js and TypeScript, with a strong emphasis on performance and developer efficiency. The project leverages Tailwind CSS for rapid, utility-first styling, and features an optimized font system powered by Vercel's Geist. It serves as an excellent template and starting point for scalable, production-ready web solutions.",
    techStack: ["Next.js", "TypeScript", "CSS", "JavaScript", "Tailwind CSS", "Next.js Fonts (Geist)", "ESLint"],
    category: "Website",
    featured: true
  },
  {
    name: "Labyrinth",
    liveUrl: "https://labyrinth-db7a0.web.app",
    githubUrl: "https://github.com/shivambarkule/Labyrinth",
    description: "AI-powered admin exam management system with intelligent PDF question extraction, OpenAI GPT-3 integration, React + TypeScript frontend, and glassmorphism UI",
    techStack: ["React", "TypeScript", "Node.js", "Express", "PDF-Parse", "OpenAI GPT-3.5"],
    category: "Web App",
    featured: true
  },
  {
    name: "Personal Portfolio",
    liveUrl: "https://shivam-portfolio-e7a57.web.app",
    githubUrl: "https://github.com/shivambarkule/Personal_Portfolio",
    description: "Modern Next.js portfolio with 3D effects, animated city background, glassmorphism contact form, Matrix scroll effects, and interactive globe visualization",
    techStack: ["Next.js", "TypeScript", "CSS", "Framer Motion"],
    category: "Website",
    featured: true
  },
  {
    name: "Butterflies",
    liveUrl: "https://butterflies-c1d94.web.app",
    githubUrl: "https://github.com/shivambarkule/Butterflies",
    description: "Modern student exam portal with React + TypeScript, gamification, glassmorphism UI, real-time interactions, and comprehensive exam management",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Node.js", "Express", "MongoDB", "Firebase"],
    category: "Web App",
    featured: true
  },
  {
    name: "Dove",
    liveUrl: "https://project-classmates.web.app/login",
    githubUrl: "https://github.com/shivambarkule/Dove",
    description: "Location-based chat application with message delay mechanics — innovative geolocation-driven communication platform",
    techStack: ["JavaScript", "HTML", "CSS", "Firebase"],
    category: "Mobile App",
    featured: true
  },
  {
    name: "buybarbie",
    liveUrl: "https://ewebsite-591aa.web.app",
    githubUrl: "https://github.com/shivambarkule/buybarbie",
    description: "Demo Barbie selling website for kids",
    techStack: ["TypeScript", "HTML", "CSS", "JavaScript"],
    category: "Website",
    featured: true
  },
  {
    name: "XMB CRM System",
    githubUrl: "https://github.com/shivambarkule/XMB_CRM",
    description: "Customer Relationship Management (CRM) system for XMB — TypeScript-based customer management platform",
    techStack: ["TypeScript", "CSS", "JavaScript"],
    category: "Web App"
  },
  {
    name: "XMB SRM",
    githubUrl: "https://github.com/shivambarkule/XMB_SRM",
    description: "Supplier Relationship Management (SRM) portal for XMB — TypeScript-based supplier management system",
    techStack: ["TypeScript", "CSS", "JavaScript"],
    category: "Web App"
  },
  {
    name: "version-2",
    githubUrl: "https://github.com/shivambarkule/version-2",
    description: "XMB Version 2 — Modern Next.js corporate website with TypeScript, Tailwind CSS, professional images, and enhanced UI/UX",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    category: "Website"
  },
  {
    name: "Basic Calculator",
    githubUrl: "https://github.com/shivambarkule/Basic_Calculator",
    description: "Basic calculator program in Java",
    techStack: ["Java"],
    category: "Desktop App"
  },
  {
    name: "student",
    githubUrl: "https://github.com/shivambarkule/student",
    description: "Student management and learning system",
    techStack: ["JavaScript", "HTML", "CSS"],
    category: "Web App"
  },
  {
    name: "Suppliers_portal",
    githubUrl: "https://github.com/shivambarkule/Suppliers_portal",
    description: "Supplier management portal with comprehensive supplier relationship tools",
    techStack: ["JavaScript", "HTML", "CSS"],
    category: "Web App"
  }
];

export function getProjectsByCategory(category: string): ProjectData[] {
  return projectsData.filter(project => project.category === category);
}

export function getFeaturedProjects(): ProjectData[] {
  return projectsData.filter(project => project.featured);
}

export function getProjectByName(name: string): ProjectData | undefined {
  return projectsData.find(project => 
    project.name.toLowerCase().replace(/[_-]/g, '') === name.toLowerCase().replace(/[_-]/g, '')
  );
}