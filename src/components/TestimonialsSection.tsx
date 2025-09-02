'use client'

import { useState } from 'react'

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  
  const testimonials = [
    {
      quote: "Their team seamlessly integrated with ours, listening closely and adapting to our unique challenges. Their ability to align with our goals and respond with tailored strategies made the entire process smooth and impactful, leading to real progress and lasting improvements.",
      name: "Jean Harris",
      position: "Ops, NovaCore",
      image: "/api/placeholder/60/60"
    },
    {
      quote: "They brought clarity to complex problems, breaking down barriers and delivering innovative solutions. I was truly impressed by how quickly their strategies turned into real, tangible outcomes, driving measurable growth and success for our business.",
      name: "John Doe", 
      position: "CEO, Tech Innovations",
      image: "/api/placeholder/60/60"
    },
    {
      quote: "We faced a turning point and needed expert guidance. They stepped in with a clear vision and strong execution. Their strategies not only solved immediate pain points but created lasting change that boosted our productivity and internal alignment.",
      name: "Ryan Cole",
      position: "CEO, Novent",
      image: "/api/placeholder/60/60"
    },
    {
      quote: "Their insight into our industry challenges was outstanding. They reshaped our approach with precision, clarity, and innovation. The results were not only measurable but also impactful in shaping the future path of our organization.",
      name: "Paul West",
      position: "CEO, Lumora",
      image: "/api/placeholder/60/60"
    },
    {
      quote: "They quickly identified key bottlenecks in our process and implemented creative, actionable solutions. The improvements were visible almost immediately, and their collaborative approach helped align our entire team.",
      name: "Mark King",
      position: "CEO, Soltek",
      image: "/api/placeholder/60/60"
    }
  ]

  return (
    <section className="bg-gray-100 py-20 px-6">
      <div className="bg-white rounded-3xl max-w-8xl mx-auto px-10 py-20 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <p className="text-gray-500 uppercase tracking-wide text-sm font-medium mb-6">
                TESTIMONIALS
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                What they say about Us?
              </h2>
              <p className="text-lg text-gray-600 mt-6 leading-relaxed">
                Don't just take our word for it. Here's what our clients have to say about their experience working with us.
              </p>
            </div>
            
            <button className="bg-[#ef4444] text-white px-8 py-4 rounded-xl font-bold text-sm tracking-wide hover:bg-[#dc2626] transition-colors">
              ABOUT US
            </button>

            {/* Navigation Arrows */}
            <div className="flex space-x-4">
              <button 
                onClick={() => setCurrentTestimonial(currentTestimonial === 0 ? testimonials.length - 1 : currentTestimonial - 1)}
                className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600"
                aria-label="Previous testimonial"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button 
                onClick={() => setCurrentTestimonial(currentTestimonial === testimonials.length - 1 ? 0 : currentTestimonial + 1)}
                className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600"
                aria-label="Next testimonial"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Side - Moving Queue of Testimonials */}
          <div className="relative">
            {/* Moving Cards Container */}
            <div className="relative overflow-hidden mb-8">
              <div className="flex gap-6 animate-scroll-testimonials" style={{width: 'max-content'}}>
                {/* Testimonial Card 1 */}
                <div className="bg-gray-50 rounded-2xl p-6 w-[320px] flex-shrink-0 shadow-sm">
                  <p className="text-gray-700 text-sm leading-relaxed mb-6">
                    "They brought clarity to complex problems, breaking down barriers and delivering innovative solutions. I was truly impressed by how quickly their strategies turned into real, tangible outcomes, driving measurable growth and success for our business."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-black text-sm">John Doe</div>
                      <div className="text-gray-500 text-xs">CEO, Innova</div>
                    </div>
                  </div>
                </div>

                {/* Testimonial Card 2 */}
                <div className="bg-gray-50 rounded-2xl p-6 w-[320px] flex-shrink-0 shadow-sm">
                  <p className="text-gray-700 text-sm leading-relaxed mb-6">
                    "We faced a turning point and needed expert guidance. They stepped in with a clear vision and strong execution. Their strategies not only solved immediate pain points but created lasting change that boosted our productivity and internal alignment."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-black text-sm">Ryan Cole</div>
                      <div className="text-gray-500 text-xs">CEO, Novent</div>
                    </div>
                  </div>
                </div>

                {/* Testimonial Card 3 */}
                <div className="bg-gray-50 rounded-2xl p-6 w-[320px] flex-shrink-0 shadow-sm">
                  <p className="text-gray-700 text-sm leading-relaxed mb-6">
                    "Their insight into our industry challenges was outstanding. They reshaped our approach with precision, clarity, and innovation. The results were not only measurable but also impactful in shaping the future path of our organization. Truly a great experience."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-black text-sm">Paul West</div>
                      <div className="text-gray-500 text-xs">CEO, Lumora</div>
                    </div>
                  </div>
                </div>

                {/* Testimonial Card 4 */}
                <div className="bg-gray-50 rounded-2xl p-6 w-[320px] flex-shrink-0 shadow-sm">
                  <p className="text-gray-700 text-sm leading-relaxed mb-6">
                    "They quickly identified key bottlenecks in our process and implemented creative, actionable solutions. The improvements were visible almost immediately, and their collaborative approach helped align our entire team behind the new direction and goals."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-black text-sm">Mark King</div>
                      <div className="text-gray-500 text-xs">CEO, Soltek</div>
                    </div>
                  </div>
                </div>

                {/* Testimonial Card 5 */}
                <div className="bg-gray-50 rounded-2xl p-6 w-[320px] flex-shrink-0 shadow-sm">
                  <p className="text-gray-700 text-sm leading-relaxed mb-6">
                    "They brought clarity to complex problems, breaking down barriers and delivering innovative solutions. I was thoroughly impressed by how quickly their strategies turned into real, tangible outcomes, driving measurable growth and success for our business."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-black text-sm">John Doe</div>
                      <div className="text-gray-500 text-xs">CEO, Innova</div>
                    </div>
                  </div>
                </div>

                {/* Testimonial Card 6 */}
                <div className="bg-gray-50 rounded-2xl p-6 w-[320px] flex-shrink-0 shadow-sm">
                  <p className="text-gray-700 text-sm leading-relaxed mb-6">
                    "We faced a turning point and needed expert guidance. They stepped in with a clear vision and strong execution. Their strategies not only solved immediate pain points but created lasting change that boosted our productivity and internal alignment."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-black text-sm">Ryan Cole</div>
                      <div className="text-gray-500 text-xs">CEO, Novent</div>
                    </div>
                  </div>
                </div>

                {/* Testimonial Card 7 */}
                <div className="bg-gray-50 rounded-2xl p-6 w-[320px] flex-shrink-0 shadow-sm">
                  <p className="text-gray-700 text-sm leading-relaxed mb-6">
                    "Their insight into our industry challenges was outstanding. They reshaped our approach with precision, clarity, and innovation. The results were not only measurable but also impactful in shaping the future path of our organization. Truly a great experience."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-black text-sm">Paul West</div>
                      <div className="text-gray-500 text-xs">CEO, Lumora</div>
                    </div>
                  </div>
                </div>

                {/* Testimonial Card 8 */}
                <div className="bg-gray-50 rounded-2xl p-6 w-[320px] flex-shrink-0 shadow-sm">
                  <p className="text-gray-700 text-sm leading-relaxed mb-6">
                    "They quickly identified key bottlenecks in our process and implemented creative, actionable solutions. The improvements were visible almost immediately, and their collaborative approach helped align our entire team behind the new direction and goals."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-black text-sm">Mark King</div>
                      <div className="text-gray-500 text-xs">CEO, Soltek</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex justify-start gap-3">
              <button aria-label="Previous testimonial" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button aria-label="Next testimonial" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
