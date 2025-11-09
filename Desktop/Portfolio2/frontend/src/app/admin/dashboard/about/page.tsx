'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { 
  collection, 
  getDocs, 
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  query,
  orderBy 
} from 'firebase/firestore';
import { auth, db, storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Link from 'next/link';

interface AboutItem {
  id?: string;
  type: 'skill' | 'publication' | 'experience' | 'education' | 'certificate';
  title: string;
  subtitle?: string;
  description?: string;
  url?: string;
  date?: string;
  category?: string;
  displayOrder?: number;
}

interface AboutPageContent {
  profileImage?: string;
  introduction?: string;
  objective?: string;
  yearsExperience?: number;
  projectsCount?: number;
  certificationsCount?: number;
  publicationsCount?: number;
}

export default function AboutManagementPage() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<(AboutItem & { id: string })[]>([]);
  const [operation, setOperation] = useState<'add' | 'edit' | 'delete'>('add');
  const [selectedType, setSelectedType] = useState<'skill' | 'publication' | 'experience' | 'education' | 'certificate' | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<(AboutItem & { id: string }) | null>(null);
  const [addPosition, setAddPosition] = useState<'top' | 'bottom'>('top');
  const [uploading, setUploading] = useState(false);
  const [pageContent, setPageContent] = useState<AboutPageContent>({});
  const [formData, setFormData] = useState<AboutItem>({
    type: 'skill',
    title: '',
    subtitle: '',
    description: '',
    url: '',
    date: '',
    category: '',
    displayOrder: 0,
  });
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/admin');
      } else {
        loadItems();
        loadPageContent();
      }
    });

    return () => unsubscribe();
  }, [router]);

  const loadPageContent = async () => {
    try {
      const docRef = doc(db, 'settings', 'aboutPageContent');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPageContent(docSnap.data() as AboutPageContent);
      }
    } catch (error) {
      console.error('Error loading page content:', error);
    }
  };

  const loadItems = async () => {
    try {
      const q = query(collection(db, 'about'), orderBy('type'));
      const querySnapshot = await getDocs(q);
      const itemsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as (AboutItem & { id: string })[];
      setItems(itemsData);
    } catch (error) {
      console.error('Error loading items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (operation === 'add') {
        // Calculate displayOrder based on position preference
        const itemsOfSameType = items.filter(item => item.type === formData.type);
        let displayOrder = 0;
        
        if (addPosition === 'top') {
          // Add at top: find minimum order and subtract 1
          const minOrder = itemsOfSameType.length > 0 
            ? Math.min(...itemsOfSameType.map(i => i.displayOrder ?? 999))
            : 0;
          displayOrder = minOrder - 1;
        } else {
          // Add at bottom: find maximum order and add 1
          const maxOrder = itemsOfSameType.length > 0
            ? Math.max(...itemsOfSameType.map(i => i.displayOrder ?? 0))
            : -1;
          displayOrder = maxOrder + 1;
        }
        
        await addDoc(collection(db, 'about'), {
          ...formData,
          displayOrder,
        });
        alert('Item added successfully!');
      } else if (operation === 'edit' && selectedItem) {
        await updateDoc(doc(db, 'about', selectedItem.id), formData);
        alert('Item updated successfully!');
      }
      resetForm();
      loadItems();
    } catch (error) {
      console.error(`Error ${operation === 'add' ? 'adding' : 'updating'} item:`, error);
      alert(`Error ${operation === 'add' ? 'adding' : 'updating'} item. Please try again.`);
    }
  };

  const handleImageUpload = async (file: File) => {
    if (!file) return;
    
    setUploading(true);
    try {
      const fileRef = ref(storage, `about/profile/${Date.now()}_${file.name}`);
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);
      
      const updatedContent = { ...pageContent, profileImage: downloadURL };
      await setDoc(doc(db, 'settings', 'aboutPageContent'), updatedContent, { merge: true });
      setPageContent(updatedContent);
      
      alert('Profile image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSavePageContent = async () => {
    try {
      await setDoc(doc(db, 'settings', 'aboutPageContent'), pageContent, { merge: true });
      alert('Page content saved successfully!');
    } catch (error) {
      console.error('Error saving page content:', error);
      alert('Error saving page content. Please try again.');
    }
  };

  const handleDelete = async (itemId: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      await deleteDoc(doc(db, 'about', itemId));
      loadItems();
      alert('Item deleted successfully!');
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Error deleting item. Please try again.');
    }
  };

  const handleEdit = (item: AboutItem & { id: string }) => {
    setSelectedItem(item);
    setOperation('edit');
    setSelectedType(item.type);
    setFormData({
      type: item.type,
      title: item.title,
      subtitle: item.subtitle || '',
      description: item.description || '',
      url: item.url || '',
      date: item.date || '',
      category: item.category || '',
      displayOrder: item.displayOrder ?? 0,
    });
  };

  const resetForm = () => {
    setFormData({
      type: selectedType || 'skill',
      title: '',
      subtitle: '',
      description: '',
      url: '',
      date: '',
      category: '',
      displayOrder: 0,
    });
    setSelectedItem(null);
    setOperation('add');
  };

  const handleTypeSelect = (type: 'skill' | 'publication' | 'experience' | 'education' | 'certificate') => {
    setSelectedType(type);
    if (operation === 'add') {
      setFormData({
        ...formData,
        type,
      });
    }
  };

  // Filter and search
  const filteredItems = items.filter((item) => {
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filterType === 'all' || item.type === filterType;
    
    return matchesSearch && matchesType;
  });

  const getTypeCounts = () => {
    return {
      all: items.length,
      skill: items.filter(i => i.type === 'skill').length,
      publication: items.filter(i => i.type === 'publication').length,
      experience: items.filter(i => i.type === 'experience').length,
      education: items.filter(i => i.type === 'education').length,
      certificate: items.filter(i => i.type === 'certificate').length,
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/admin/dashboard" className="text-blue-600 hover:underline">
            ← Back to Dashboard
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-6">About Page Management</h1>
        <p className="text-gray-600 mb-8">
          Manage entries for Skills, Publications, Experience, Education, and Certificates sections.
        </p>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Search & Filter</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Search Items</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, description, or category..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Filter by Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="all">All Types</option>
                <option value="skill">Skills</option>
                <option value="publication">Publications</option>
                <option value="experience">Experience</option>
                <option value="education">Education</option>
                <option value="certificate">Certificates</option>
              </select>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Showing {filteredItems.length} of {items.length} items
          </p>
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
              onClick={() => {
                resetForm();
                setOperation('edit');
              }}
              className={`px-6 py-2 rounded-md transition-colors ${
                operation === 'edit'
                  ? 'bg-black text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Edit
            </button>
            <button
              onClick={() => {
                resetForm();
                setOperation('delete');
              }}
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

        {/* About Page Content Management */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">About Page Content</h2>
          
          {/* Profile Image */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Profile Image</label>
            {pageContent.profileImage && (
              <img 
                src={pageContent.profileImage} 
                alt="Profile" 
                className="w-32 h-40 object-cover rounded mb-2 border border-gray-200"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            {uploading && <p className="text-sm text-gray-600 mt-1">Uploading...</p>}
          </div>

          {/* Introduction */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Introduction Paragraph</label>
            <textarea
              value={pageContent.introduction || ''}
              onChange={(e) => setPageContent({ ...pageContent, introduction: e.target.value })}
              rows={3}
              placeholder="Hi! This is Shivam Barkule. You can call me Shivam :)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Objective */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Objective Paragraph</label>
            <textarea
              value={pageContent.objective || ''}
              onChange={(e) => setPageContent({ ...pageContent, objective: e.target.value })}
              rows={5}
              placeholder="Engineering student passionate about..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Numeric Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Years Experience</label>
              <input
                type="number"
                value={pageContent.yearsExperience || ''}
                onChange={(e) => setPageContent({ ...pageContent, yearsExperience: parseInt(e.target.value) || undefined })}
                placeholder="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Projects Count</label>
              <input
                type="number"
                value={pageContent.projectsCount || ''}
                onChange={(e) => setPageContent({ ...pageContent, projectsCount: parseInt(e.target.value) || undefined })}
                placeholder="10"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Certifications Count</label>
              <input
                type="number"
                value={pageContent.certificationsCount || ''}
                onChange={(e) => setPageContent({ ...pageContent, certificationsCount: parseInt(e.target.value) || undefined })}
                placeholder="6"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Publications Count</label>
              <input
                type="number"
                value={pageContent.publicationsCount || ''}
                onChange={(e) => setPageContent({ ...pageContent, publicationsCount: parseInt(e.target.value) || undefined })}
                placeholder="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          <button
            onClick={handleSavePageContent}
            className="px-6 py-2 bg-black text-white rounded-md hover:bg-black/80 transition-colors"
          >
            Save Page Content
          </button>
        </div>

        {/* Type Counts */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Item Counts by Type</h2>
          <div className="flex flex-wrap gap-4">
            {Object.entries(getTypeCounts()).map(([type, count]) => (
              <div
                key={type}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md"
              >
                <span className="font-medium capitalize">{type}</span>
                <span className="text-gray-600">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form - Add/Edit */}
        {(operation === 'add' || operation === 'edit') && (
          <>
            {/* Type Selection */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">
                {operation === 'add' ? 'Select Section to Add To' : 'Item Type'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <button
                  type="button"
                  onClick={() => handleTypeSelect('skill')}
                  className={`p-4 border-2 rounded-lg transition-colors ${
                    selectedType === 'skill'
                      ? 'border-black bg-black text-white'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  Skills
                </button>
                <button
                  type="button"
                  onClick={() => handleTypeSelect('publication')}
                  className={`p-4 border-2 rounded-lg transition-colors ${
                    selectedType === 'publication'
                      ? 'border-black bg-black text-white'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  Publications
                </button>
                <button
                  type="button"
                  onClick={() => handleTypeSelect('experience')}
                  className={`p-4 border-2 rounded-lg transition-colors ${
                    selectedType === 'experience'
                      ? 'border-black bg-black text-white'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  Experience
                </button>
                <button
                  type="button"
                  onClick={() => handleTypeSelect('education')}
                  className={`p-4 border-2 rounded-lg transition-colors ${
                    selectedType === 'education'
                      ? 'border-black bg-black text-white'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  Education
                </button>
                <button
                  type="button"
                  onClick={() => handleTypeSelect('certificate')}
                  className={`p-4 border-2 rounded-lg transition-colors ${
                    selectedType === 'certificate'
                      ? 'border-black bg-black text-white'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  Certificates
                </button>
              </div>
            </div>

            {/* Form */}
            {selectedType && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              {operation === 'add' ? 'Add New' : 'Edit'} {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
            </h2>
            
            {/* Add Position Selector (only for add mode) */}
            {operation === 'add' && (
              <div className="mb-4 p-4 bg-gray-50 rounded-md">
                <label className="block text-sm font-medium mb-2">Add New Entry</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="addPosition"
                      value="top"
                      checked={addPosition === 'top'}
                      onChange={(e) => setAddPosition(e.target.value as 'top' | 'bottom')}
                      className="rounded"
                    />
                    <span>At the Top</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="addPosition"
                      value="bottom"
                      checked={addPosition === 'bottom'}
                      onChange={(e) => setAddPosition(e.target.value as 'top' | 'bottom')}
                      className="rounded"
                    />
                    <span>At the Bottom</span>
                  </label>
                </div>
              </div>
            )}

            {/* Display Order (for edit mode) */}
            {operation === 'edit' && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Display Order (Lower = First)</label>
                <input
                  type="number"
                  value={formData.displayOrder ?? 0}
                  onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
                <p className="text-xs text-gray-500 mt-1">Adjust this number to change the order. Lower numbers appear first.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {selectedType === 'skill' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">Skill Category *</label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="e.g., Programming Languages, Web Development"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Skills *</label>
                    <textarea
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., Python, Java, JavaScript, TypeScript, SQL"
                      required
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </>
              )}

              {selectedType === 'publication' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">Publication Title *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., Incentivizing Sustainable Behaviour using Blockchain..."
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Publication URL *</label>
                    <input
                      type="url"
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      placeholder="https://..."
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </>
              )}

              {selectedType === 'experience' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">Position/Title *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., WEB DEVELOPER @ WEBFUDGE AGENCY, PUNE"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Date Range *</label>
                    <input
                      type="text"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      placeholder="e.g., 8/2025 - TODAY"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description (Optional)</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Additional details about the experience"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </>
              )}

              {selectedType === 'education' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">Institution & Degree *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., BRACTS VISHWAKARMA INSTITUTES OF INFORMATION TECHNOLOGY / B.TECH (CGPA: 7.9)"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Date Range *</label>
                    <input
                      type="text"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      placeholder="e.g., 11/2022 - 6/2026"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </>
              )}

              {selectedType === 'certificate' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">Certificate Name *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., Fundamentals of Deep Learning by NVIDIA Deep Learning Institute"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Issuing Organization (Optional)</label>
                    <input
                      type="text"
                      value={formData.subtitle}
                      onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                      placeholder="e.g., NVIDIA Deep Learning Institute"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Certificate URL (Optional)</label>
                    <input
                      type="url"
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </>
              )}

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-black text-white rounded-md hover:bg-black/80 transition-colors"
                >
                  {operation === 'add' ? 'Add Entry' : 'Update Entry'}
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

            {!selectedType && operation === 'add' && (
              <div className="bg-white rounded-lg shadow p-6 text-center text-gray-600">
                Please select a section above to add new entries.
              </div>
            )}
          </>
        )}

        {/* Delete Mode - Item List */}
        {operation === 'delete' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Select Item to Delete</h2>
            <div className="space-y-2">
              {filteredItems.length === 0 ? (
                <p className="text-center text-gray-600 py-8">No items found.</p>
              ) : (
                filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50"
                  >
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-gray-600 capitalize">{item.type}</p>
                      {item.subtitle && (
                        <p className="text-sm text-gray-500">{item.subtitle}</p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Edit Mode - Item List */}
        {operation === 'edit' && !selectedItem && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Select Item to Edit</h2>
            <div className="space-y-2">
              {filteredItems.length === 0 ? (
                <p className="text-center text-gray-600 py-8">No items found.</p>
              ) : (
                filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleEdit(item)}
                  >
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-gray-600 capitalize">{item.type}</p>
                      {item.subtitle && (
                        <p className="text-sm text-gray-500">{item.subtitle}</p>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(item);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* All Items List */}
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">All Items ({items.length})</h2>
          <div className="space-y-2">
            {items.length === 0 ? (
              <p className="text-center text-gray-600 py-8">No items found. Add your first item above!</p>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 border border-gray-200 rounded-md"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-gray-600 mt-1 capitalize">{item.type}</p>
                      {item.subtitle && (
                        <p className="text-sm text-gray-500 mt-1">{item.subtitle}</p>
                      )}
                      {item.description && (
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{item.description}</p>
                      )}
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs px-2 py-1 bg-gray-100 rounded capitalize">
                          {item.type}
                        </span>
                        {item.category && (
                          <span className="text-xs px-2 py-1 bg-blue-100 rounded">
                            {item.category}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}



