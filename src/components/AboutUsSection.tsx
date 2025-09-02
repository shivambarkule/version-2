'use client'

import { useEffect, useState } from 'react'

export default function AboutUsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  
  const testimonials = [
    {
      quote: "Their team seamlessly integrated with ours, listening closely and adapting to our unique challenges. Their ability to align with our goals and respond with tailored strategies made the entire process smooth and impactful, leading to real progress and lasting improvements.",
      name: "Jean Harris",
      position: "Ops, NovaCare",
      color: "from-purple-400/30 to-purple-600/30",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      avatarBg: "bg-purple-100",
      iconBg: "bg-purple-200"
    },
    {
      quote: "They brought clarity to complex problems, breaking down barriers and delivering innovative solutions. I was truly impressed by how quickly their strategies turned into real, tangible outcomes.",
      name: "John Doe",
      position: "CEO, Tech Innovations",
      color: "from-blue-400/20 to-blue-600/20",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      avatarBg: "bg-blue-100",
      iconBg: "bg-blue-200"
    },
    {
      quote: "I was truly impressed by how quickly their strategies turned into real, tangible outcomes, driving measurable growth and success for our business.",
      name: "Sarah Wilson",
      position: "Director, Growth Co",
      color: "from-green-400/20 to-green-600/20",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      avatarBg: "bg-green-100",
      iconBg: "bg-green-200"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <section className="bg-gray-100 py-24 pb-12 px-6">
      <div className="max-w-8xl mx-auto">
        {/* Flapping Card Section */}
        <div className="bg-white rounded-3xl p-10 md:p-14 shadow-sm relative overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <p className="text-gray-500 uppercase tracking-wide text-sm font-medium mb-6">
                  ABOUT US
                </p>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  We are a team of passionate experts dedicated to transforming businesses through innovative solutions.
                </h2>
              </div>

              <p className="text-lg text-gray-600 leading-relaxed">
                With years of experience across various industries, we understand the unique challenges that businesses face in today's rapidly evolving landscape. Our mission is to provide tailored solutions that drive growth, efficiency, and sustainable success.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
                  <div className="text-gray-600 text-sm">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">98%</div>
                  <div className="text-gray-600 text-sm">Success Rate</div>
                </div>
              </div>
            </div>

            {/* Right Content - Flapping Cards */}
            <div className="relative">
              <div className="relative h-[400px]">
                {testimonials.map((testimonial, index) => {
                  const isActive = index === currentTestimonial
                  const isNext = index === (currentTestimonial + 1) % testimonials.length
                  const isPrev = index === (currentTestimonial - 1 + testimonials.length) % testimonials.length
                  
                  let transform = ''
                  let opacity = 0
                  let zIndex = 0
                  
                  if (isActive) {
                    transform = 'translateY(0) scale(1)'
                    opacity = 1
                    zIndex = 3
                  } else if (isNext) {
                    transform = 'translateY(20px) scale(0.95)'
                    opacity = 0.7
                    zIndex = 2
                  } else if (isPrev) {
                    transform = 'translateY(-20px) scale(0.95)'
                    opacity = 0.7
                    zIndex = 1
                  }
                  
                  return (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-500 ease-out ${testimonial.bgColor} ${testimonial.borderColor} border rounded-2xl p-6`}
                      style={{
                        transform,
                        opacity,
                        zIndex
                      }}
                    >
                      <div className={`bg-gradient-to-br ${testimonial.color} rounded-xl p-6 h-full flex flex-col`}>
                        <div className="flex-1">
                          <p className="text-gray-700 text-sm leading-relaxed mb-6">
                            "{testimonial.quote}"
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 ${testimonial.avatarBg} rounded-full flex items-center justify-center`}>
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <div>
                            <div className="font-bold text-gray-900 text-sm">{testimonial.name}</div>
                            <div className="text-gray-600 text-xs">{testimonial.position}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section - What they say about us */}
        <div className="bg-white rounded-3xl p-10 md:p-14 shadow-sm mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-500 uppercase tracking-wide text-sm font-medium mb-6">
                TESTIMONIALS
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                What they say about us?
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Don't just take our word for it. Here's what our clients have to say about their experience working with us.
              </p>
              
              <button className="bg-[#ef4444] text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-[#dc2626] transition-colors">
                ABOUT US
              </button>
            </div>

            {/* Right Side - Moving Queue of Logos/Cards */}
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
      </div>
    </section>
  )
}