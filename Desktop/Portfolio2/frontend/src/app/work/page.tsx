'use client';

import { useState, useEffect } from 'react';
import { projectsData, getFeaturedProjects, ProjectData } from "@/data/projects";
import { getFirebaseProjects } from "@/lib/firebase-data";
import ProjectCard from "@/components/ProjectCard";

const categories = [
  "Featured",
  "Machine Learning & AI",
  "Other Projects",
  "Web App",
  "Website",
  "Presentation",
  "Desktop App",
  "Mobile App",
  "Graphic",
  "Marketing",
];

export default function WorkPage() {
  const [allProjects, setAllProjects] = useState<ProjectData[]>(projectsData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const { getAllProjectsMerged } = await import('@/lib/firebase-data');
        const mergedProjects = await getAllProjectsMerged();
        // Sort by displayOrder if available, then by featured, then by name
        mergedProjects.sort((a, b) => {
          const orderA = a.displayOrder ?? 999;
          const orderB = b.displayOrder ?? 999;
          if (orderA !== orderB) return orderA - orderB;
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return a.name.localeCompare(b.name);
        });
        setAllProjects(mergedProjects);
      } catch (error) {
        console.error('Error loading projects:', error);
        // Fallback to static data on error
        setAllProjects(projectsData);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  // Calculate counts based on all project data
  const featuredProjects = allProjects.filter(p => p.featured);
  const mlProjects = allProjects.filter(p => p.category === "Machine Learning" || p.category === "ML & AI" || p.category === "Machine Learning & AI");
  const otherProjects = allProjects.filter(p => !p.featured);
  
  const counts: Record<string, number> = {
    Featured: featuredProjects.length,
    "Machine Learning & AI": mlProjects.length,
    "Other Projects": otherProjects.length,
    "Web App": allProjects.filter(p => p.category === "Web App").length,
    Website: allProjects.filter(p => p.category === "Website").length,
    "Desktop App": allProjects.filter(p => p.category === "Desktop App").length,
    "Mobile App": allProjects.filter(p => p.category === "Mobile App").length,
    Presentation: allProjects.filter(p => p.category === "Presentation").length,
    Graphic: allProjects.filter(p => p.category === "Graphic").length,
    Marketing: allProjects.filter(p => p.category === "Marketing").length,
  };

  return (
    <div className="min-h-full">
      <div className="p-6 md:p-10 pb-20">
        {/* Breadcrumb Navigation */}
        <nav className="text-[11px] uppercase tracking-[0.12em] text-black/60 mb-8">
          <a href="/" className="hover:text-black transition-colors">
            HOME
          </a>
          <span className="mx-2">&gt;</span>
          <span className="text-black font-medium">WORK</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-6">Selected Work</h1>
          <p className="text-lg text-black/70 max-w-2xl">
            A showcase of live projects, web applications, and development work with interactive previews and live demos.
          </p>
        </div>

        {/* Filter Categories */}
        <ul className="flex flex-wrap gap-4 mb-12 text-[14px]">
          {categories.map((label) => {
            const getHref = (category: string) => {
              switch (category) {
                case "Featured": return "/work/featured";
                case "Machine Learning & AI": return "/work/ml-projects";
                case "Other Projects": return "/work/other";
                case "Web App": return "/work/web-app";
                case "Desktop App": return "/work/desktop-app";
                case "Mobile App": return "/work/mobile-app";
                case "Website": return "/work/website";
                case "Presentation": return "/work/presentations";
                case "Graphic": return "/work/graphic";
                case "Marketing": return "/work/marketing";
                default: return "#";
              }
            };

            return (
              <li key={label}>
                <a
                  className="group inline-flex items-center gap-1 select-none"
                  href={getHref(label)}
                >
                  <span className="transition-transform duration-500 ease-out group-hover:-translate-x-1">
                    [
                  </span>
                  <span className="group-hover:underline underline-offset-4">
                    {label}{" "}
                    <span className="text-black/50">{counts[label] ?? 0}</span>
                  </span>
                  <span className="text-black/70 transition-transform duration-500 ease-out group-hover:-translate-y-0.5">
                    ↗
                  </span>
                  <span className="transition-transform duration-500 ease-out group-hover:translate-x-1">
                    ]
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Featured Projects Grid */}
        {loading ? (
          <div className="text-center py-12 text-gray-600">Loading projects...</div>
        ) : (
          <>
            {featuredProjects.length > 0 && (
              <div className="mb-16">
                <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-8">Featured Projects</h2>
                <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
                  {featuredProjects.map((project) => (
                    <ProjectCard key={project.name} project={project} showLivePreview={true} />
                  ))}
                </div>
              </div>
            )}

            {/* Machine Learning & AI Projects Section */}
            {mlProjects.length > 0 && (
              <div className="mb-16">
                <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-8">Machine Learning & Artificial Intelligence</h2>
                <p className="text-lg text-black/70 max-w-2xl mb-8">
                  AI and ML projects showcasing predictive models, neural networks, and intelligent systems.
                </p>
                <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
                  {mlProjects.map((project) => (
                    <ProjectCard key={project.name} project={project} showLivePreview={true} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}