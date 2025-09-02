'use client'

import { useState } from 'react'

export default function BlogSection() {
  const [activeFilter, setActiveFilter] = useState('ALL')
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')

  // Mock data for blog articles
  const mockArticles = [
    {
      id: 1,
      title: "Maximizing Efficiency in Operations",
      description: "We offer a comprehensive range of services designed to meet the unique needs of your business. From strategy development to risk management, our expert team is dedicated to driving your success.",
      category: ["News", "Insights"],
      image: "Professional Team Photo"
    },
    {
      id: 2,
      title: "Building High-Performance Teams",
      description: "Discover how our expert team collaborates to deliver exceptional results. Learn about our approach to team building, leadership development, and creating sustainable success for your business.",
      category: ["Team", "Leadership"],
      image: "Professional Team Photo"
    }
  ]

  const mockGridArticles = [
    {
      id: 3,
      title: "Maximizing Efficiency in Operations",
      description: "Discover strategies to streamline your business processes and enhance productivity.",
      category: ["News", "Insights"],
      image: "Laptop Work"
    },
    {
      id: 4,
      title: "Optimizing Remote Workflows",
      description: "Learn how digital tools boost remote team efficiency and focus new in industries.",
      category: ["News"],
      image: "Office Setup"
    },
    {
      id: 5,
      title: "Enhancing Cybersecurity Practices",
      description: "Uncover smart ways to protect digital assets and ensure operational resilience smart.",
      category: ["Insights"],
      image: "Laptop Setup"
    },
    {
      id: 6,
      title: "Boosting Growth via Automation",
      description: "Explore how tech adoption enhances business strategy and accelerates growth.",
      category: ["Insights"],
      image: "Office Chair"
    },
    {
      id: 7,
      title: "Improving Client Engagement",
      description: "Discover smart ways to build deeper, longer-lasting client relationships and loyalty.",
      category: ["News", "Insights"],
      image: "Camera Setup"
    },
    {
      id: 8,
      title: "Optimizing Workflows with Tech",
      description: "Learn how automating workflows can boost speed, accuracy, and business focus.",
      category: ["News"],
      image: "Laptop Work"
    }
  ]

  // Mock functions for button interactions
  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter)
    setNotificationMessage(`Filtered to show ${filter} articles`)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  const handleReadMore = (articleId: number, title: string) => {
    setNotificationMessage(`Opening article: ${title}`)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
    // Mock API call
    console.log(`Fetching article ${articleId}: ${title}`)
  }

  const handleArticleClick = (articleId: number, title: string) => {
    setNotificationMessage(`Navigating to article: ${title}`)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
    // Mock navigation
    console.log(`Navigating to article ${articleId}: ${title}`)
  }

  return (
    <div className="bg-gray-100 min-h-screen px-6 py-12">
      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          {notificationMessage}
        </div>
      )}
      
      <div className="max-w-8xl mx-auto">
        <div className="bg-white rounded-3xl p-10 md:p-14 shadow-sm">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-8">
              Blog & articles
            </h1>
            
            {/* Filter Tabs */}
            <div className="flex gap-4">
              <button
                onClick={() => handleFilterClick('ALL')}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === 'ALL'
                    ? 'bg-[#ef4444] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                ALL
              </button>
              <button
                onClick={() => handleFilterClick('NEWS')}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === 'NEWS'
                    ? 'bg-[#ef4444] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                NEWS
              </button>
              <button
                onClick={() => handleFilterClick('INSIGHTS')}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === 'INSIGHTS'
                    ? 'bg-[#ef4444] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                INSIGHTS
              </button>
            </div>
          </div>

          {/* Main Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Side - Featured Article Image */}
            <div className="relative">
              <div className="aspect-[4/3] bg-gray-200 rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Business team meeting"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Side - Article Content */}
            <div className="flex flex-col justify-center">
              {/* Category Tags */}
              <div className="flex gap-3 mb-6">
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                  News
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                  Insights
                </span>
              </div>

              {/* Article Title */}
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 leading-tight">
                {mockArticles[0].title}
              </h2>

              {/* Article Description */}
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {mockArticles[0].description}
              </p>

              {/* Read More Button */}
              <div>
                <button 
                  onClick={() => handleReadMore(mockArticles[0].id, mockArticles[0].title)}
                  className="inline-flex items-center text-black font-medium hover:underline"
                >
                  Read More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Second Featured Article - Professional Team Photo */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
            {/* Left Side - Professional Team Photo */}
            <div className="relative">
              <div className="aspect-[4/3] bg-gray-200 rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80" 
                  alt="Professional team collaboration"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Side - Article Content */}
            <div className="flex flex-col justify-center">
              {/* Category Tags */}
              <div className="flex gap-3 mb-6">
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                  Team
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                  Leadership
                </span>
              </div>

              {/* Article Title */}
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 leading-tight">
                {mockArticles[1].title}
              </h2>

              {/* Article Description */}
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {mockArticles[1].description}
              </p>

              {/* Read More Button */}
              <div>
                <button 
                  onClick={() => handleReadMore(mockArticles[1].id, mockArticles[1].title)}
                  className="inline-flex items-center text-black font-medium hover:underline"
                >
                  Read More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Blog Posts Grid - 2x3 Layout */}
          <div className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Row 1 - Blog Post 1 */}
              <article 
                className="group cursor-pointer"
                onClick={() => handleArticleClick(mockGridArticles[0].id, mockGridArticles[0].title)}
              >
                <div className="aspect-[4/3] bg-gray-200 rounded-2xl overflow-hidden mb-4">
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-3 flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                        </svg>
                      </div>
                      <p className="text-sm">Laptop Work</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mb-3">
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    News
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    Insights
                  </span>
                </div>
                <h3 className="text-xl font-bold text-black mb-3 group-hover:underline">
                  {mockGridArticles[0].title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {mockGridArticles[0].description}
                </p>
              </article>

              {/* Row 1 - Blog Post 2 */}
              <article 
                className="group cursor-pointer"
                onClick={() => handleArticleClick(mockGridArticles[1].id, mockGridArticles[1].title)}
              >
                <div className="aspect-[4/3] bg-gray-200 rounded-2xl overflow-hidden mb-4">
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-3 flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h1a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <p className="text-sm">Office Setup</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mb-3">
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    News
                  </span>
                </div>
                <h3 className="text-xl font-bold text-black mb-3 group-hover:underline">
                  {mockGridArticles[1].title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {mockGridArticles[1].description}
                </p>
              </article>

              {/* Row 1 - Blog Post 3 */}
              <article 
                className="group cursor-pointer"
                onClick={() => handleArticleClick(mockGridArticles[2].id, mockGridArticles[2].title)}
              >
                <div className="aspect-[4/3] bg-gray-200 rounded-2xl overflow-hidden mb-4">
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-3 flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                        </svg>
                      </div>
                      <p className="text-sm">Laptop Setup</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mb-3">
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    Insights
                  </span>
                </div>
                <h3 className="text-xl font-bold text-black mb-3 group-hover:underline">
                  {mockGridArticles[2].title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {mockGridArticles[2].description}
                </p>
              </article>

              {/* Row 2 - Blog Post 4 */}
              <article 
                className="group cursor-pointer"
                onClick={() => handleArticleClick(mockGridArticles[3].id, mockGridArticles[3].title)}
              >
                <div className="aspect-[4/3] bg-gray-200 rounded-2xl overflow-hidden mb-4">
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-3 flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                        </svg>
                      </div>
                      <p className="text-sm">Office Chair</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mb-3">
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    Insights
                  </span>
                </div>
                <h3 className="text-xl font-bold text-black mb-3 group-hover:underline">
                  {mockGridArticles[3].title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {mockGridArticles[3].description}
                </p>
              </article>

              {/* Row 2 - Blog Post 5 */}
              <article 
                className="group cursor-pointer"
                onClick={() => handleArticleClick(mockGridArticles[4].id, mockGridArticles[4].title)}
              >
                <div className="aspect-[4/3] bg-gray-200 rounded-2xl overflow-hidden mb-4">
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-3 flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-sm">Camera Setup</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mb-3">
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    News
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    Insights
                  </span>
                </div>
                <h3 className="text-xl font-bold text-black mb-3 group-hover:underline">
                  {mockGridArticles[4].title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {mockGridArticles[4].description}
                </p>
              </article>

              {/* Row 2 - Blog Post 6 */}
              <article 
                className="group cursor-pointer"
                onClick={() => handleArticleClick(mockGridArticles[5].id, mockGridArticles[5].title)}
              >
                <div className="aspect-[4/3] bg-gray-200 rounded-2xl overflow-hidden mb-4">
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-3 flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                        </svg>
                      </div>
                      <p className="text-sm">Laptop Work</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mb-3">
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    News
                  </span>
                </div>
                <h3 className="text-xl font-bold text-black mb-3 group-hover:underline">
                  {mockGridArticles[5].title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {mockGridArticles[5].description}
                </p>
              </article>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}