'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { onAuthStateChanged } from 'firebase/auth';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  query,
  orderBy,
  getDoc,
  setDoc
} from 'firebase/firestore';
import { auth, db, storage } from '@/lib/firebase';
import { ProjectData, DesignFile } from '@/data/projects';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const categories = [
  'Featured',
  'Machine Learning & AI',
  'Other Projects',
  'Web App',
  'Website',
  'Presentation',
  'Desktop App',
  'Mobile App',
  'Graphic',
  'Marketing',
];

const categoryMap: Record<string, string> = {
  'Web App': 'Web App',
  'Website': 'Website',
  'Desktop App': 'Desktop App',
  'Mobile App': 'Mobile App',
  'Presentation': 'Presentation',
  'Graphic': 'Graphic',
  'Marketing': 'Marketing',
  'Machine Learning & AI': 'Machine Learning & AI',
};

export default function WorkManagementPage() {
  const [projects, setProjects] = useState<(ProjectData & { id: string })[]>([]);
  const [availableTechStack, setAvailableTechStack] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [operation, setOperation] = useState<'add' | 'edit' | 'delete'>('add');
  const [selectedProject, setSelectedProject] = useState<(ProjectData & { id: string }) | null>(null);
  const [formData, setFormData] = useState<ProjectData & { screenshots: string[] }>({
    name: '',
    liveUrl: '',
    githubUrl: '',
    description: '',
    techStack: [],
    category: 'Website',
    featured: false,
    screenshots: [],
    projectType: '',
    status: '',
    startDate: '',
    endDate: '',
    duration: '',
    teamSize: '',
    client: '',
    keyFeatures: [],
    challenges: '',
    lessonsLearned: '',
    projectGoals: '',
    role: '',
    responsibilities: [],
    achievements: [],
    demoUrl: '',
    documentationUrl: '',
    // New fields
    graphicImages: [],
    designFiles: [],
    portfolioUrl: '',
    colorPalette: [],
    designStyle: '',
    graphicType: '',
    presentationUrl: '',
    presentationEmbed: '',
    presentationPdf: '',
    slideCount: undefined,
    presentationType: '',
    videoUrl: '',
    audioUrl: '',
    interactiveDemo: '',
    thumbnail: '',
    coverImage: '',
    tags: [],
    keywords: [],
    displayOrder: 0,
    relatedProjects: [],
    caseStudy: '',
    behanceUrl: '',
    dribbbleUrl: '',
    figmaUrl: '',
    linkedinUrl: '',
    twitterUrl: '',
  });
  const [screenshotInput, setScreenshotInput] = useState('');
  const [newTechInput, setNewTechInput] = useState('');
  const [keyFeatureInput, setKeyFeatureInput] = useState('');
  const [responsibilityInput, setResponsibilityInput] = useState('');
  const [achievementInput, setAchievementInput] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [uploading, setUploading] = useState(false);
  
  // New field inputs
  const [graphicImageInput, setGraphicImageInput] = useState('');
  const [colorInput, setColorInput] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [keywordInput, setKeywordInput] = useState('');
  const [designFileInput, setDesignFileInput] = useState({ name: '', url: '', type: '' });
  
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/admin');
      } else {
        loadProjects();
        loadTechStack();
      }
    });

    return () => unsubscribe();
  }, [router]);

  const loadProjects = async () => {
    try {
      const q = query(collection(db, 'projects'), orderBy('name'));
      const querySnapshot = await getDocs(q);
      const projectsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as (ProjectData & { id: string })[];
      setProjects(projectsData);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadTechStack = async () => {
    try {
      const techStackDoc = await getDoc(doc(db, 'settings', 'techStack'));
      if (techStackDoc.exists()) {
        setAvailableTechStack(techStackDoc.data().items || []);
      } else {
        // Initialize with common tech stack
        const defaultTech = [
          'Next.js', 'React', 'TypeScript', 'JavaScript', 'Node.js', 'Express',
          'HTML', 'CSS', 'Tailwind CSS', 'Python', 'Java', 'MongoDB', 'Firebase',
          'PostgreSQL', 'MySQL', 'Docker', 'AWS', 'Vercel', 'Git', 'GitHub'
        ];
        await setDoc(doc(db, 'settings', 'techStack'), { items: defaultTech });
        setAvailableTechStack(defaultTech);
      }
    } catch (error) {
      console.error('Error loading tech stack:', error);
    }
  };

  const addNewTechStack = async () => {
    if (newTechInput.trim() && !availableTechStack.includes(newTechInput.trim())) {
      const updated = [...availableTechStack, newTechInput.trim()].sort();
      await setDoc(doc(db, 'settings', 'techStack'), { items: updated });
      setAvailableTechStack(updated);
      setNewTechInput('');
    }
  };

  const handleCategoryChange = (category: string) => {
    if (category === 'Featured') {
      setFormData({ ...formData, featured: !formData.featured });
    } else {
      setSelectedCategories((prev) =>
        prev.includes(category)
          ? prev.filter((c) => c !== category)
          : [...prev, category]
      );
      if (!selectedCategories.includes(category) && categoryMap[category]) {
        setFormData({ ...formData, category: categoryMap[category] });
      }
    }
  };

  const handleAddTechStack = (tech: string) => {
    if (!formData.techStack.includes(tech)) {
      setFormData({
        ...formData,
        techStack: [...formData.techStack, tech],
      });
    }
  };

  const handleRemoveTechStack = (tech: string) => {
    setFormData({
      ...formData,
      techStack: formData.techStack.filter((t) => t !== tech),
    });
  };

  const handleAddScreenshot = () => {
    if (screenshotInput.trim()) {
      setFormData({
        ...formData,
        screenshots: [...formData.screenshots, screenshotInput.trim()],
      });
      setScreenshotInput('');
    }
  };

  const handleRemoveScreenshot = (index: number) => {
    setFormData({
      ...formData,
      screenshots: formData.screenshots.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const projectData = {
        ...formData,
        category: formData.category || 'Website',
        screenshots: formData.screenshots || [],
        updatedAt: new Date().toISOString(),
        ...(operation === 'add' && { createdAt: new Date().toISOString() }),
      };

      if (operation === 'add') {
        await addDoc(collection(db, 'projects'), projectData);
      } else if (operation === 'edit' && selectedProject) {
        await updateDoc(doc(db, 'projects', selectedProject.id), projectData);
      }

      resetForm();
      loadProjects();
      alert(`Project ${operation === 'add' ? 'added' : 'updated'} successfully!`);
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error saving project. Please try again.');
    }
  };

  const handleDelete = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      await deleteDoc(doc(db, 'projects', projectId));
      loadProjects();
      alert('Project deleted successfully!');
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Error deleting project. Please try again.');
    }
  };

  const handleEdit = (project: ProjectData & { id: string }) => {
    setSelectedProject(project);
    setOperation('edit');
    setFormData({
      name: project.name,
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      description: project.description,
      techStack: project.techStack || [],
      category: project.category,
      featured: project.featured || false,
      screenshots: (project as any).screenshots || [],
      projectType: project.projectType || '',
      status: project.status || '',
      startDate: project.startDate || '',
      endDate: project.endDate || '',
      duration: project.duration || '',
      teamSize: project.teamSize || '',
      client: project.client || '',
      keyFeatures: project.keyFeatures || [],
      challenges: project.challenges || '',
      lessonsLearned: project.lessonsLearned || '',
      projectGoals: project.projectGoals || '',
      role: project.role || '',
      responsibilities: project.responsibilities || [],
      achievements: project.achievements || [],
      demoUrl: project.demoUrl || '',
      documentationUrl: project.documentationUrl || '',
      // New fields
      graphicImages: project.graphicImages || [],
      designFiles: project.designFiles || [],
      portfolioUrl: project.portfolioUrl || '',
      colorPalette: project.colorPalette || [],
      designStyle: project.designStyle || '',
      graphicType: project.graphicType || '',
      presentationUrl: project.presentationUrl || '',
      presentationEmbed: project.presentationEmbed || '',
      presentationPdf: project.presentationPdf || '',
      slideCount: project.slideCount,
      presentationType: project.presentationType || '',
      videoUrl: project.videoUrl || '',
      audioUrl: project.audioUrl || '',
      interactiveDemo: project.interactiveDemo || '',
      thumbnail: project.thumbnail || '',
      coverImage: project.coverImage || '',
      tags: project.tags || [],
      keywords: project.keywords || [],
      displayOrder: project.displayOrder || 0,
      relatedProjects: project.relatedProjects || [],
      caseStudy: project.caseStudy || '',
      behanceUrl: project.behanceUrl || '',
      dribbbleUrl: project.dribbbleUrl || '',
      figmaUrl: project.figmaUrl || '',
      linkedinUrl: project.linkedinUrl || '',
      twitterUrl: project.twitterUrl || '',
    });
    const cats = [project.category];
    if (project.featured) cats.push('Featured');
    setSelectedCategories(cats);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      liveUrl: '',
      githubUrl: '',
      description: '',
      techStack: [],
      category: 'Website',
      featured: false,
      screenshots: [],
      projectType: '',
      status: '',
      startDate: '',
      endDate: '',
      duration: '',
      teamSize: '',
      client: '',
      keyFeatures: [],
      challenges: '',
      lessonsLearned: '',
      projectGoals: '',
      role: '',
      responsibilities: [],
      achievements: [],
      demoUrl: '',
      documentationUrl: '',
      // New fields
      graphicImages: [],
      designFiles: [],
      portfolioUrl: '',
      colorPalette: [],
      designStyle: '',
      graphicType: '',
      presentationUrl: '',
      presentationEmbed: '',
      presentationPdf: '',
      slideCount: undefined,
      presentationType: '',
      videoUrl: '',
      audioUrl: '',
      interactiveDemo: '',
      thumbnail: '',
      coverImage: '',
      tags: [],
      keywords: [],
      displayOrder: 0,
      relatedProjects: [],
      caseStudy: '',
      behanceUrl: '',
      dribbbleUrl: '',
      figmaUrl: '',
      linkedinUrl: '',
      twitterUrl: '',
    });
    setScreenshotInput('');
    setNewTechInput('');
    setKeyFeatureInput('');
    setResponsibilityInput('');
    setAchievementInput('');
    setGraphicImageInput('');
    setColorInput('');
    setTagInput('');
    setKeywordInput('');
    setDesignFileInput({ name: '', url: '', type: '' });
    setSelectedCategories([]);
    setSelectedProject(null);
    setOperation('add');
  };

  const handleAddKeyFeature = () => {
    if (keyFeatureInput.trim()) {
      setFormData({
        ...formData,
        keyFeatures: [...(formData.keyFeatures || []), keyFeatureInput.trim()],
      });
      setKeyFeatureInput('');
    }
  };

  const handleRemoveKeyFeature = (index: number) => {
    setFormData({
      ...formData,
      keyFeatures: (formData.keyFeatures || []).filter((_, i) => i !== index),
    });
  };

  const handleAddResponsibility = () => {
    if (responsibilityInput.trim()) {
      setFormData({
        ...formData,
        responsibilities: [...(formData.responsibilities || []), responsibilityInput.trim()],
      });
      setResponsibilityInput('');
    }
  };

  const handleRemoveResponsibility = (index: number) => {
    setFormData({
      ...formData,
      responsibilities: (formData.responsibilities || []).filter((_, i) => i !== index),
    });
  };

  const handleAddAchievement = () => {
    if (achievementInput.trim()) {
      setFormData({
        ...formData,
        achievements: [...(formData.achievements || []), achievementInput.trim()],
      });
      setAchievementInput('');
    }
  };

  const handleRemoveAchievement = (index: number) => {
    setFormData({
      ...formData,
      achievements: (formData.achievements || []).filter((_, i) => i !== index),
    });
  };

  // New handlers for graphics, presentations, and media
  const handleAddGraphicImage = () => {
    if (graphicImageInput.trim()) {
      setFormData({
        ...formData,
        graphicImages: [...(formData.graphicImages || []), graphicImageInput.trim()],
      });
      setGraphicImageInput('');
    }
  };

  const handleRemoveGraphicImage = (index: number) => {
    setFormData({
      ...formData,
      graphicImages: (formData.graphicImages || []).filter((_, i) => i !== index),
    });
  };

  const handleAddColor = () => {
    if (colorInput.trim()) {
      setFormData({
        ...formData,
        colorPalette: [...(formData.colorPalette || []), colorInput.trim()],
      });
      setColorInput('');
    }
  };

  const handleRemoveColor = (index: number) => {
    setFormData({
      ...formData,
      colorPalette: (formData.colorPalette || []).filter((_, i) => i !== index),
    });
  };

  const handleAddTag = () => {
    if (tagInput.trim()) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), tagInput.trim()],
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (index: number) => {
    setFormData({
      ...formData,
      tags: (formData.tags || []).filter((_, i) => i !== index),
    });
  };

  const handleAddKeyword = () => {
    if (keywordInput.trim()) {
      setFormData({
        ...formData,
        keywords: [...(formData.keywords || []), keywordInput.trim()],
      });
      setKeywordInput('');
    }
  };

  const handleRemoveKeyword = (index: number) => {
    setFormData({
      ...formData,
      keywords: (formData.keywords || []).filter((_, i) => i !== index),
    });
  };

  const handleAddDesignFile = () => {
    if (designFileInput.name && designFileInput.url && designFileInput.type) {
      setFormData({
        ...formData,
        designFiles: [...(formData.designFiles || []), { ...designFileInput }],
      });
      setDesignFileInput({ name: '', url: '', type: '' });
    }
  };

  const handleRemoveDesignFile = (index: number) => {
    setFormData({
      ...formData,
      designFiles: (formData.designFiles || []).filter((_, i) => i !== index),
    });
  };

  // Image upload handler
  const handleImageUpload = async (file: File, type: 'thumbnail' | 'cover' | 'screenshot' | 'graphic') => {
    if (!file) return;
    
    setUploading(true);
    try {
      const fileRef = ref(storage, `projects/${Date.now()}_${file.name}`);
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);
      
      if (type === 'thumbnail') {
        setFormData({ ...formData, thumbnail: downloadURL });
      } else if (type === 'cover') {
        setFormData({ ...formData, coverImage: downloadURL });
      } else if (type === 'screenshot') {
        setFormData({
          ...formData,
          screenshots: [...(formData.screenshots || []), downloadURL],
        });
      } else if (type === 'graphic') {
        setFormData({
          ...formData,
          graphicImages: [...(formData.graphicImages || []), downloadURL],
        });
      }
      
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  // Filter and search
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = searchQuery === '' || 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = filterCategory === 'all' || 
      (filterCategory === 'Featured' && project.featured) ||
      project.category === filterCategory ||
      (filterCategory === 'Machine Learning & AI' && (
        project.category === 'Machine Learning & AI' || 
        project.category === 'Machine Learning' || 
        project.category === 'ML & AI'
      ));
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryCounts = () => {
    const counts: Record<string, number> = {
      Featured: projects.filter((p) => p.featured).length,
      'Machine Learning & AI': projects.filter((p) => 
        p.category === 'Machine Learning & AI' || 
        p.category === 'Machine Learning' || 
        p.category === 'ML & AI'
      ).length,
      'Other Projects': projects.filter((p) => !p.featured).length,
      'Web App': projects.filter((p) => p.category === 'Web App').length,
      Website: projects.filter((p) => p.category === 'Website').length,
      'Desktop App': projects.filter((p) => p.category === 'Desktop App').length,
      'Mobile App': projects.filter((p) => p.category === 'Mobile App').length,
      Presentation: projects.filter((p) => p.category === 'Presentation').length,
      Graphic: projects.filter((p) => p.category === 'Graphic').length,
      Marketing: projects.filter((p) => p.category === 'Marketing').length,
    };
    return counts;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const counts = getCategoryCounts();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link href="/admin/dashboard" className="text-blue-600 hover:underline">
            ← Back to Dashboard
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-6">Work Management</h1>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Search & Filter</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Search Projects</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, description, or tags..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Filter by Category</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
        </div>

        {/* Category Checklist */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Project Categories</h2>
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <div
                key={category}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md"
              >
                <span className="font-medium">{category}</span>
                <span className="text-gray-600">{counts[category] || 0}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Operation Selection */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Select Operation</h2>
          <div className="flex gap-4">
            <button
              onClick={() => {
                resetForm();
                setOperation('add');
              }}
              className={`px-6 py-2 rounded-md transition-colors ${
                operation === 'add'
                  ? 'bg-black text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Add
            </button>
            <button
              onClick={() => setOperation('edit')}
              className={`px-6 py-2 rounded-md transition-colors ${
                operation === 'edit'
                  ? 'bg-black text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Edit
            </button>
            <button
              onClick={() => setOperation('delete')}
              className={`px-6 py-2 rounded-md transition-colors ${
                operation === 'delete'
                  ? 'bg-black text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Delete
            </button>
          </div>
        </div>

        {/* Form */}
        {(operation === 'add' || operation === 'edit') && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {operation === 'add' ? 'Add New Project' : 'Edit Project'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Project Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Live URL</label>
                <input
                  type="url"
                  value={formData.liveUrl}
                  onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">GitHub URL</label>
                <input
                  type="url"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  placeholder="https://github.com/..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={6}
                  placeholder="Detailed description of the project..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              {/* Tech Stack */}
              <div>
                <label className="block text-sm font-medium mb-2">Tech Stack *</label>
                <div className="mb-3">
                  <select
                    value=""
                    onChange={(e) => {
                      if (e.target.value) {
                        handleAddTechStack(e.target.value);
                        e.target.value = '';
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="">Select from available tech stack...</option>
                    {availableTechStack
                      .filter(tech => !formData.techStack.includes(tech))
                      .map((tech) => (
                        <option key={tech} value={tech}>
                          {tech}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newTechInput}
                    onChange={(e) => setNewTechInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addNewTechStack();
                      }
                    }}
                    placeholder="Add new tech stack option (press Enter)"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <button
                    type="button"
                    onClick={addNewTechStack}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add to Options
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-2"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => handleRemoveTechStack(tech)}
                        className="text-red-600 hover:text-red-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Screenshots */}
              <div>
                <label className="block text-sm font-medium mb-1">Screenshots (Multiple URLs)</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="url"
                    value={screenshotInput}
                    onChange={(e) => setScreenshotInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddScreenshot();
                      }
                    }}
                    placeholder="Add screenshot URL and press Enter"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <button
                    type="button"
                    onClick={handleAddScreenshot}
                    className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    Add
                  </button>
                </div>
                {formData.screenshots.length > 0 && (
                  <div className="space-y-2">
                    {formData.screenshots.map((url, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <img src={url} alt={`Screenshot ${index + 1}`} className="w-16 h-10 object-cover rounded" />
                        <span className="flex-1 text-sm text-gray-600 truncate">{url}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveScreenshot(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Category Selection</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center gap-2 p-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                    >
                      <input
                        type="checkbox"
                        checked={
                          category === 'Featured'
                            ? formData.featured
                            : selectedCategories.includes(category) ||
                              formData.category === categoryMap[category]
                        }
                        onChange={() => handleCategoryChange(category)}
                        className="rounded"
                      />
                      <span>{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Additional Project Information */}
              <div className="border-t pt-6 mt-6">
                <h3 className="text-lg font-semibold mb-4">Additional Project Information (Optional)</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Project Type</label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      <option value="">Select type...</option>
                      <option value="Personal">Personal</option>
                      <option value="Client">Client</option>
                      <option value="Open Source">Open Source</option>
                      <option value="Academic">Academic</option>
                      <option value="Freelance">Freelance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      <option value="">Select status...</option>
                      <option value="Active">Active</option>
                      <option value="Completed">Completed</option>
                      <option value="In Progress">In Progress</option>
                      <option value="On Hold">On Hold</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Start Date</label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">End Date</label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Duration</label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="e.g., 3 months, 6 weeks"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Team Size</label>
                    <input
                      type="text"
                      value={formData.teamSize}
                      onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                      placeholder="e.g., Solo, 2 members, 5 members"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Client/Company</label>
                    <input
                      type="text"
                      value={formData.client}
                      onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                      placeholder="Client or company name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Your Role</label>
                    <input
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="e.g., Full Stack Developer, Frontend Lead"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </div>

                {/* Key Features */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Key Features</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={keyFeatureInput}
                      onChange={(e) => setKeyFeatureInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddKeyFeature();
                        }
                      }}
                      placeholder="Add key feature and press Enter"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <button
                      type="button"
                      onClick={handleAddKeyFeature}
                      className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(formData.keyFeatures || []).map((feature, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 rounded-full text-sm flex items-center gap-2"
                      >
                        {feature}
                        <button
                          type="button"
                          onClick={() => handleRemoveKeyFeature(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Responsibilities */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Responsibilities</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={responsibilityInput}
                      onChange={(e) => setResponsibilityInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddResponsibility();
                        }
                      }}
                      placeholder="Add responsibility and press Enter"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <button
                      type="button"
                      onClick={handleAddResponsibility}
                      className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(formData.responsibilities || []).map((resp, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-100 rounded-full text-sm flex items-center gap-2"
                      >
                        {resp}
                        <button
                          type="button"
                          onClick={() => handleRemoveResponsibility(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Achievements</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={achievementInput}
                      onChange={(e) => setAchievementInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddAchievement();
                        }
                      }}
                      placeholder="Add achievement and press Enter"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <button
                      type="button"
                      onClick={handleAddAchievement}
                      className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(formData.achievements || []).map((achievement, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-100 rounded-full text-sm flex items-center gap-2"
                      >
                        {achievement}
                        <button
                          type="button"
                          onClick={() => handleRemoveAchievement(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Goals */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Project Goals</label>
                  <textarea
                    value={formData.projectGoals}
                    onChange={(e) => setFormData({ ...formData, projectGoals: e.target.value })}
                    rows={3}
                    placeholder="What were the main goals and objectives of this project?"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                {/* Challenges */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Challenges Faced</label>
                  <textarea
                    value={formData.challenges}
                    onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
                    rows={3}
                    placeholder="What challenges did you face during development?"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                {/* Lessons Learned */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Lessons Learned</label>
                  <textarea
                    value={formData.lessonsLearned}
                    onChange={(e) => setFormData({ ...formData, lessonsLearned: e.target.value })}
                    rows={3}
                    placeholder="What did you learn from this project?"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                {/* Additional URLs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Demo Video URL</label>
                    <input
                      type="url"
                      value={formData.demoUrl}
                      onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                      placeholder="https://youtube.com/..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Documentation URL</label>
                    <input
                      type="url"
                      value={formData.documentationUrl}
                      onChange={(e) => setFormData({ ...formData, documentationUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </div>
              </div>

              {/* Graphics & Design Section */}
              {(formData.category === 'Graphic' || formData.category === 'Marketing') && (
                <div className="border-t pt-6 mt-6">
                  <h3 className="text-lg font-semibold mb-4">Graphics & Design</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Graphic Type</label>
                      <select
                        value={formData.graphicType || ''}
                        onChange={(e) => setFormData({ ...formData, graphicType: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      >
                        <option value="">Select type...</option>
                        <option value="Logo">Logo</option>
                        <option value="Poster">Poster</option>
                        <option value="Branding">Branding</option>
                        <option value="Illustration">Illustration</option>
                        <option value="Infographic">Infographic</option>
                        <option value="Social Media">Social Media</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Design Style</label>
                      <input
                        type="text"
                        value={formData.designStyle || ''}
                        onChange={(e) => setFormData({ ...formData, designStyle: e.target.value })}
                        placeholder="e.g., Minimalist, Bold, Corporate"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Portfolio URL (Behance/Dribbble)</label>
                      <input
                        type="url"
                        value={formData.portfolioUrl || ''}
                        onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                        placeholder="https://behance.net/..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                  </div>

                  {/* Graphic Images */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Graphic Images</label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="url"
                        value={graphicImageInput}
                        onChange={(e) => setGraphicImageInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddGraphicImage();
                          }
                        }}
                        placeholder="Add graphic image URL and press Enter"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(file, 'graphic');
                        }}
                        className="hidden"
                        id="graphic-upload"
                      />
                      <label
                        htmlFor="graphic-upload"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
                      >
                        {uploading ? 'Uploading...' : 'Upload'}
                      </label>
                      <button
                        type="button"
                        onClick={handleAddGraphicImage}
                        className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                      >
                        Add URL
                      </button>
                    </div>
                    {formData.graphicImages && formData.graphicImages.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {formData.graphicImages.map((url, index) => (
                          <div key={index} className="relative group">
                            <img src={url} alt={`Graphic ${index + 1}`} className="w-full h-24 object-cover rounded" />
                            <button
                              type="button"
                              onClick={() => handleRemoveGraphicImage(index)}
                              className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Color Palette */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Color Palette</label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={colorInput}
                        onChange={(e) => setColorInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddColor();
                          }
                        }}
                        placeholder="Add color code (e.g., #FF5733) and press Enter"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      />
                      <button
                        type="button"
                        onClick={handleAddColor}
                        className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(formData.colorPalette || []).map((color, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 px-3 py-1 rounded-full text-sm"
                          style={{ backgroundColor: color, color: '#fff' }}
                        >
                          {color}
                          <button
                            type="button"
                            onClick={() => handleRemoveColor(index)}
                            className="text-white hover:text-red-200"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Design Files */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Design Source Files</label>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2">
                      <input
                        type="text"
                        value={designFileInput.name}
                        onChange={(e) => setDesignFileInput({ ...designFileInput, name: e.target.value })}
                        placeholder="File name"
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      />
                      <input
                        type="url"
                        value={designFileInput.url}
                        onChange={(e) => setDesignFileInput({ ...designFileInput, url: e.target.value })}
                        placeholder="File URL"
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      />
                      <select
                        value={designFileInput.type}
                        onChange={(e) => setDesignFileInput({ ...designFileInput, type: e.target.value })}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      >
                        <option value="">File type...</option>
                        <option value="Figma">Figma</option>
                        <option value="Adobe XD">Adobe XD</option>
                        <option value="Sketch">Sketch</option>
                        <option value="PSD">PSD</option>
                        <option value="AI">AI</option>
                        <option value="Other">Other</option>
                      </select>
                      <button
                        type="button"
                        onClick={handleAddDesignFile}
                        className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                      >
                        Add File
                      </button>
                    </div>
                    {formData.designFiles && formData.designFiles.length > 0 && (
                      <div className="space-y-2">
                        {formData.designFiles.map((file, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                            <span className="flex-1 text-sm">
                              <strong>{file.name}</strong> ({file.type})
                            </span>
                            <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                              View
                            </a>
                            <button
                              type="button"
                              onClick={() => handleRemoveDesignFile(index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Presentation Section */}
              {formData.category === 'Presentation' && (
                <div className="border-t pt-6 mt-6">
                  <h3 className="text-lg font-semibold mb-4">Presentation Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Presentation URL (Canva/Google Slides)</label>
                      <input
                        type="url"
                        value={formData.presentationUrl || ''}
                        onChange={(e) => setFormData({ ...formData, presentationUrl: e.target.value })}
                        placeholder="https://canva.com/..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Presentation Type</label>
                      <select
                        value={formData.presentationType || ''}
                        onChange={(e) => setFormData({ ...formData, presentationType: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      >
                        <option value="">Select type...</option>
                        <option value="Business">Business</option>
                        <option value="Pitch Deck">Pitch Deck</option>
                        <option value="Portfolio">Portfolio</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Educational">Educational</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Slide Count</label>
                      <input
                        type="number"
                        value={formData.slideCount || ''}
                        onChange={(e) => setFormData({ ...formData, slideCount: parseInt(e.target.value) || undefined })}
                        placeholder="Number of slides"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">PDF Download URL</label>
                      <input
                        type="url"
                        value={formData.presentationPdf || ''}
                        onChange={(e) => setFormData({ ...formData, presentationPdf: e.target.value })}
                        placeholder="https://..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Embed Code (Optional)</label>
                    <textarea
                      value={formData.presentationEmbed || ''}
                      onChange={(e) => setFormData({ ...formData, presentationEmbed: e.target.value })}
                      rows={3}
                      placeholder="Paste embed code here..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </div>
              )}

              {/* Media & Content Section */}
              <div className="border-t pt-6 mt-6">
                <h3 className="text-lg font-semibold mb-4">Media & Content</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Video URL</label>
                    <input
                      type="url"
                      value={formData.videoUrl || ''}
                      onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                      placeholder="https://youtube.com/..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Audio URL</label>
                    <input
                      type="url"
                      value={formData.audioUrl || ''}
                      onChange={(e) => setFormData({ ...formData, audioUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Interactive Demo URL</label>
                    <input
                      type="url"
                      value={formData.interactiveDemo || ''}
                      onChange={(e) => setFormData({ ...formData, interactiveDemo: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Display Order</label>
                    <input
                      type="number"
                      value={formData.displayOrder || 0}
                      onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
                      placeholder="Lower = first"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </div>

                {/* Thumbnail & Cover Image */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Thumbnail Image</label>
                    {formData.thumbnail && (
                      <img src={formData.thumbnail} alt="Thumbnail" className="w-full h-32 object-cover rounded mb-2" />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file, 'thumbnail');
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Cover Image</label>
                    {formData.coverImage && (
                      <img src={formData.coverImage} alt="Cover" className="w-full h-32 object-cover rounded mb-2" />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file, 'cover');
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </div>
              </div>

              {/* Tags & Keywords Section */}
              <div className="border-t pt-6 mt-6">
                <h3 className="text-lg font-semibold mb-4">Tags & Keywords</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Tags</label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddTag();
                          }
                        }}
                        placeholder="Add tag and press Enter"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      />
                      <button
                        type="button"
                        onClick={handleAddTag}
                        className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(formData.tags || []).map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-indigo-100 rounded-full text-sm flex items-center gap-2"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Keywords (SEO)</label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={keywordInput}
                        onChange={(e) => setKeywordInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddKeyword();
                          }
                        }}
                        placeholder="Add keyword and press Enter"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      />
                      <button
                        type="button"
                        onClick={handleAddKeyword}
                        className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(formData.keywords || []).map((keyword, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-teal-100 rounded-full text-sm flex items-center gap-2"
                        >
                          {keyword}
                          <button
                            type="button"
                            onClick={() => handleRemoveKeyword(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links Section */}
              <div className="border-t pt-6 mt-6">
                <h3 className="text-lg font-semibold mb-4">Social & Portfolio Links</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Behance URL</label>
                    <input
                      type="url"
                      value={formData.behanceUrl || ''}
                      onChange={(e) => setFormData({ ...formData, behanceUrl: e.target.value })}
                      placeholder="https://behance.net/..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Dribbble URL</label>
                    <input
                      type="url"
                      value={formData.dribbbleUrl || ''}
                      onChange={(e) => setFormData({ ...formData, dribbbleUrl: e.target.value })}
                      placeholder="https://dribbble.com/..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Figma URL</label>
                    <input
                      type="url"
                      value={formData.figmaUrl || ''}
                      onChange={(e) => setFormData({ ...formData, figmaUrl: e.target.value })}
                      placeholder="https://figma.com/..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">LinkedIn URL</label>
                    <input
                      type="url"
                      value={formData.linkedinUrl || ''}
                      onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                      placeholder="https://linkedin.com/..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Twitter/X URL</label>
                    <input
                      type="url"
                      value={formData.twitterUrl || ''}
                      onChange={(e) => setFormData({ ...formData, twitterUrl: e.target.value })}
                      placeholder="https://twitter.com/..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </div>
              </div>

              {/* Case Study Section */}
              <div className="border-t pt-6 mt-6">
                <h3 className="text-lg font-semibold mb-4">Case Study</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Case Study Content</label>
                  <textarea
                    value={formData.caseStudy || ''}
                    onChange={(e) => setFormData({ ...formData, caseStudy: e.target.value })}
                    rows={8}
                    placeholder="Write a detailed case study about this project..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <p className="text-xs text-gray-500 mt-1">Supports markdown formatting</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-black text-white rounded-md hover:bg-black/80 transition-colors"
                >
                  {operation === 'add' ? 'Add Project' : 'Update Project'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Delete Mode - Project List */}
        {operation === 'delete' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Select Project to Delete</h2>
            <div className="space-y-2">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex justify-between items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50"
                >
                  <div>
                    <h3 className="font-medium">{project.name}</h3>
                    <p className="text-sm text-gray-600">{project.category}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Edit Mode - Project List */}
        {operation === 'edit' && !selectedProject && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Select Project to Edit</h2>
            <div className="space-y-2">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex justify-between items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleEdit(project)}
                >
                  <div>
                    <h3 className="font-medium">{project.name}</h3>
                    <p className="text-sm text-gray-600">{project.category}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(project);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Projects List */}
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">All Projects ({filteredProjects.length} of {projects.length})</h2>
          <div className="space-y-2">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="p-4 border border-gray-200 rounded-md"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{project.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                        {project.category}
                      </span>
                      {project.featured && (
                        <span className="text-xs px-2 py-1 bg-yellow-100 rounded">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
