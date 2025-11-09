"use client";

import { useState, useEffect } from 'react';
import { ProjectData } from "@/data/projects";
import { getAllProjectsMerged } from "@/lib/firebase-data";
import ProjectCard from "@/components/ProjectCard";

export default function OtherProjectsPage() {
  const [otherProjects, setOtherProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const allProjects = await getAllProjectsMerged();
        // Get projects that are not featured
        const nonFeatured = allProjects.filter(project => !project.featured);
        setOtherProjects(nonFeatured);
      } catch (error) {
        console.error('Error loading projects:', error);
        setOtherProjects([]);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  return (
    <div className="p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-light mb-4">Other Projects</h1>
          <p className="text-gray-600 text-sm md:text-base">
            Repository-based projects and development work ({otherProjects.length})
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-600">Loading projects...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.length === 0 ? (
              <p className="col-span-full text-center py-12 text-gray-600">
                No other projects available.
              </p>
            ) : (
              otherProjects.map((project) => (
                <ProjectCard key={project.name} project={project} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}