'use client'

import { useState } from 'react'

export default function HeroSection() {
  return (
    <section className="bg-gray-400 pb-6">
      <div className="bg-gray-500 rounded-2xl max-w-8xl mx-auto px-10 py-20 relative overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-6xl lg:text-7xl font-bold text-white leading-[1.1]">
              Expert insights.{' '}
              <span className="block">Custom solutions.</span>
            </h1>
            
            <p className="text-xl text-white/80 leading-relaxed max-w-lg">
              Easily adapt to changes and scale your operations with our 
              flexible infrastructure, designed to support your business.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[#ef4444] text-white px-8 py-4 rounded-xl font-bold text-sm tracking-wide hover:bg-[#dc2626] transition-colors">
                BOOK A CALL
              </button>
              <button className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-sm tracking-wide hover:bg-white/10 transition-colors">
                OUR WORK
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center space-x-6 text-white/60">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm font-medium">Trusted by 500+ companies</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm font-medium">99% success rate</span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="bg-gray-300 rounded-3xl h-[500px] flex items-center justify-center overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Professional consulting team collaborating"
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
