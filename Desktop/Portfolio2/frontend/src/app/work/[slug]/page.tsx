'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ProjectData } from '@/data/projects';
import { getProjectBySlug } from '@/lib/firebase-data';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProject() {
      try {
        const projectData = await getProjectBySlug(slug);
        if (projectData) {
          setProject(projectData);
        } else {
          router.push('/work');
        }
      } catch (error) {
        console.error('Error loading project:', error);
        router.push('/work');
      } finally {
        setLoading(false);
      }
    }
    if (slug) {
      loadProject();
    }
  }, [slug, router]);

  const handleCollaborate = () => {
    const message = `Hey there, I would like to collaborate with you on "${project?.name}". Let's connect and discuss about it in detail!`;
    const encodedMessage = encodeURIComponent(message);
    router.push(`/contact?message=${encodedMessage}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading project...</div>
      </div>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <div className="min-h-full">
      <div className="p-6 md:p-10 pb-20">
        {/* Breadcrumb Navigation */}
        <nav className="text-[11px] uppercase tracking-[0.12em] text-black/60 mb-8">
          <Link href="/" className="hover:text-black transition-colors">HOME</Link>
          <span className="mx-2">&gt;</span>
          <Link href="/work" className="hover:text-black transition-colors">WORK</Link>
          <span className="mx-2">&gt;</span>
          <span className="text-black font-medium">{project.name.toUpperCase()}</span>
        </nav>

        {/* Project Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">{project.name}</h1>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs px-3 py-1 bg-gray-100 rounded-full">
              {project.category}
            </span>
            {project.featured && (
              <span className="text-xs px-3 py-1 bg-yellow-100 rounded-full">
                ⭐ Featured
              </span>
            )}
            {project.projectType && (
              <span className="text-xs px-3 py-1 bg-blue-100 rounded-full">
                {project.projectType}
              </span>
            )}
            {project.status && (
              <span className="text-xs px-3 py-1 bg-green-100 rounded-full">
                {project.status}
              </span>
            )}
          </div>
          {/* Project Meta Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-black/70">
            {project.startDate && (
              <div>
                <span className="text-[10px] uppercase tracking-[0.12em] text-black/60">Start Date</span>
                <div className="mt-1">{new Date(project.startDate).toLocaleDateString()}</div>
              </div>
            )}
            {project.endDate && (
              <div>
                <span className="text-[10px] uppercase tracking-[0.12em] text-black/60">End Date</span>
                <div className="mt-1">{new Date(project.endDate).toLocaleDateString()}</div>
              </div>
            )}
            {project.duration && (
              <div>
                <span className="text-[10px] uppercase tracking-[0.12em] text-black/60">Duration</span>
                <div className="mt-1">{project.duration}</div>
              </div>
            )}
            {project.teamSize && (
              <div>
                <span className="text-[10px] uppercase tracking-[0.12em] text-black/60">Team Size</span>
                <div className="mt-1">{project.teamSize}</div>
              </div>
            )}
          </div>
          {project.client && (
            <div className="mt-4 text-sm">
              <span className="text-black/60">Client: </span>
              <span className="font-medium">{project.client}</span>
            </div>
          )}
          {project.role && (
            <div className="mt-2 text-sm">
              <span className="text-black/60">Role: </span>
              <span className="font-medium">{project.role}</span>
            </div>
          )}
        </div>

        {/* Cover Image */}
        {project.coverImage && (
          <div className="mb-12">
            <img
              src={project.coverImage}
              alt={`${project.name} cover`}
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
        )}

        {/* Screenshots Gallery */}
        {project.screenshots && project.screenshots.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Screenshots</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.screenshots.map((screenshot, index) => (
                <div key={index} className="rounded-lg overflow-hidden border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow">
                  <img
                    src={screenshot}
                    alt={`${project.name} screenshot ${index + 1}`}
                    className="w-full h-auto object-cover"
                    onClick={() => window.open(screenshot, '_blank')}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Graphics Gallery - For Graphic/Marketing projects */}
        {project.graphicImages && project.graphicImages.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Design Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {project.graphicImages.map((image, index) => (
                <div
                  key={index}
                  className="relative group rounded-lg overflow-hidden border border-gray-200 cursor-pointer hover:shadow-xl transition-all"
                  onClick={() => window.open(image, '_blank')}
                >
                  <img
                    src={image}
                    alt={`${project.name} graphic ${index + 1}`}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
                      View Full Size
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Color Palette - For Graphic projects */}
        {project.colorPalette && project.colorPalette.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Color Palette</h2>
            <div className="flex flex-wrap gap-3">
              {project.colorPalette.map((color, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium shadow-sm"
                  style={{ backgroundColor: color, color: '#fff' }}
                >
                  {color}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Presentation Embed - For Presentation projects */}
        {project.category === 'Presentation' && project.presentationEmbed && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Presentation</h2>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div dangerouslySetInnerHTML={{ __html: project.presentationEmbed }} />
            </div>
          </div>
        )}

        {/* Presentation Info */}
        {project.category === 'Presentation' && (
          <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            {project.presentationType && (
              <div>
                <span className="text-[10px] uppercase tracking-[0.12em] text-black/60">Type</span>
                <div className="mt-1 text-sm font-medium">{project.presentationType}</div>
              </div>
            )}
            {project.slideCount && (
              <div>
                <span className="text-[10px] uppercase tracking-[0.12em] text-black/60">Slides</span>
                <div className="mt-1 text-sm font-medium">{project.slideCount}</div>
              </div>
            )}
            {project.presentationUrl && (
              <div>
                <a
                  href={project.presentationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  View on Canva/Google Slides ↗
                </a>
              </div>
            )}
          </div>
        )}

        {/* Description */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">About This Project</h2>
          <p className="text-[13px] leading-6 text-black/80 whitespace-pre-line">
            {project.description}
          </p>
        </div>

        {/* Tech Stack */}
        {project.techStack && project.techStack.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Key Features */}
        {project.keyFeatures && project.keyFeatures.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Key Features</h2>
            <ul className="space-y-2">
              {project.keyFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-[13px] leading-6">
                  <span className="text-black/60 mt-1">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Responsibilities */}
        {project.responsibilities && project.responsibilities.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4">My Responsibilities</h2>
            <ul className="space-y-2">
              {project.responsibilities.map((resp, index) => (
                <li key={index} className="flex items-start gap-2 text-[13px] leading-6">
                  <span className="text-black/60 mt-1">•</span>
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Achievements */}
        {project.achievements && project.achievements.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Achievements</h2>
            <ul className="space-y-2">
              {project.achievements.map((achievement, index) => (
                <li key={index} className="flex items-start gap-2 text-[13px] leading-6">
                  <span className="text-black/60 mt-1">•</span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Project Goals */}
        {project.projectGoals && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Project Goals</h2>
            <p className="text-[13px] leading-6 text-black/80 whitespace-pre-line">
              {project.projectGoals}
            </p>
          </div>
        )}

        {/* Challenges */}
        {project.challenges && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Challenges Faced</h2>
            <p className="text-[13px] leading-6 text-black/80 whitespace-pre-line">
              {project.challenges}
            </p>
          </div>
        )}

        {/* Lessons Learned */}
        {project.lessonsLearned && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Lessons Learned</h2>
            <p className="text-[13px] leading-6 text-black/80 whitespace-pre-line">
              {project.lessonsLearned}
            </p>
          </div>
        )}

        {/* Design Files - For Graphic projects */}
        {project.designFiles && project.designFiles.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Design Source Files</h2>
            <div className="space-y-2">
              {project.designFiles.map((file, index) => (
                <a
                  key={index}
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <div className="font-medium">{file.name}</div>
                    <div className="text-sm text-gray-600">{file.type}</div>
                  </div>
                  <span className="text-blue-600 hover:underline">View ↗</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Video/Audio/Interactive Demo */}
        {(project.videoUrl || project.audioUrl || project.interactiveDemo) && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Media</h2>
            <div className="space-y-4">
              {project.videoUrl && (
                <div>
                  <h3 className="text-sm font-medium mb-2">Video Walkthrough</h3>
                  <div className="aspect-video rounded-lg overflow-hidden border border-gray-200">
                    <iframe
                      src={project.videoUrl}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
              {project.audioUrl && (
                <div>
                  <h3 className="text-sm font-medium mb-2">Audio</h3>
                  <audio controls className="w-full">
                    <source src={project.audioUrl} />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}
              {project.interactiveDemo && (
                <div>
                  <h3 className="text-sm font-medium mb-2">Interactive Demo</h3>
                  <a
                    href={project.interactiveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                  >
                    Try Interactive Demo ↗
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Case Study */}
        {project.caseStudy && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Case Study</h2>
            <div className="prose prose-sm max-w-none">
              <div className="text-[13px] leading-6 text-black/80 whitespace-pre-line">
                {project.caseStudy}
              </div>
            </div>
          </div>
        )}

        {/* Links */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Links & Resources</h2>
          <div className="flex flex-wrap gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-black text-white rounded-md hover:bg-black/80 transition-colors inline-flex items-center gap-2"
              >
                View Live Site ↗
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-black/20 rounded-md hover:bg-black/5 transition-colors inline-flex items-center gap-2"
              >
                View Code ↗
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-black/20 rounded-md hover:bg-black/5 transition-colors inline-flex items-center gap-2"
              >
                Watch Demo ↗
              </a>
            )}
            {project.documentationUrl && (
              <a
                href={project.documentationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-black/20 rounded-md hover:bg-black/5 transition-colors inline-flex items-center gap-2"
              >
                Documentation ↗
              </a>
            )}
            {project.presentationPdf && (
              <a
                href={project.presentationPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-black/20 rounded-md hover:bg-black/5 transition-colors inline-flex items-center gap-2"
              >
                Download PDF ↗
              </a>
            )}
            {project.portfolioUrl && (
              <a
                href={project.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-black/20 rounded-md hover:bg-black/5 transition-colors inline-flex items-center gap-2"
              >
                View Portfolio ↗
              </a>
            )}
            {project.behanceUrl && (
              <a
                href={project.behanceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-black/20 rounded-md hover:bg-black/5 transition-colors inline-flex items-center gap-2"
              >
                Behance ↗
              </a>
            )}
            {project.dribbbleUrl && (
              <a
                href={project.dribbbleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-black/20 rounded-md hover:bg-black/5 transition-colors inline-flex items-center gap-2"
              >
                Dribbble ↗
              </a>
            )}
            {project.figmaUrl && (
              <a
                href={project.figmaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-black/20 rounded-md hover:bg-black/5 transition-colors inline-flex items-center gap-2"
              >
                Figma ↗
              </a>
            )}
            {project.linkedinUrl && (
              <a
                href={project.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-black/20 rounded-md hover:bg-black/5 transition-colors inline-flex items-center gap-2"
              >
                LinkedIn ↗
              </a>
            )}
            {project.twitterUrl && (
              <a
                href={project.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-black/20 rounded-md hover:bg-black/5 transition-colors inline-flex items-center gap-2"
              >
                Twitter/X ↗
              </a>
            )}
            <button
              onClick={handleCollaborate}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Collaborate with me on this
            </button>
          </div>
        </div>

        {/* Back to Work */}
        <div className="mt-12 pt-8 border-t border-black/10">
          <Link
            href="/work"
            className="group inline-flex items-center gap-1 select-none text-sm"
          >
            <span className="transition-transform duration-500 ease-out group-hover:-translate-x-1">[</span>
            <span className="underline-offset-4 group-hover:underline">← Back to All Work</span>
            <span className="transition-transform duration-500 ease-out group-hover:translate-x-1">]</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

