'use client';

import { useState, useEffect } from 'react';
import { ProjectData } from '@/data/projects';
import { getAllProjectsMerged } from '@/lib/firebase-data';
import ProjectCard from '@/components/ProjectCard';

export default function WebAppPage() {
  const [webAppProjects, setWebAppProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const allProjects = await getAllProjectsMerged();
        // Get projects with category "Web App"
        const webApps = allProjects.filter(project => project.category === "Web App");
        setWebAppProjects(webApps);
      } catch (error) {
        console.error('Error loading projects:', error);
        setWebAppProjects([]);
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
          <a href="/" className="hover:text-black transition-colors">
            HOME
          </a>
          <span className="mx-2">&gt;</span>
          <a href="/work" className="hover:text-black transition-colors">
            WORK
          </a>
          <span className="mx-2">&gt;</span>
          <span className="text-black font-medium">WEB APP</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
            Web Applications
          </h1>
          <p className="text-lg text-black/70 max-w-2xl">
            Full-stack web applications built with modern frameworks and
            technologies.
          </p>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="text-center py-12 text-gray-600">Loading projects...</div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {webAppProjects.length === 0 ? (
              <p className="text-black/60 col-span-full text-center py-12">
                No web applications found.
              </p>
            ) : (
              webAppProjects.map((project) => (
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
            <span className="transition-transform duration-500 ease-out group-hover:-translate-x-1">
              [
            </span>
            <span className="underline-offset-4 group-hover:underline">
              ← Back to All Work
            </span>
            <span className="transition-transform duration-500 ease-out group-hover:translate-x-1">
              ]
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
