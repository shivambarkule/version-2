'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function AboutUsPage() {
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')

  // Mock functions for button interactions
  const handleGetStarted = () => {
    setNotificationMessage('Starting consultation process... Redirecting to contact form')
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
    // Mock API call
    console.log('Opening consultation form')
  }

  const handleLearnMore = () => {
    setNotificationMessage('Opening detailed information...')
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
    // Mock navigation
    console.log('Navigating to detailed information')
  }

  return (
    <main className="min-h-screen">
      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          {notificationMessage}
        </div>
      )}
      
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gray-100 py-20 px-6">
        <div className="max-w-8xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
              About Pipely
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We are a team of passionate experts dedicated to transforming businesses through innovative solutions and strategic consulting.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 px-6">
        <div className="max-w-8xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Mission */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                To empower businesses with innovative solutions that drive growth, efficiency, and sustainable success. We believe in building lasting partnerships that transform challenges into opportunities.
              </p>
              <div className="bg-[#fef2f2] rounded-2xl p-6">
                <h3 className="text-xl font-bold text-black mb-3">What We Do</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Strategic consulting and business transformation
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Digital transformation and technology solutions
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Process optimization and operational excellence
                  </li>
                </ul>
              </div>
            </div>

            {/* Vision */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
                Our Vision
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                To be the leading partner for businesses seeking innovative solutions and sustainable growth. We envision a future where every organization can achieve its full potential through strategic guidance and cutting-edge technology.
              </p>
              <div className="bg-blue-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-black mb-3">Our Goals</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Help 1000+ businesses achieve digital transformation
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Maintain 99% client satisfaction rate
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Expand to serve global markets by 2025
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Stats Section */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-8xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Our Impact in Numbers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real results that demonstrate our commitment to client success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Stat 1 */}
            <div className="text-center">
              <div className="text-5xl font-bold text-black mb-4">500+</div>
              <p className="text-gray-600 text-lg">Happy Clients</p>
            </div>

            {/* Stat 2 */}
            <div className="text-center">
              <div className="text-5xl font-bold text-black mb-4">98%</div>
              <p className="text-gray-600 text-lg">Success Rate</p>
            </div>

            {/* Stat 3 */}
            <div className="text-center">
              <div className="text-5xl font-bold text-black mb-4">15+</div>
              <p className="text-gray-600 text-lg">Years Experience</p>
            </div>

            {/* Stat 4 */}
            <div className="text-center">
              <div className="text-5xl font-bold text-black mb-4">$50M+</div>
              <p className="text-gray-600 text-lg">Revenue Generated</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-gray-100 py-20 px-6">
        <div className="max-w-8xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <div className="w-16 h-16 bg-blue-200 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Collaboration</h3>
              <p className="text-gray-600 leading-relaxed">
                We believe in the power of teamwork and partnership, working closely with our clients to achieve shared goals.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <div className="w-16 h-16 bg-green-200 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Integrity</h3>
              <p className="text-gray-600 leading-relaxed">
                We maintain the highest standards of honesty and transparency in all our business relationships.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <div className="w-16 h-16 bg-purple-200 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Innovation</h3>
              <p className="text-gray-600 leading-relaxed">
                We constantly explore new ideas and technologies to deliver cutting-edge solutions for our clients.
              </p>
            </div>

            {/* Value 4 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <div className="w-16 h-16 bg-[#fef2f2] rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#ef4444]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Results</h3>
              <p className="text-gray-600 leading-relaxed">
                We are committed to delivering measurable, impactful results that drive real business value.
              </p>
            </div>

            {/* Value 5 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <div className="w-16 h-16 bg-red-200 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Passion</h3>
              <p className="text-gray-600 leading-relaxed">
                We are passionate about what we do and committed to making a positive impact on our clients' success.
              </p>
            </div>

            {/* Value 6 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <div className="w-16 h-16 bg-orange-200 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-orange-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Excellence</h3>
              <p className="text-gray-600 leading-relaxed">
                We strive for excellence in everything we do, from the quality of our advice to the implementation of our solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-100 py-20 px-6">
        <div className="max-w-8xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Meet Our Leadership Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experienced professionals who are passionate about driving your business success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white rounded-3xl p-8 text-center shadow-sm">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-6 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face" 
                  alt="Sarah Johnson - CEO"
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs text-center" style={{display: 'none'}}>
                  Sarah Johnson<br/>CEO
                </div>
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Sarah Johnson</h3>
              <p className="text-gray-600 mb-4">Chief Executive Officer</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                With over 15 years of experience in strategic consulting, Sarah leads our mission to transform businesses through innovative solutions.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white rounded-3xl p-8 text-center shadow-sm">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-6 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face" 
                  alt="Michael Chen - CTO"
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs text-center" style={{display: 'none'}}>
                  Michael Chen<br/>CTO
                </div>
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Michael Chen</h3>
              <p className="text-gray-600 mb-4">Chief Technology Officer</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Michael brings deep expertise in digital transformation and technology strategy, helping clients leverage cutting-edge solutions.
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white rounded-3xl p-8 text-center shadow-sm">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-6 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face" 
                  alt="Emily Rodriguez - Head of Operations"
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs text-center" style={{display: 'none'}}>
                  Emily Rodriguez<br/>Operations
                </div>
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Emily Rodriguez</h3>
              <p className="text-gray-600 mb-4">Head of Operations</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Emily specializes in operational excellence and process optimization, ensuring our clients achieve maximum efficiency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#f59e0b] py-20 px-6">
        <div className="max-w-8xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Work Together?
          </h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help transform your business and drive sustainable growth
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleGetStarted}
              className="bg-black text-white px-8 py-4 rounded-xl font-bold text-sm tracking-wide hover:bg-gray-800 transition-colors"
            >
              GET STARTED
            </button>
            <button 
              onClick={handleLearnMore}
              className="border-2 border-black text-black px-8 py-4 rounded-xl font-bold text-sm tracking-wide hover:bg-black hover:text-white transition-colors"
            >
              LEARN MORE
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
