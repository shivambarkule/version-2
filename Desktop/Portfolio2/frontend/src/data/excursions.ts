export interface ExcursionData {
  id?: string;
  title: string;
  description: string;
  content?: string; // Blog content or detailed description
  images: string[]; // Array of image URLs
  orientation: 'portrait' | 'landscape' | 'square'; // Card orientation
  category?: string; // e.g., "Photography", "Blog", "Travel", "Nature"
  tags?: string[]; // Tags for filtering
  location?: string; // Location where photo/blog was taken
  date?: string; // Date of the excursion
  featured?: boolean; // Featured posts
  displayOrder?: number; // Order for display (lower = first)
  
  // Blog specific
  blogContent?: string; // Full blog post content (markdown or HTML)
  readTime?: number; // Estimated read time in minutes
  
  // Photography specific
  cameraSettings?: string; // Camera settings used
  equipment?: string[]; // Equipment used
  photoType?: string; // e.g., "Nature", "Portrait", "Street", "Architecture"
  
  // Additional metadata
  createdAt?: string;
  updatedAt?: string;
  viewCount?: number;
}

// Helper to generate URL-friendly slug from title
export function getExcursionSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

