'use client';

import { useState, useEffect } from 'react';
import { getAboutItemsByType, getAboutPageContent, AboutItem, AboutPageContent } from '@/lib/firebase-data';

export default function AboutPage() {
  const [skills, setSkills] = useState<AboutItem[]>([]);
  const [publications, setPublications] = useState<AboutItem[]>([]);
  const [experience, setExperience] = useState<AboutItem[]>([]);
  const [education, setEducation] = useState<AboutItem[]>([]);
  const [certificates, setCertificates] = useState<AboutItem[]>([]);
  const [pageContent, setPageContent] = useState<AboutPageContent>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAboutData() {
      try {
        const [skillsData, publicationsData, experienceData, educationData, certificatesData, content] = await Promise.all([
          getAboutItemsByType('skill'),
          getAboutItemsByType('publication'),
          getAboutItemsByType('experience'),
          getAboutItemsByType('education'),
          getAboutItemsByType('certificate'),
          getAboutPageContent(),
        ]);
        setSkills(skillsData);
        setPublications(publicationsData);
        setExperience(experienceData);
        setEducation(educationData);
        setCertificates(certificatesData);
        setPageContent(content);
      } catch (error) {
        console.error('Error loading about data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadAboutData();
  }, []);

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill.title);
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <div className="min-h-full">
      <div className="p-6 md:p-10 pb-20">
        {/* Breadcrumb Navigation */}
        <nav className="text-[11px] uppercase tracking-[0.12em] text-black/60 mb-8">
          <a href="/" className="hover:text-black transition-colors">
            HOME
          </a>
          <span className="mx-2">&gt;</span>
          <span className="text-black font-medium">ABOUT</span>
        </nav>

        {/* Profile Image */}
        <div className="float-right ml-8 mb-8 w-48 h-64 rounded-sm overflow-hidden">
          <img
            src={pageContent.profileImage || "/profilepic2.jpg"}
            alt="Shivam Barkule"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Introduction */}
        {pageContent.introduction && (
          <div className="mb-8">
            <p className="text-[13px] leading-6 mb-4">
              {pageContent.introduction}
            </p>
          </div>
        )}

        {/* Objective */}
        {pageContent.objective && (
          <div className="text-[13px] leading-6 space-y-4 mb-12">
            <p>
              {pageContent.objective}
            </p>
          </div>
        )}

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {pageContent.yearsExperience !== undefined && (
            <div>
              <div className="text-[24px] font-normal mb-1">{pageContent.yearsExperience}+</div>
              <div className="text-[10px] uppercase tracking-[0.12em] text-black/60">
                YEARS EXPERIENCE
              </div>
            </div>
          )}
          {pageContent.projectsCount !== undefined && (
            <div>
              <div className="text-[24px] font-normal mb-1">{pageContent.projectsCount}+</div>
              <div className="text-[10px] uppercase tracking-[0.12em] text-black/60">
                PROJECTS
              </div>
            </div>
          )}
          {pageContent.certificationsCount !== undefined && (
            <div>
              <div className="text-[24px] font-normal mb-1">{pageContent.certificationsCount}+</div>
              <div className="text-[10px] uppercase tracking-[0.12em] text-black/60">
                CERTIFICATIONS
              </div>
            </div>
          )}
          {pageContent.publicationsCount !== undefined && (
            <div>
              <div className="text-[24px] font-normal mb-1">{pageContent.publicationsCount}</div>
              <div className="text-[10px] uppercase tracking-[0.12em] text-black/60">
                PUBLICATIONS
              </div>
            </div>
          )}
        </div>

        {/* Skills Section */}
        <div className="mb-16">
          <h3 className="text-[11px] uppercase tracking-[0.12em] text-black font-medium mb-6">
            Skills
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[13px] leading-6">
            {/* Static Skills */}
            <div>
              <h4 className="font-medium mb-2">Programming Languages</h4>
              <p className="text-black/70">
                Python, Java, JavaScript, TypeScript, SQL
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Web Development</h4>
              <p className="text-black/70">
                React.js, Node.js (Express), HTML/CSS
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Cloud/DevOps</h4>
              <p className="text-black/70">AWS (Basic), Git/GitHub, Docker</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Tools/Frameworks</h4>
              <p className="text-black/70">
                VS Code, Postman, REST APIs, Cursor, Smartsheet
              </p>
            </div>
            {/* Firebase Skills */}
            {Object.entries(skillsByCategory).map(([category, skillList]) => (
              <div key={category}>
                <h4 className="font-medium mb-2">{category}</h4>
                <p className="text-black/70">{skillList.join(', ')}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Publications */}
        <div className="mb-16">
          <h3 className="text-[11px] uppercase tracking-[0.12em] text-black font-medium mb-6">
            Publications
          </h3>
          <div className="space-y-4 text-[13px] leading-6">
            {/* Static Publications */}
            <div className="group">
              <span>• </span>
              <a
                href="https://ieeexplore.ieee.org/document/10837535"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-black transition-colors duration-300 group-hover:underline underline-offset-4"
              >
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  Incentivizing Sustainable Behaviour using Blockchain for
                  Ecofriendly Transportation
                </span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-black/70">
                  ↗
                </span>
              </a>
            </div>
            <div className="group">
              <span>• </span>
              <a
                href="https://www.igi-global.com/chapter/innovative-scientific-approaches-and-digital-methods-for-autism-identification-and-diagnosis/375263"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-black transition-colors duration-300 group-hover:underline underline-offset-4"
              >
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  Innovative Scientific Approaches and Digital Methods for
                  Autism Identification and Diagnosis
                </span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-black/70">
                  ↗
                </span>
              </a>
            </div>
            {/* Firebase Publications */}
            {publications.map((pub) => (
              <div key={pub.id} className="group">
                <span>• </span>
                <a
                  href={pub.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-black transition-colors duration-300 group-hover:underline underline-offset-4"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    {pub.title}
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-black/70">
                    ↗
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Section */}
        <div className="mb-16">
          <div className="flex">
            <div className="w-20 flex-shrink-0">
              <h2 className="text-[11px] uppercase tracking-[0.12em] text-black font-medium">
                EXPERIENCE
              </h2>
            </div>
            <div className="flex-1 ml-8">
              <div className="space-y-0">
                {/* Static Experience */}
                <div className="flex justify-between items-center py-1 hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer text-[11px] leading-tight">
                  <span>WEB DEVELOPER @WEBFUDGE AGENCY, PUNE</span>
                  <span>8/2025 - TODAY</span>
                </div>
                <div className="flex justify-between items-center py-1 hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer text-[11px] leading-tight">
                  <span>
                    VICE PRESIDENT @ INFORMATION TECHNOCRATS STUDENTS FORUM,
                    VIIT
                  </span>
                  <span>9/2024 - 5/2025</span>
                </div>
                <div className="flex justify-between items-center py-1 hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer text-[11px] leading-tight">
                  <span>
                    GRAPHIC DESIGNER @ ENTREPRENEURSHIP DEVELOPMENT CELL, VIIT
                  </span>
                  <span>9/2023 - 2/2024</span>
                </div>
                <div className="flex justify-between items-center py-1 hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer text-[11px] leading-tight">
                  <span>
                    MEMBERSHIP DEVELOPMENT DIRECTOR @ ROTARACT CLUB OF VIIT,
                    PUNE
                  </span>
                  <span>7/2024 - 5/2025</span>
                </div>
                {/* Firebase Experience */}
                {experience.map((exp) => (
                  <div
                    key={exp.id}
                    className="flex justify-between items-center py-1 hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer text-[11px] leading-tight"
                  >
                    <span>{exp.title}</span>
                    {exp.date && <span>{exp.date}</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-16">
          <div className="flex">
            <div className="w-20 flex-shrink-0">
              <h2 className="text-[11px] uppercase tracking-[0.12em] text-black font-medium">
                EDUCATION
              </h2>
            </div>
            <div className="flex-1 ml-8">
              <div className="space-y-0">
                {/* Static Education */}
                <div className="flex justify-between items-center py-1 hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer text-[11px] leading-tight">
                  <span>
                    BRACTS VISHWAKARMA INSTITUTES OF INFORMATION TECHNOLOGY /
                    B.TECH (CGPA: 7.9)
                  </span>
                  <span>11/2022 - 6/2026</span>
                </div>
                <div className="flex justify-between items-center py-1 hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer text-[11px] leading-tight">
                  <span>SANT TUKARAM COLLEGE / 12TH (HSC, 81.5%)</span>
                  <span>2020 - 2022</span>
                </div>
                <div className="flex justify-between items-center py-1 hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer text-[11px] leading-tight">
                  <span>SCOTTISH ACADEMY / 10TH (SSC, 93.6%)</span>
                  <span>2017 - 2020</span>
                </div>
                {/* Firebase Education */}
                {education.map((edu) => (
                  <div
                    key={edu.id}
                    className="flex justify-between items-center py-1 hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer text-[11px] leading-tight"
                  >
                    <span>{edu.title}</span>
                    {edu.date && <span>{edu.date}</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Certifications Section */}
        <div>
          <div className="flex">
            <div className="w-20 flex-shrink-0">
              <h2 className="text-[11px] uppercase tracking-[0.12em] text-black font-medium">
                CERTIFICATIONS
              </h2>
            </div>
            <div className="flex-1 ml-8">
              {/* Static Certifications */}
              <div className="flex justify-between items-center py-1 hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer text-[11px] leading-tight">
                <span>
                  Fundamentals of Deep Learning by NVIDIA Deep Learning
                  Institute
                </span>
              </div>
              <div className="flex justify-between items-center py-1 hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer text-[11px] leading-tight">
                <span>IBM Full Stack Software Developer by IBM-Coursera</span>
              </div>
              <div className="flex justify-between items-center py-1 hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer text-[11px] leading-tight">
                <span>
                  Decision Trees, Random Forests, AdaBoost & XGBoost by Udemy
                </span>
              </div>
              <div className="flex justify-between items-center py-1 hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer text-[11px] leading-tight">
                <span>Smartsheet Tutorial for Beginners by Coursera</span>
              </div>
              <div className="flex justify-between items-center py-1 hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer text-[11px] leading-tight">
                <span>
                  Learn Algorithms and Data Structures in Java for Day-to-Day
                  Applications by Infosys Springboard
                </span>
              </div>
              <div className="flex justify-between items-center py-1 hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer text-[11px] leading-tight">
                <span>
                  AWS Academy Graduate by AWS Academy Cloud Foundations
                </span>
              </div>
              {/* Firebase Certifications */}
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className={`flex justify-between items-center py-1 hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer text-[11px] leading-tight ${cert.url ? 'cursor-pointer' : ''}`}
                  onClick={() => cert.url && window.open(cert.url, '_blank')}
                >
                  <span>{cert.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
