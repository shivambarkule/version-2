'use client'

import { useState } from 'react'

export default function CaseStudySection() {
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')

  // Mock function for LEARN MORE button clicks
  const handleLearnMore = (caseStudy: string) => {
    setNotificationMessage(`Opening detailed case study: ${caseStudy}`)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
    // Mock API call
    console.log(`Fetching case study details for: ${caseStudy}`)
  }

  return (
    <section className="bg-gray-100 py-20 px-6">
      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          {notificationMessage}
        </div>
      )}
      
      <div className="max-w-8xl mx-auto">
        <div className="bg-white rounded-3xl p-10 md:p-14 shadow-sm">
          <div className="mb-12">
            <p className="text-gray-500 uppercase tracking-wide text-sm font-medium mb-6">
              CASE STUDIES
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Success stories that speak for themselves
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Discover how our strategic consulting solutions have transformed businesses across various industries, delivering measurable results and sustainable growth.
            </p>
          </div>

          {/* Case Study 1 - Operational Excellence */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
            <div className="order-2 lg:order-1">
              <div className="bg-gray-200 rounded-2xl aspect-[4/5] overflow-hidden flex items-center justify-center max-w-sm">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Business professionals collaborating on operational excellence"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
                Operational excellence
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Streamlined operational processes that increased efficiency by 30%, resulting in significant cost savings and improved productivity across the organization.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">Operational Excellence</span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">Client Success</span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">Efficiency Boost</span>
              </div>
              <button 
                onClick={() => handleLearnMore('Operational Excellence')}
                className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-bold text-xs tracking-wide hover:bg-gray-200 transition-colors"
              >
                LEARN MORE
              </button>
            </div>
          </div>

          {/* Construction Advisory */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
            <div className="order-2 lg:order-1">
              <div className="bg-gray-200 rounded-2xl aspect-[4/5] overflow-hidden flex items-center justify-center max-w-sm">
                <img 
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Construction site and project management"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
                Construction advisory
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Guided a major financial restructuring that saved $1 million annually, delivering strategic insights to optimize cost-efficiency and enhance profitability for large-scale construction projects.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">Operational Excellence</span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">Client Success</span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">Efficiency Boost</span>
              </div>
              <button 
                onClick={() => handleLearnMore('Construction Advisory')}
                className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-bold text-xs tracking-wide hover:bg-gray-200 transition-colors"
              >
                LEARN MORE
              </button>
            </div>
          </div>

          {/* Hospitality Solutions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
            <div className="order-2 lg:order-1">
              <div className="bg-gray-200 rounded-2xl aspect-[4/5] overflow-hidden flex items-center justify-center max-w-sm">
                <img 
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80" 
                  alt="Hospitality and customer service excellence"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
                Hospitality Solutions
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Deployed a new CRM system that improved client engagement and satisfaction, driving seamless communication and enhancing customer retention across the hospitality sector.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">Operational Excellence</span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">Client Success</span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">Efficiency Boost</span>
              </div>
              <button 
                onClick={() => handleLearnMore('Hospitality Solutions')}
                className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-bold text-xs tracking-wide hover:bg-gray-200 transition-colors"
              >
                LEARN MORE
              </button>
            </div>
          </div>

          {/* Firefighting Communication */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
            <div className="order-2 lg:order-1">
              <div className="bg-gray-200 rounded-2xl aspect-[4/5] overflow-hidden flex items-center justify-center max-w-sm">
                <img 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Emergency response and communication systems"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
                Firefighting communication
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Developed robust communication protocols that reduced response times by 40%, ensuring timely and efficient coordination during critical firefighting operations.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">Operational Excellence</span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">Client Success</span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">Efficiency Boost</span>
              </div>
              <button 
                onClick={() => handleLearnMore('Firefighting Communication')}
                className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-bold text-xs tracking-wide hover:bg-gray-200 transition-colors"
              >
                LEARN MORE
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}