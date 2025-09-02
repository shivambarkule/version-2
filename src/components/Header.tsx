'use client'

import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="bg-brand-gray-light px-6 py-6">
      <header className="bg-white rounded-2xl shadow-sm max-w-8xl mx-auto">
        <div className="px-10 py-5">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white transform rotate-45"></div>
              </div>
              <span className="text-2xl font-bold text-brand-dark">Pipely</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-12">
              <a href="/#services" className="text-brand-gray hover:text-brand-dark font-medium text-sm tracking-wide">
                HOME
              </a>
              <a href="/services" className="text-brand-gray hover:text-brand-dark font-medium text-sm tracking-wide">
                SERVICES
              </a>
              <a href="/case-studies" className="text-brand-gray hover:text-brand-dark font-medium text-sm tracking-wide">
                CASES STUDIES
              </a>
              <a href="/about" className="text-brand-gray hover:text-brand-dark font-medium text-sm tracking-wide">
                ABOUT US
              </a>
              <a href="/blog" className="text-brand-gray hover:text-brand-dark font-medium text-sm tracking-wide">
                BLOG
              </a>
            </div>

            {/* Contact Button */}
            <div className="hidden md:block">
              <a href="/contact" className="bg-brand-primary text-white px-6 py-3 rounded-xl font-bold text-sm tracking-wide hover:bg-brand-primary/90 transition-colors inline-block">
                CONTACT
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <span className="w-full h-0.5 bg-brand-dark"></span>
                <span className="w-full h-0.5 bg-brand-dark"></span>
                <span className="w-full h-0.5 bg-brand-dark"></span>
              </div>
            </button>
          </nav>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-brand-gray-light">
              <div className="flex flex-col space-y-4 pt-4">
                <a href="/#services" className="text-brand-gray hover:text-brand-dark font-medium text-sm tracking-wide">
                  SERVICES
                </a>
                <a href="/case-studies" className="text-brand-gray hover:text-brand-dark font-medium text-sm tracking-wide">
                  CASES STUDIES
                </a>
                <a href="/about" className="text-brand-gray hover:text-brand-dark font-medium text-sm tracking-wide">
                  ABOUT US
                </a>
                <a href="/blog" className="text-brand-gray hover:text-brand-dark font-medium text-sm tracking-wide">
                  BLOG
                </a>
                <a href="/contact" className="bg-brand-primary text-white px-6 py-3 rounded-xl font-bold text-sm tracking-wide hover:bg-brand-primary/90 transition-colors w-fit inline-block">
                  CONTACT
                </a>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  )
}
