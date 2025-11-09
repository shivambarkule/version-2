import { collection, getDocs, query, orderBy, getDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import { ProjectData, projectsData } from '@/data/projects';
import { ExcursionData } from '@/data/excursions';

export interface AboutItem {
  id: string;
  type: 'skill' | 'publication' | 'experience' | 'education' | 'certificate';
  title: string;
  subtitle?: string;
  description?: string;
  url?: string;
  date?: string;
  category?: string;
  displayOrder?: number; // For ordering items (lower = first)
}

export interface AboutPageContent {
  profileImage?: string;
  introduction?: string;
  objective?: string;
  yearsExperience?: number;
  projectsCount?: number;
  certificationsCount?: number;
  publicationsCount?: number;
}

// Fetch projects from Firebase
export async function getFirebaseProjects(): Promise<ProjectData[]> {
  try {
    const q = query(collection(db, 'projects'), orderBy('name'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    })) as ProjectData[];
  } catch (error) {
    console.error('Error fetching projects from Firebase:', error);
    return [];
  }
}

// Get all projects (static + Firebase merged)
export async function getAllProjectsMerged(): Promise<ProjectData[]> {
  try {
    const firebaseProjects = await getFirebaseProjects();
    // Merge Firebase projects with static projects (avoid duplicates by name)
    const staticProjectNames = new Set(projectsData.map(p => p.name.toLowerCase()));
    const uniqueFirebaseProjects = firebaseProjects.filter(
      p => !staticProjectNames.has(p.name.toLowerCase())
    );
    return [...projectsData, ...uniqueFirebaseProjects];
  } catch (error) {
    console.error('Error merging projects:', error);
    // Fallback to static data on error
    return projectsData;
  }
}

// Get project by slug
export async function getProjectBySlug(slug: string): Promise<ProjectData | null> {
  try {
    const allProjects = await getAllProjectsMerged();
    const project = allProjects.find(p => {
      const projectSlug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      return projectSlug === slug;
    });
    return project || null;
  } catch (error) {
    console.error('Error fetching project by slug:', error);
    return null;
  }
}

// Fetch about items from Firebase
export async function getFirebaseAboutItems(): Promise<AboutItem[]> {
  try {
    const q = query(collection(db, 'about'), orderBy('type'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as AboutItem[];
  } catch (error) {
    console.error('Error fetching about items from Firebase:', error);
    return [];
  }
}


// Get all about items by type
export async function getAboutItemsByType(type: AboutItem['type']): Promise<AboutItem[]> {
  const allItems = await getFirebaseAboutItems();
  const filtered = allItems.filter(item => item.type === type);
  // Sort by displayOrder if available, otherwise keep original order
  filtered.sort((a, b) => {
    const orderA = a.displayOrder ?? 999;
    const orderB = b.displayOrder ?? 999;
    return orderA - orderB;
  });
  return filtered;
}

// Get about page content (profile image, paragraphs, stats)
export async function getAboutPageContent(): Promise<AboutPageContent> {
  try {
    const docRef = doc(db, 'settings', 'aboutPageContent');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as AboutPageContent;
    }
    return {};
  } catch (error) {
    console.error('Error fetching about page content:', error);
    return {};
  }
}

// Fetch excursions from Firebase
export async function getFirebaseExcursions(): Promise<(ExcursionData & { id: string })[]> {
  try {
    let querySnapshot;
    try {
      const q = query(collection(db, 'excursions'), orderBy('displayOrder', 'asc'));
      querySnapshot = await getDocs(q);
    } catch (orderError) {
      // If ordering fails (no index or no docs with displayOrder), get all docs
      console.warn('Could not order by displayOrder, fetching all documents:', orderError);
      querySnapshot = await getDocs(collection(db, 'excursions'));
    }
    
    const excursions = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as (ExcursionData & { id: string })[];
    
    // Sort manually to ensure proper ordering
    excursions.sort((a, b) => {
      const orderA = a.displayOrder ?? 999;
      const orderB = b.displayOrder ?? 999;
      return orderA - orderB;
    });
    
    return excursions;
  } catch (error) {
    console.error('Error fetching excursions from Firebase:', error);
    return [];
  }
}

// Get excursion by slug
export async function getExcursionBySlug(slug: string): Promise<(ExcursionData & { id: string }) | null> {
  try {
    const allExcursions = await getFirebaseExcursions();
    const excursion = allExcursions.find(e => {
      const excursionSlug = e.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      return excursionSlug === slug;
    });
    return excursion || null;
  } catch (error) {
    console.error('Error fetching excursion by slug:', error);
    return null;
  }
}


