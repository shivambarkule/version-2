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
  orderBy 
} from 'firebase/firestore';
import { auth, db, storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ExcursionData } from '@/data/excursions';

export default function ExcursionsManagementPage() {
  const [excursions, setExcursions] = useState<(ExcursionData & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [operation, setOperation] = useState<'add' | 'edit' | 'delete'>('add');
  const [selectedExcursion, setSelectedExcursion] = useState<(ExcursionData & { id: string }) | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [uploading, setUploading] = useState(false);
  const [addPosition, setAddPosition] = useState<'top' | 'bottom'>('top');
  
  // Form inputs
  const [imageInput, setImageInput] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [equipmentInput, setEquipmentInput] = useState('');
  
  const [formData, setFormData] = useState<ExcursionData>({
    title: '',
    description: '',
    content: '',
    images: [],
    orientation: 'square',
    category: '',
    tags: [],
    location: '',
    date: '',
    featured: false,
    displayOrder: 0,
    blogContent: '',
    readTime: undefined,
    cameraSettings: '',
    equipment: [],
    photoType: '',
  });
  
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/admin');
      } else {
        loadExcursions();
      }
    });

    return () => unsubscribe();
  }, [router]);

  const loadExcursions = async () => {
    try {
      // Try to order by displayOrder, but if it fails (no index or no docs), get all docs
      let querySnapshot;
      try {
        const q = query(collection(db, 'excursions'), orderBy('displayOrder', 'asc'));
        querySnapshot = await getDocs(q);
      } catch (orderError) {
        // If ordering fails, just get all documents without ordering
        console.warn('Could not order by displayOrder, fetching all documents:', orderError);
        querySnapshot = await getDocs(collection(db, 'excursions'));
      }
      
      const excursionsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as (ExcursionData & { id: string })[];
      
      // Sort manually if needed
      excursionsData.sort((a, b) => {
        const orderA = a.displayOrder ?? 999;
        const orderB = b.displayOrder ?? 999;
        return orderA - orderB;
      });
      
      setExcursions(excursionsData);
    } catch (error) {
      console.error('Error loading excursions:', error);
      setExcursions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validate required fields
      if (!formData.title || !formData.description) {
        alert('Please fill in all required fields (Title and Description).');
        return;
      }

      if (!formData.images || formData.images.length === 0) {
        alert('Please add at least one image.');
        return;
      }

      // Clean the data - remove undefined values and ensure arrays are valid
      const cleanData: any = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        images: formData.images || [],
        orientation: formData.orientation || 'square',
      };

      // Add optional fields only if they have values
      if (formData.content && formData.content.trim()) {
        cleanData.content = formData.content.trim();
      }
      if (formData.category && formData.category.trim()) {
        cleanData.category = formData.category.trim();
      }
      if (formData.location && formData.location.trim()) {
        cleanData.location = formData.location.trim();
      }
      if (formData.date) {
        cleanData.date = formData.date;
      }
      if (formData.tags && formData.tags.length > 0) {
        cleanData.tags = formData.tags.filter(tag => tag.trim() !== '');
      }
      if (formData.blogContent && formData.blogContent.trim()) {
        cleanData.blogContent = formData.blogContent.trim();
      }
      if (formData.readTime !== undefined && formData.readTime !== null) {
        cleanData.readTime = formData.readTime;
      }
      if (formData.cameraSettings && formData.cameraSettings.trim()) {
        cleanData.cameraSettings = formData.cameraSettings.trim();
      }
      if (formData.equipment && formData.equipment.length > 0) {
        cleanData.equipment = formData.equipment.filter(item => item.trim() !== '');
      }
      if (formData.photoType && formData.photoType.trim()) {
        cleanData.photoType = formData.photoType.trim();
      }
      if (formData.featured !== undefined) {
        cleanData.featured = formData.featured;
      }

      if (operation === 'add') {
        // Calculate displayOrder based on position preference
        let displayOrder = 0;
        
        if (addPosition === 'top') {
          const minOrder = excursions.length > 0 
            ? Math.min(...excursions.map(e => e.displayOrder ?? 999))
            : 0;
          displayOrder = minOrder - 1;
        } else {
          const maxOrder = excursions.length > 0
            ? Math.max(...excursions.map(e => e.displayOrder ?? 0))
            : -1;
          displayOrder = maxOrder + 1;
        }
        
        cleanData.displayOrder = displayOrder;
        cleanData.createdAt = new Date().toISOString();
        
        await addDoc(collection(db, 'excursions'), cleanData);
        alert('Excursion added successfully!');
      } else if (operation === 'edit' && selectedExcursion) {
        cleanData.displayOrder = formData.displayOrder ?? 0;
        cleanData.updatedAt = new Date().toISOString();
        
        await updateDoc(doc(db, 'excursions', selectedExcursion.id), cleanData);
        alert('Excursion updated successfully!');
      }
      resetForm();
      loadExcursions();
    } catch (error) {
      console.error(`Error ${operation === 'add' ? 'adding' : 'updating'} excursion:`, error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Error ${operation === 'add' ? 'adding' : 'updating'} excursion: ${errorMessage}`);
    }
  };

  const handleDelete = async (excursionId: string) => {
    if (!confirm('Are you sure you want to delete this excursion?')) return;

    try {
      await deleteDoc(doc(db, 'excursions', excursionId));
      loadExcursions();
      alert('Excursion deleted successfully!');
    } catch (error) {
      console.error('Error deleting excursion:', error);
      alert('Error deleting excursion. Please try again.');
    }
  };

  const handleEdit = (excursion: ExcursionData & { id: string }) => {
    setSelectedExcursion(excursion);
    setOperation('edit');
    setFormData({
      title: excursion.title,
      description: excursion.description,
      content: excursion.content || '',
      images: excursion.images || [],
      orientation: excursion.orientation || 'square',
      category: excursion.category || '',
      tags: excursion.tags || [],
      location: excursion.location || '',
      date: excursion.date || '',
      featured: excursion.featured || false,
      displayOrder: excursion.displayOrder ?? 0,
      blogContent: excursion.blogContent || '',
      readTime: excursion.readTime,
      cameraSettings: excursion.cameraSettings || '',
      equipment: excursion.equipment || [],
      photoType: excursion.photoType || '',
    });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      content: '',
      images: [],
      orientation: 'square',
      category: '',
      tags: [],
      location: '',
      date: '',
      featured: false,
      displayOrder: 0,
      blogContent: '',
      readTime: undefined,
      cameraSettings: '',
      equipment: [],
      photoType: '',
    });
    setImageInput('');
    setTagInput('');
    setEquipmentInput('');
    setSelectedExcursion(null);
    setOperation('add');
  };

  const handleAddImage = () => {
    if (imageInput.trim()) {
      setFormData({
        ...formData,
        images: [...(formData.images || []), imageInput.trim()],
      });
      setImageInput('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData({
      ...formData,
      images: (formData.images || []).filter((_, i) => i !== index),
    });
  };

  const handleImageUploadSingle = async (file: File): Promise<void> => {
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      throw new Error(`${file.name} is not an image file.`);
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      throw new Error(`${file.name} is too large. Maximum size is 10MB.`);
    }
    
    // Create a unique filename with timestamp
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 9);
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileRef = ref(storage, `excursions/${timestamp}_${randomId}_${sanitizedFileName}`);
    
    await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(fileRef);
    
    setFormData(prev => ({
      ...prev,
      images: [...(prev.images || []), downloadURL],
    }));
    
    console.log('Image uploaded successfully:', downloadURL);
  };

  const handleImageUpload = async (file: File) => {
    if (!file) return;
    
    setUploading(true);
    try {
      await handleImageUploadSingle(file);
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert(error instanceof Error ? error.message : `Error uploading ${file.name}. Please try again.`);
    } finally {
      setUploading(false);
    }
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

  const handleAddEquipment = () => {
    if (equipmentInput.trim()) {
      setFormData({
        ...formData,
        equipment: [...(formData.equipment || []), equipmentInput.trim()],
      });
      setEquipmentInput('');
    }
  };

  const handleRemoveEquipment = (index: number) => {
    setFormData({
      ...formData,
      equipment: (formData.equipment || []).filter((_, i) => i !== index),
    });
  };

  const filteredExcursions = excursions.filter((excursion) => {
    const matchesSearch = searchQuery === '' || 
      excursion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      excursion.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      excursion.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = filterCategory === 'all' || 
      excursion.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(excursions.map(e => e.category).filter(Boolean)));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link href="/admin/dashboard" className="text-blue-600 hover:underline">
            ← Back to Dashboard
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-6">Excursions Management</h1>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Search & Filter</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Search Excursions</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, description, or tags..."
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
            Showing {filteredExcursions.length} of {excursions.length} excursions
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

        {/* Form - Add/Edit */}
        {(operation === 'add' || operation === 'edit') && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {operation === 'add' ? 'Add New Excursion' : 'Edit Excursion'}
            </h2>
            
            {/* Add Position Selector */}
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
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Photography, Blog, Travel, Nature"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., Pune, India"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>

              {/* Orientation Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">Card Orientation *</label>
                <div className="grid grid-cols-3 gap-4">
                  <label className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    formData.orientation === 'portrait'
                      ? 'border-black bg-black text-white'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      name="orientation"
                      value="portrait"
                      checked={formData.orientation === 'portrait'}
                      onChange={(e) => setFormData({ ...formData, orientation: e.target.value as 'portrait' | 'landscape' | 'square' })}
                      className="hidden"
                    />
                    <div className="text-center">
                      <div className="text-2xl mb-2">📱</div>
                      <div className="font-medium">Portrait</div>
                      <div className="text-xs mt-1">Tall card</div>
                    </div>
                  </label>
                  <label className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    formData.orientation === 'landscape'
                      ? 'border-black bg-black text-white'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      name="orientation"
                      value="landscape"
                      checked={formData.orientation === 'landscape'}
                      onChange={(e) => setFormData({ ...formData, orientation: e.target.value as 'portrait' | 'landscape' | 'square' })}
                      className="hidden"
                    />
                    <div className="text-center">
                      <div className="text-2xl mb-2">🖼️</div>
                      <div className="font-medium">Landscape</div>
                      <div className="text-xs mt-1">Wide card</div>
                    </div>
                  </label>
                  <label className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    formData.orientation === 'square'
                      ? 'border-black bg-black text-white'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      name="orientation"
                      value="square"
                      checked={formData.orientation === 'square'}
                      onChange={(e) => setFormData({ ...formData, orientation: e.target.value as 'portrait' | 'landscape' | 'square' })}
                      className="hidden"
                    />
                    <div className="text-center">
                      <div className="text-2xl mb-2">⬜</div>
                      <div className="font-medium">Square</div>
                      <div className="text-xs mt-1">Square card</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-1">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={4}
                  placeholder="Short description of the excursion..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              {/* Images */}
              <div>
                <label className="block text-sm font-medium mb-2">Images *</label>
                <p className="text-xs text-gray-600 mb-3">
                  Upload images to Firebase Storage (recommended) or add image URLs. The first image will be used as the main/cover image.
                </p>
                
                {/* File Upload Section */}
                <div className="mb-4 p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={async (e) => {
                      const files = Array.from(e.target.files || []);
                      if (files.length > 0) {
                        setUploading(true);
                        try {
                          // Upload files sequentially
                          for (const file of files) {
                            await handleImageUploadSingle(file);
                          }
                          alert(`${files.length} image${files.length !== 1 ? 's' : ''} uploaded successfully!`);
                        } catch (error) {
                          console.error('Error uploading images:', error);
                        } finally {
                          setUploading(false);
                          // Reset file input
                          e.target.value = '';
                        }
                      }
                    }}
                    className="hidden"
                    id="image-upload"
                    disabled={uploading}
                  />
                  <label
                    htmlFor="image-upload"
                    className={`flex flex-col items-center justify-center cursor-pointer ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="text-4xl mb-2">📸</div>
                    <div className="text-sm font-medium text-gray-700 mb-1">
                      {uploading ? 'Uploading images...' : 'Click to upload images'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {uploading ? 'Please wait...' : 'Supports multiple images (JPG, PNG, etc.)'}
                    </div>
                  </label>
                </div>

                {/* URL Input Section */}
                <div className="mb-4">
                  <label className="block text-xs font-medium mb-1 text-gray-600">Or add image URL:</label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={imageInput}
                      onChange={(e) => setImageInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddImage();
                        }
                      }}
                      placeholder="https://example.com/image.jpg"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm"
                    />
                    <button
                      type="button"
                      onClick={handleAddImage}
                      className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-sm"
                    >
                      Add URL
                    </button>
                  </div>
                </div>

                {/* Image Preview Grid */}
                {formData.images && formData.images.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-600 mb-2">
                      {formData.images.length} image{formData.images.length !== 1 ? 's' : ''} added
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                      {formData.images.map((url, index) => (
                        <div key={index} className="relative group border border-gray-200 rounded-lg overflow-hidden">
                          <img 
                            src={url} 
                            alt={`Image ${index + 1}`} 
                            className="w-full h-32 object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext fill="%23999" x="50%" y="50%" text-anchor="middle" dy=".3em" font-size="12"%3EImage Error%3C/text%3E%3C/svg%3E';
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                            title="Remove image"
                          >
                            ×
                          </button>
                          {index === 0 && (
                            <div className="absolute bottom-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded font-medium">
                              Main
                            </div>
                          )}
                          <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            #{index + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      💡 Tip: Drag images in the grid to reorder (coming soon). The first image is used as the cover.
                    </p>
                  </div>
                )}
              </div>

              {/* Tags */}
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

              {/* Blog Content */}
              <div>
                <label className="block text-sm font-medium mb-1">Blog Content (Full Story)</label>
                <textarea
                  value={formData.blogContent}
                  onChange={(e) => setFormData({ ...formData, blogContent: e.target.value })}
                  rows={8}
                  placeholder="Write the full blog post or story here..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
                <p className="text-xs text-gray-500 mt-1">Supports markdown formatting</p>
              </div>

              {/* Photography Details */}
              <div className="border-t pt-6 mt-6">
                <h3 className="text-lg font-semibold mb-4">Photography Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Photo Type</label>
                    <select
                      value={formData.photoType}
                      onChange={(e) => setFormData({ ...formData, photoType: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      <option value="">Select type...</option>
                      <option value="Nature">Nature</option>
                      <option value="Portrait">Portrait</option>
                      <option value="Street">Street</option>
                      <option value="Architecture">Architecture</option>
                      <option value="Landscape">Landscape</option>
                      <option value="Wildlife">Wildlife</option>
                      <option value="Macro">Macro</option>
                      <option value="Astrophotography">Astrophotography</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Read Time (minutes)</label>
                    <input
                      type="number"
                      value={formData.readTime || ''}
                      onChange={(e) => setFormData({ ...formData, readTime: parseInt(e.target.value) || undefined })}
                      placeholder="Estimated read time"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Camera Settings</label>
                    <input
                      type="text"
                      value={formData.cameraSettings}
                      onChange={(e) => setFormData({ ...formData, cameraSettings: e.target.value })}
                      placeholder="e.g., f/2.8, 1/125s, ISO 400"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </div>

                {/* Equipment */}
                <div>
                  <label className="block text-sm font-medium mb-2">Equipment</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={equipmentInput}
                      onChange={(e) => setEquipmentInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddEquipment();
                        }
                      }}
                      placeholder="Add equipment and press Enter"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <button
                      type="button"
                      onClick={handleAddEquipment}
                      className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(formData.equipment || []).map((item, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-100 rounded-full text-sm flex items-center gap-2"
                      >
                        {item}
                        <button
                          type="button"
                          onClick={() => handleRemoveEquipment(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Featured */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured || false}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded"
                  />
                  <span>Featured Excursion</span>
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-black text-white rounded-md hover:bg-black/80 transition-colors"
                >
                  {operation === 'add' ? 'Add Excursion' : 'Update Excursion'}
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

        {/* Delete Mode */}
        {operation === 'delete' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Select Excursion to Delete</h2>
            <div className="space-y-2">
              {filteredExcursions.length === 0 ? (
                <p className="text-center text-gray-600 py-8">No excursions found.</p>
              ) : (
                filteredExcursions.map((excursion) => (
                  <div
                    key={excursion.id}
                    className="flex justify-between items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50"
                  >
                    <div>
                      <h3 className="font-medium">{excursion.title}</h3>
                      <p className="text-sm text-gray-600">{excursion.category || 'Uncategorized'}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(excursion.id!)}
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

        {/* Edit Mode - List */}
        {operation === 'edit' && !selectedExcursion && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Select Excursion to Edit</h2>
            <div className="space-y-2">
              {filteredExcursions.length === 0 ? (
                <p className="text-center text-gray-600 py-8">No excursions found.</p>
              ) : (
                filteredExcursions.map((excursion) => (
                  <div
                    key={excursion.id}
                    className="flex justify-between items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleEdit(excursion)}
                  >
                    <div>
                      <h3 className="font-medium">{excursion.title}</h3>
                      <p className="text-sm text-gray-600">{excursion.category || 'Uncategorized'}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(excursion);
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

        {/* All Excursions List */}
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">All Excursions ({excursions.length})</h2>
          <div className="space-y-2">
            {excursions.length === 0 ? (
              <p className="text-center text-gray-600 py-8">No excursions found. Add your first excursion above!</p>
            ) : (
              excursions.map((excursion) => (
                <div
                  key={excursion.id}
                  className="p-4 border border-gray-200 rounded-md"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{excursion.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{excursion.description}</p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs px-2 py-1 bg-gray-100 rounded capitalize">
                          {excursion.orientation}
                        </span>
                        {excursion.category && (
                          <span className="text-xs px-2 py-1 bg-blue-100 rounded">
                            {excursion.category}
                          </span>
                        )}
                        {excursion.featured && (
                          <span className="text-xs px-2 py-1 bg-yellow-100 rounded">
                            Featured
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

