import Link from 'next/link';
import { ProjectData, getProjectSlug } from "@/data/projects";

interface ProjectCardProps {
  project: ProjectData;
  showLivePreview?: boolean;
}

export default function ProjectCard({ project, showLivePreview = true }: ProjectCardProps) {
  const projectSlug = getProjectSlug(project.name);
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Web App": return "from-blue-50 to-indigo-50 group-hover:from-blue-100 group-hover:to-indigo-100";
      case "Website": return "from-green-50 to-emerald-50 group-hover:from-green-100 group-hover:to-emerald-100";
      case "Mobile App": return "from-pink-50 to-rose-50 group-hover:from-pink-100 group-hover:to-rose-100";
      case "Desktop App": return "from-purple-50 to-violet-50 group-hover:from-purple-100 group-hover:to-violet-100";
      case "Machine Learning & AI":
      case "Machine Learning":
      case "ML & AI": return "from-orange-50 to-amber-50 group-hover:from-orange-100 group-hover:to-amber-100";
      default: return "from-gray-50 to-slate-50 group-hover:from-gray-100 group-hover:to-slate-100";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Web App": return "🌐";
      case "Website": return "🌍";
      case "Mobile App": return "📱";
      case "Desktop App": return "🖥️";
      case "Presentation": return "📊";
      case "Graphic": return "🎨";
      case "Marketing": return "📢";
      case "Machine Learning & AI":
      case "Machine Learning":
      case "ML & AI": return "🤖";
      default: return "💻";
    }
  };

  return (
    <Link href={`/work/${projectSlug}`} className="block">
      <div className="group bg-white rounded-lg border border-black/10 overflow-hidden hover:border-black/20 hover:shadow-xl transition-all duration-300 cursor-pointer">
        {/* Project Preview/Screenshot Area */}
        <div className={`aspect-[16/10] bg-gradient-to-br ${getCategoryColor(project.category)} relative overflow-hidden transition-colors`}>
          {project.thumbnail ? (
            // Use thumbnail if available
            <img
              src={project.thumbnail}
              alt={project.name}
              className="w-full h-full object-cover"
            />
          ) : project.coverImage ? (
            // Use cover image if available
            <img
              src={project.coverImage}
              alt={project.name}
              className="w-full h-full object-cover"
            />
          ) : project.graphicImages && project.graphicImages.length > 0 ? (
            // Use first graphic image if available
            <img
              src={project.graphicImages[0]}
              alt={project.name}
              className="w-full h-full object-cover"
            />
          ) : project.screenshots && project.screenshots.length > 0 ? (
            // Use first screenshot if available
            <img
              src={project.screenshots[0]}
              alt={project.name}
              className="w-full h-full object-cover"
            />
          ) : project.liveUrl && showLivePreview ? (
            // Live Website Preview (iframe)
            <div className="relative w-full h-full">
              <iframe
                src={project.liveUrl}
                className="w-full h-full scale-50 origin-top-left transform"
                style={{ width: '200%', height: '200%' }}
                loading="lazy"
                sandbox="allow-same-origin allow-scripts"
                title={`Preview of ${project.name}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                LIVE
              </div>
            </div>
          ) : (
            // Fallback with category icon
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-4xl mb-2">{getCategoryIcon(project.category)}</div>
                <span className="text-xs uppercase tracking-[0.18em] text-black/50">
                  {project.category}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Project Information */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-medium break-words flex-1 leading-tight">
              {project.name.replaceAll("_", " ").replaceAll("-", " ")}
            </h3>
            {project.featured && (
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full ml-2">
                ⭐ Featured
              </span>
            )}
          </div>

          <p className="text-sm text-black/70 mb-4 leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1 mb-4">
            {project.techStack.slice(0, 4).map((tech) => (
              <span 
                key={tech}
                className="text-xs px-2 py-1 bg-black/5 rounded-full text-black/60"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="text-xs px-2 py-1 bg-black/5 rounded-full text-black/60">
                +{project.techStack.length - 4} more
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 bg-black text-white text-center py-2 px-4 rounded-md text-sm hover:bg-black/80 transition-colors duration-200 z-10 relative"
              >
                View Live ↗
              </a>
            )}
            {project.presentationUrl && (
              <a
                href={project.presentationUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-md text-sm hover:bg-blue-700 transition-colors duration-200 z-10 relative"
              >
                View Presentation ↗
              </a>
            )}
            {project.portfolioUrl && (
              <a
                href={project.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 bg-purple-600 text-white text-center py-2 px-4 rounded-md text-sm hover:bg-purple-700 transition-colors duration-200 z-10 relative"
              >
                View Portfolio ↗
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={`${(project.liveUrl || project.presentationUrl || project.portfolioUrl) ? 'flex-1' : 'w-full'} border border-black/20 text-black text-center py-2 px-4 rounded-md text-sm hover:bg-black/5 transition-colors duration-200 z-10 relative`}
              >
                View Code ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}