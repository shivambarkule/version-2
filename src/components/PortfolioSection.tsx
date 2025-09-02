'use client'

import { useState } from 'react'

export default function PortfolioSection() {
  const [expandedItem, setExpandedItem] = useState(0)
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')

  const portfolioItems = [
    {
      title: "OPERATIONAL EXCELLENCE",
      description: "Implemented streamlined processes that increased efficiency by 30%.",
      expanded: true,
      details: "Our team worked closely with the client to identify bottlenecks in their operational workflow. Through comprehensive analysis and strategic implementation, we redesigned their processes, resulting in a 30% increase in overall efficiency and significant cost savings."
    },
    {
      title: "CONSTRUCTION ADVISORY", 
      description: "Strategic consulting for construction projects and operational optimization.",
      expanded: false,
      details: "Provided strategic guidance for large-scale construction projects, including risk assessment, timeline optimization, and resource allocation. Our recommendations led to improved project delivery times and reduced operational costs."
    },
    {
      title: "HOSPITALITY SOLUTIONS",
      description: "Comprehensive solutions for hospitality industry challenges and growth.",
      expanded: false,
      details: "Developed comprehensive solutions for hospitality businesses facing operational challenges. Our approach included customer experience optimization, staff training programs, and technology integration to enhance service delivery."
    },
    {
      title: "FIREFIGHTING COMMUNICATION",
      description: "Advanced communication systems for emergency response teams.",
      expanded: false,
      details: "Designed and implemented advanced communication systems for emergency response teams. The solution improved response times by 40% and enhanced coordination between different emergency services."
    }
  ]

  // Mock function for portfolio item clicks
  const handlePortfolioClick = (index: number, title: string) => {
    setExpandedItem(expandedItem === index ? -1 : index)
    setNotificationMessage(`Opening portfolio item: ${title}`)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
    // Mock API call
    console.log(`Fetching portfolio details for: ${title}`)
  }

  return (
    <section className="bg-gray-100 py-20 px-6">
      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          {notificationMessage}
        </div>
      )}
      
      <div className="bg-white rounded-3xl max-w-8xl mx-auto px-10 py-20 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <p className="text-gray-500 uppercase tracking-wide text-sm font-medium mb-6">
                PORTFOLIO
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                At Pipely, we believe in delivering measurable results. Here are some success stories showcasing how our tailored consulting solutions have helped businesses overcome challenges, optimize operations, and achieve sustainable growth.
              </h2>
            </div>

            {/* Portfolio Items - Accordion */}
            <div className="space-y-0">
              {portfolioItems.map((item, index) => (
                <div key={index} className="border-b border-gray-200 last:border-b-0">
                  <button
                    onClick={() => handlePortfolioClick(index, item.title)}
                    className="w-full flex items-center justify-between text-left py-6 hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg font-bold text-gray-900 tracking-wide">
                      {item.title}
                    </span>
                    <span className="text-2xl text-gray-600 font-light">
                      {expandedItem === index ? '×' : '+'}
                    </span>
                  </button>
                  
                  {expandedItem === index && (
                    <div className="pb-6 text-gray-600 leading-relaxed">
                      <p className="mb-4">{item.description}</p>
                      <p className="text-sm text-gray-500">{item.details}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="bg-gray-300 rounded-3xl h-[500px] flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <svg className="w-24 h-24 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm">Two women brainstorming</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
