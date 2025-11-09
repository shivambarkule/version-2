'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getFirebaseExcursions } from '@/lib/firebase-data';
import { ExcursionData, getExcursionSlug } from '@/data/excursions';

export default function ExcursionsPage() {
  const [excursions, setExcursions] = useState<(ExcursionData & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadExcursions() {
      try {
        const data = await getFirebaseExcursions();
        // Sort by displayOrder, then by date, then by title
        data.sort((a, b) => {
          const orderA = a.displayOrder ?? 999;
          const orderB = b.displayOrder ?? 999;
          if (orderA !== orderB) return orderA - orderB;
          if (a.date && b.date) {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          }
          return a.title.localeCompare(b.title);
        });
        setExcursions(data);
      } catch (error) {
        console.error('Error loading excursions:', error);
        setExcursions([]);
      } finally {
        setLoading(false);
      }
    }
    loadExcursions();
  }, []);

  const filteredExcursions = excursions.filter((excursion) => {
    const matchesSearch = searchQuery === '' || 
      excursion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      excursion.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      excursion.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      excursion.location?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || 
      excursion.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(excursions.map(e => e.category).filter(Boolean)));

  const getCardClasses = (orientation: string) => {
    switch (orientation) {
      case 'portrait':
        return 'md:col-span-1 md:row-span-2';
      case 'landscape':
        return 'md:col-span-2 md:row-span-1';
      case 'square':
        return 'md:col-span-1 md:row-span-1';
      default:
        return 'md:col-span-1 md:row-span-1';
    }
  };

  const getImageAspect = (orientation: string) => {
    switch (orientation) {
      case 'portrait':
        return 'aspect-[3/4]';
      case 'landscape':
        return 'aspect-[4/3]';
      case 'square':
        return 'aspect-square';
      default:
        return 'aspect-[4/3]';
    }
  };

  return (
    <div className="min-h-full">
      <div className="p-6 md:p-10 pb-20">
        {/* Breadcrumb Navigation */}
        <nav className="text-[11px] uppercase tracking-[0.12em] text-black/60 mb-8">
          <Link href="/" className="hover:text-black transition-colors">HOME</Link>
          <span className="mx-2">&gt;</span>
          <span className="text-black font-medium">EXCURSIONS</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-6">Excursions</h1>
          <p className="text-lg text-black/70 max-w-2xl">
            A collection of photography, travel stories, and personal adventures captured through my lens and words.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, description, location, or tags..."
              className="w-full px-4 py-2 border border-black/10 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm"
            />
          </div>
          <div className="w-full md:w-48">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-4 py-2 border border-black/10 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Excursions Grid - Masonry Layout */}
        {loading ? (
          <div className="text-center py-12 text-gray-600">Loading excursions...</div>
        ) : filteredExcursions.length === 0 ? (
          <div className="text-center py-12 text-black/60">
            No excursions found. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
            {filteredExcursions.map((excursion) => {
              const slug = getExcursionSlug(excursion.title);
              const mainImage = excursion.images && excursion.images.length > 0 ? excursion.images[0] : null;
              
              return (
                <Link
                  key={excursion.id}
                  href={`/excursions/${slug}`}
                  className={`group bg-white rounded-lg border border-black/10 overflow-hidden hover:border-black/20 hover:shadow-xl transition-all duration-300 cursor-pointer ${getCardClasses(excursion.orientation || 'square')}`}
                >
                  {/* Image */}
                  <div className={`${getImageAspect(excursion.orientation || 'square')} relative overflow-hidden bg-gray-100`}>
                    {mainImage ? (
                      <img
                        src={mainImage}
                        alt={excursion.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-black/30">
                        <div className="text-center">
                          <div className="text-4xl mb-2">📸</div>
                          <span className="text-xs uppercase tracking-[0.18em]">
                            {excursion.category || 'Excursion'}
                          </span>
                        </div>
                      </div>
                    )}
                    {excursion.featured && (
                      <div className="absolute top-3 right-3 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                        ⭐ Featured
                      </div>
                    )}
                    {excursion.category && (
                      <div className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {excursion.category}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-medium mb-2 line-clamp-2 group-hover:text-black/80 transition-colors">
                      {excursion.title}
                    </h3>
                    <p className="text-sm text-black/70 mb-4 line-clamp-3">
                      {excursion.description}
                    </p>
                    
                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-2 text-xs text-black/60 mb-4">
                      {excursion.location && (
                        <span className="flex items-center gap-1">
                          📍 {excursion.location}
                        </span>
                      )}
                      {excursion.date && (
                        <span>
                          📅 {new Date(excursion.date).toLocaleDateString()}
                        </span>
                      )}
                      {excursion.readTime && (
                        <span>
                          ⏱️ {excursion.readTime} min read
                        </span>
                      )}
                    </div>

                    {/* Tags */}
                    {excursion.tags && excursion.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {excursion.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="text-xs px-2 py-1 bg-black/5 rounded-full text-black/60"
                          >
                            #{tag}
                          </span>
                        ))}
                        {excursion.tags.length > 3 && (
                          <span className="text-xs px-2 py-1 bg-black/5 rounded-full text-black/60">
                            +{excursion.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* View More Indicator */}
                    <div className="mt-4 text-xs text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      View Details →
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

