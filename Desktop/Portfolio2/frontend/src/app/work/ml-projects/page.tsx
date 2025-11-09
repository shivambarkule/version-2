'use client';

import { useState, useEffect } from 'react';
import { ProjectData } from '@/data/projects';
import { getAllProjectsMerged } from '@/lib/firebase-data';
import ProjectCard from '@/components/ProjectCard';

export default function MLProjectsPage() {
  const [mlProjects, setMlProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const allProjects = await getAllProjectsMerged();
        // Get projects with ML/AI category
        const mlProjects = allProjects.filter(project => 
          project.category === "Machine Learning & AI" || 
          project.category === "Machine Learning" || 
          project.category === "ML & AI"
        );
        // Sort by displayOrder if available, otherwise by name
        mlProjects.sort((a, b) => {
          const orderA = a.displayOrder ?? 999;
          const orderB = b.displayOrder ?? 999;
          if (orderA !== orderB) return orderA - orderB;
          return a.name.localeCompare(b.name);
        });
        setMlProjects(mlProjects);
      } catch (error) {
        console.error('Error loading ML projects:', error);
        setMlProjects([]);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
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
          <span className="text-black font-medium">MACHINE LEARNING & AI</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-6">Machine Learning & Artificial Intelligence</h1>
          <p className="text-lg text-black/70 max-w-2xl">
            AI and ML projects showcasing predictive models, neural networks, computer vision, natural language processing, and intelligent systems.
          </p>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="text-center py-12 text-gray-600">Loading projects...</div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {mlProjects.length === 0 ? (
              <p className="text-black/60 col-span-full text-center py-12">
                No machine learning projects found. Check back soon!
              </p>
            ) : (
              mlProjects.map((project) => (
                <ProjectCard key={project.name} project={project} showLivePreview={true} />
              ))
            )}
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

