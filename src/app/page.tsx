'use client'

import { useEffect, useRef, useState } from 'react'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import AboutUsSection from '@/components/AboutUsSection'
import ExpertiseSection from '@/components/ExpertiseSection'
import Footer from '@/components/Footer'

export default function Home() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const [lineProgress, setLineProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return

      const rect = timelineRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Calculate timeline progress (0 to 1)
      const timelineTop = rect.top
      const timelineHeight = rect.height
      const scrollProgress = Math.max(0, Math.min(1, (windowHeight - timelineTop) / (windowHeight + timelineHeight)))
      setLineProgress(scrollProgress)
      
      // Calculate which timeline items should be visible
      const timelineItems = timelineRef.current.querySelectorAll('.timeline-item')
      const newVisibleItems: number[] = []
      
      timelineItems.forEach((item, index) => {
        const itemRect = item.getBoundingClientRect()
        const itemTop = itemRect.top
        const itemBottom = itemRect.bottom
        
        // If item is in viewport, add to visible items
        if (itemTop <= windowHeight * 0.8 && itemBottom >= windowHeight * 0.2) {
          newVisibleItems.push(index)
        }
      })
      
      setVisibleItems(newVisibleItems)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutUsSection />
      <ExpertiseSection />
      {/* Timeline Card Section */}
      <section className="bg-brand-gray-light py-20 px-6">
        <div className="max-w-8xl mx-auto">
          <div className="bg-white rounded-3xl p-10 md:p-14 shadow-sm">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left Content */}
              <div className="space-y-8">
                <div>
                  <p className="text-brand-gray uppercase tracking-wide text-sm font-medium mb-6">
                    STORY
                  </p>
                  <h2 className="text-4xl lg:text-5xl font-bold text-brand-dark leading-tight mb-6">
                    Our journey
                  </h2>
                  <p className="text-lg text-brand-gray leading-relaxed">
                    Each achievement reflects our commitment to excellence and growth.
                  </p>
                </div>
              </div>

              {/* Right Content - Timeline */}
              <div className="relative" ref={timelineRef}>
                {/* Background Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-brand-gray-light"></div>
                
                {/* Moving Timeline Line */}
                <div 
                  className="absolute left-8 top-0 w-0.5 bg-brand-primary transition-all duration-1000 ease-out"
                  style={{ 
                    height: `${lineProgress * 100}%`,
                    transform: 'translateY(0)'
                  }}
                ></div>
                
                {/* Timeline Items */}
                <div className="space-y-12">
                  {/* 2008 */}
                  <div className={`timeline-item relative flex items-start transition-all duration-1000 ease-out ${
                    visibleItems.includes(0) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                  }`}>
                    <div className="absolute left-6 w-4 h-4 bg-brand-primary rounded-full transform -translate-x-2 transition-all duration-700 ease-out ${
                      visibleItems.includes(0) ? 'scale-100' : 'scale-0'
                    }"></div>
                    <div className="ml-16">
                      <div className="text-3xl font-bold text-brand-dark mb-4 transition-all duration-700 ease-out ${
                        visibleItems.includes(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }">2008</div>
                      <p className="text-brand-gray leading-relaxed transition-all duration-700 ease-out delay-200 ${
                        visibleItems.includes(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }">
                        Founded with a vision to transform businesses, we started our journey. Our first client project set the stage for future successes.
                      </p>
                    </div>
                  </div>

                  {/* 2014 */}
                  <div className={`timeline-item relative flex items-start transition-all duration-1000 ease-out ${
                    visibleItems.includes(1) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                  }`}>
                    <div className="absolute left-6 w-4 h-4 bg-brand-primary rounded-full transform -translate-x-2 transition-all duration-700 ease-out ${
                      visibleItems.includes(1) ? 'scale-100' : 'scale-0'
                    }"></div>
                    <div className="ml-16">
                      <div className="text-3xl font-bold text-brand-dark mb-4 transition-all duration-700 ease-out ${
                        visibleItems.includes(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }">2014</div>
                      <p className="text-brand-gray leading-relaxed transition-all duration-700 ease-out delay-200 ${
                        visibleItems.includes(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }">
                        Expanded our services and reached our 100th client milestone. Established partnerships with leading technology providers.
                      </p>
                    </div>
                  </div>

                  {/* 2018 */}
                  <div className={`timeline-item relative flex items-start transition-all duration-1000 ease-out ${
                    visibleItems.includes(2) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                  }`}>
                    <div className="absolute left-6 w-4 h-4 bg-brand-primary rounded-full transform -translate-x-2 transition-all duration-700 ease-out ${
                      visibleItems.includes(2) ? 'scale-100' : 'scale-0'
                    }"></div>
                    <div className="ml-16">
                      <div className="text-3xl font-bold text-brand-dark mb-4 transition-all duration-700 ease-out ${
                        visibleItems.includes(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }">2018</div>
                      <p className="text-brand-gray leading-relaxed transition-all duration-700 ease-out delay-200 ${
                        visibleItems.includes(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }">
                        Launched our digital transformation division and opened offices in three new cities. Achieved 500+ successful projects.
                      </p>
                    </div>
                  </div>

                  {/* 2022 */}
                  <div className={`timeline-item relative flex items-start transition-all duration-1000 ease-out ${
                    visibleItems.includes(3) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                  }`}>
                    <div className="absolute left-6 w-4 h-4 bg-brand-primary rounded-full transform -translate-x-2 transition-all duration-700 ease-out ${
                      visibleItems.includes(3) ? 'scale-100' : 'scale-0'
                    }"></div>
                    <div className="ml-16">
                      <div className="text-3xl font-bold text-brand-dark mb-4 transition-all duration-700 ease-out ${
                        visibleItems.includes(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }">2022</div>
                      <p className="text-brand-gray leading-relaxed transition-all duration-700 ease-out delay-200 ${
                        visibleItems.includes(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }">
                        Celebrated 15 years of excellence and expanded globally. Now serving clients across 25 countries with innovative solutions.
                      </p>
                    </div>
                  </div>

                  {/* 2024 */}
                  <div className={`timeline-item relative flex items-start transition-all duration-1000 ease-out ${
                    visibleItems.includes(4) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                  }`}>
                    <div className="absolute left-6 w-4 h-4 bg-brand-primary rounded-full transform -translate-x-2 transition-all duration-700 ease-out ${
                      visibleItems.includes(4) ? 'scale-100' : 'scale-0'
                    }"></div>
                    <div className="ml-16">
                      <div className="text-3xl font-bold text-brand-dark mb-4 transition-all duration-700 ease-out ${
                        visibleItems.includes(4) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }">2024</div>
                      <p className="text-brand-gray leading-relaxed transition-all duration-700 ease-out delay-200 ${
                        visibleItems.includes(4) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }">
                        Leading the industry with AI-powered solutions and sustainable business practices. Continuing to drive innovation and growth.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Blog Preview Section */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-8xl mx-auto">
          <div className="bg-brand-gray-light rounded-3xl p-10 md:p-14">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
                Latest Insights
              </h2>
              <p className="text-lg text-brand-gray max-w-2xl mx-auto mb-8">
                Discover our latest thoughts on industry trends, best practices, and innovative solutions.
              </p>
              <a 
                href="/blog" 
                className="inline-flex items-center bg-brand-primary text-white px-8 py-4 rounded-xl font-bold text-sm tracking-wide hover:bg-brand-primary/90 transition-colors"
              >
                View All Articles
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Blog Preview Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Blog Post 1 */}
              <article className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-[4/3] bg-brand-gray-light rounded-xl overflow-hidden mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80" 
                    alt="Business analytics dashboard"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-2 mb-3">
                  <span className="px-2 py-1 bg-brand-gray-light text-brand-gray text-xs rounded-full">
                    News
                  </span>
                  <span className="px-2 py-1 bg-brand-gray-light text-brand-gray text-xs rounded-full">
                    Insights
                  </span>
                </div>
                <h3 className="text-lg font-bold text-brand-dark mb-2">
                  Maximizing Efficiency in Operations
                </h3>
                <p className="text-brand-gray text-sm leading-relaxed mb-4">
                  Discover strategies to streamline your business processes and enhance productivity.
                </p>
                <a href="/blog" className="text-brand-primary font-medium text-sm hover:text-brand-primary/80 transition-colors">
                  Read More →
                </a>
              </article>

              {/* Blog Post 2 */}
              <article className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-[4/3] bg-brand-gray-light rounded-xl overflow-hidden mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" 
                    alt="Modern office workspace"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-2 mb-3">
                  <span className="px-2 py-1 bg-brand-gray-light text-brand-gray text-xs rounded-full">
                    News
                  </span>
                </div>
                <h3 className="text-lg font-bold text-brand-dark mb-2">
                  Optimizing Remote Workflows
                </h3>
                <p className="text-brand-gray text-sm leading-relaxed mb-4">
                  Learn how digital tools boost remote team efficiency and focus in industries.
                </p>
                <a href="/blog" className="text-brand-primary font-medium text-sm hover:text-brand-primary/80 transition-colors">
                  Read More →
                </a>
              </article>

              {/* Blog Post 3 */}
              <article className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-[4/3] bg-brand-gray-light rounded-xl overflow-hidden mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                    alt="Cybersecurity and data protection"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-2 mb-3">
                  <span className="px-2 py-1 bg-brand-gray-light text-brand-gray text-xs rounded-full">
                    Insights
                  </span>
                </div>
                <h3 className="text-lg font-bold text-brand-dark mb-2">
                  Enhancing Cybersecurity Practices
                </h3>
                <p className="text-brand-gray text-sm leading-relaxed mb-4">
                  Uncover smart ways to protect digital assets and ensure operational resilience.
                </p>
                <a href="/blog" className="text-brand-primary font-medium text-sm hover:text-brand-primary/80 transition-colors">
                  Read More →
                </a>
              </article>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}
