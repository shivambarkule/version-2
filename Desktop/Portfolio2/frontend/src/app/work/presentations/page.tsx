'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ProjectData } from '@/data/projects';
import { getAllProjectsMerged } from '@/lib/firebase-data';
import { getProjectSlug } from '@/data/projects';

export default function PresentationsPage() {
  const [presentations, setPresentations] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPresentations() {
      try {
        const allProjects = await getAllProjectsMerged();
        // Get projects with category "Presentation"
        const presentationProjects = allProjects.filter(
          project => project.category === "Presentation"
        );
        // Sort by displayOrder if available, otherwise by name
        presentationProjects.sort((a, b) => {
          const orderA = a.displayOrder ?? 999;
          const orderB = b.displayOrder ?? 999;
          if (orderA !== orderB) return orderA - orderB;
          return a.name.localeCompare(b.name);
        });
        setPresentations(presentationProjects);
      } catch (error) {
        console.error('Error loading presentations:', error);
        setPresentations([]);
      } finally {
        setLoading(false);
      }
    }
    loadPresentations();
  }, []);
  return (
    <div className="min-h-full">
      <div className="p-6 md:p-10 pb-20">
        {/* Breadcrumb Navigation */}
        <nav className="text-[11px] uppercase tracking-[0.12em] text-black/60 mb-8">
          <a href="/" className="hover:text-black transition-colors">HOME</a>
          <span className="mx-2">&gt;</span>
          <a href="/work" className="hover:text-black transition-colors">WORK</a>
          <span className="mx-2">&gt;</span>
          <span className="text-black font-medium">PRESENTATION</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-6">Presentations</h1>
          <p className="text-lg text-black/70 max-w-2xl">
            A collection of presentation designs created with Canva, showcasing various design approaches 
            for business, creative, and marketing contexts.
          </p>
        </div>

        {/* Presentations Grid */}
        {loading ? (
          <div className="text-center py-12 text-gray-600">Loading presentations...</div>
        ) : presentations.length === 0 ? (
          <div className="text-center py-12 text-black/60">
            No presentations found. Check back soon!
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {presentations.map((presentation) => {
              const slug = getProjectSlug(presentation.name);
              return (
                <Link
                  key={presentation.name}
                  href={`/work/${slug}`}
                  className="group bg-white rounded-lg border border-black/10 overflow-hidden hover:border-black/20 hover:shadow-lg transition-all duration-300"
                >
                  <div className="aspect-[16/10] bg-gradient-to-br from-blue-50 to-purple-50 grid place-items-center group-hover:from-blue-100 group-hover:to-purple-100 transition-colors relative overflow-hidden">
                    {presentation.thumbnail ? (
                      <img
                        src={presentation.thumbnail}
                        alt={presentation.name}
                        className="w-full h-full object-cover"
                      />
                    ) : presentation.coverImage ? (
                      <img
                        src={presentation.coverImage}
                        alt={presentation.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <div className="text-3xl mb-2">📊</div>
                        <span className="text-xs uppercase tracking-[0.18em] text-black/50">
                          {presentation.category}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-medium break-words flex-1">
                        {presentation.name}
                      </h3>
                      {presentation.startDate && (
                        <span className="text-xs text-black/50 ml-4">
                          {new Date(presentation.startDate).getFullYear()}
                        </span>
                      )}
                    </div>
                    
                    <div className="text-sm text-black/70 mb-4 leading-relaxed line-clamp-3">
                      {presentation.description}
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {presentation.presentationType && (
                        <span className="text-xs px-2 py-1 bg-blue-100 rounded-full text-blue-800">
                          {presentation.presentationType}
                        </span>
                      )}
                      {presentation.slideCount && (
                        <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-black/60">
                          {presentation.slideCount} slides
                        </span>
                      )}
                      {presentation.techStack && presentation.techStack.slice(0, 2).map((tech) => (
                        <span 
                          key={tech}
                          className="text-xs px-2 py-1 bg-black/5 rounded-full text-black/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="text-xs text-blue-600 font-medium">
                      View Details ↗
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Back to Work */}
        <div className="mt-12 pt-8 border-t border-black/10">
          <a 
            href="/work"
            className="group inline-flex items-center gap-1 select-none text-sm"
          >
            <span className="transition-transform duration-500 ease-out group-hover:-translate-x-1">[</span>
            <span className="underline-offset-4 group-hover:underline">← Back to All Work</span>
            <span className="transition-transform duration-500 ease-out group-hover:translate-x-1">]</span>
          </a>
        </div>
      </div>
    </div>
  );
}