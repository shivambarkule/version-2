export interface ProjectData {
  name: string;
  liveUrl?: string;
  githubUrl?: string;
  description: string;
  techStack: string[];
  category: string;
  featured?: boolean;
  screenshots?: string[]; // Array of screenshot URLs
  // Additional optional fields
  projectType?: string; // Personal, Client, Open Source, etc.
  status?: string; // Active, Completed, In Progress, On Hold
  startDate?: string;
  endDate?: string;
  duration?: string; // e.g., "3 months", "6 weeks"
  teamSize?: string; // e.g., "Solo", "2 members", "5 members"
  client?: string; // Client/Company name
  keyFeatures?: string[]; // Array of key features
  challenges?: string; // Challenges faced during development
  lessonsLearned?: string; // Lessons learned from the project
  projectGoals?: string; // Project goals and objectives
  role?: string; // Your role in the project (e.g., "Full Stack Developer", "Frontend Lead")
  responsibilities?: string[]; // Array of responsibilities
  achievements?: string[]; // Array of achievements
  demoUrl?: string; // Demo video URL
  documentationUrl?: string; // Documentation link
  
  // Graphics & Design specific fields
  graphicImages?: string[]; // Array of graphic design image URLs
  designFiles?: DesignFile[]; // Design source files (Figma, Adobe, etc.)
  portfolioUrl?: string; // Behance, Dribbble, etc.
  colorPalette?: string[]; // Color codes used in the design
  designStyle?: string; // e.g., "Minimalist", "Bold", "Corporate"
  graphicType?: string; // e.g., "Logo", "Poster", "Branding", "Illustration"
  
  // Presentation specific fields
  presentationUrl?: string; // Canva, Google Slides, PowerPoint link
  presentationEmbed?: string; // Embed code for presentations
  presentationPdf?: string; // PDF download link
  slideCount?: number; // Number of slides
  presentationType?: string; // e.g., "Business", "Pitch Deck", "Portfolio"
  
  // Media & Content fields
  videoUrl?: string; // Video walkthrough or demo
  audioUrl?: string; // Audio narration or podcast
  interactiveDemo?: string; // Interactive demo URL
  thumbnail?: string; // Custom thumbnail image URL
  coverImage?: string; // Main cover/hero image
  
  // Organization & Discovery
  tags?: string[]; // Tags for better searchability
  keywords?: string[]; // SEO keywords
  displayOrder?: number; // Order for display (lower = first)
  relatedProjects?: string[]; // Related project names
  caseStudy?: string; // Full case study content (markdown or HTML)
  
  // Social & Links
  behanceUrl?: string;
  dribbbleUrl?: string;
  figmaUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  
  // Analytics & Tracking
  viewCount?: number; // View counter
  lastViewed?: string; // Last viewed timestamp
  createdAt?: string; // Creation timestamp
  updatedAt?: string; // Last update timestamp
}

export interface DesignFile {
  name: string;
  url: string;
  type: string; // "Figma", "Adobe XD", "Sketch", "PSD", "AI", etc.
  size?: string; // File size
}

// Empty array - all projects will be managed through admin panel
export const projectsData: ProjectData[] = [];

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

// Helper to generate URL-friendly slug from project name
export function getProjectSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}