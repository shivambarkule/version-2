'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { ChevronDown, ArrowUpRight, Menu, X } from 'lucide-react'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()
  const magneticRefs = useRef<(HTMLButtonElement | HTMLAnchorElement)[]>([])

  const y = useTransform(scrollY, [0, 100], [0, -100])
  const opacity = useTransform(scrollY, [0, 100], [1, 0])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Magnetic pull effect for buttons
  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    const element = magneticRefs.current[index]
    if (element) {
      const { clientX, clientY } = e
      const { width, height, left, top } = element.getBoundingClientRect()
      const x = clientX - left - width / 2
      const y = clientY - top - height / 2
      
      element.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.05)`
    }
  }

  const handleMouseLeave = (index: number) => {
    const element = magneticRefs.current[index]
    if (element) {
      element.style.transform = 'translate(0px, 0px) scale(1)'
    }
  }

  const navigationItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Team', href: '#team' },
    { name: 'Services', href: '#services', hasDropdown: true },
    { name: 'Communities', href: '#communities', hasDropdown: true },
    { name: 'Events', href: '#events', hasDropdown: true },
    { name: 'Resources', href: '#resources' },
    { name: 'Gallery', href: '#gallery' }
  ]

  return (
    <>
      {/* Mobile menu overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Navigation */}
      <motion.nav
        style={{ y, opacity }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-[#131a43]/95 backdrop-blur-md shadow-lg' : 'bg-[#131a43]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo with magnetic effect */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0"
            >
              <motion.a 
                href="#home" 
                className="flex items-center space-x-3"
                ref={(el) => {
                  if (el) magneticRefs.current[0] = el
                }}
                onMouseMove={(e) => handleMouseMove(e, 0)}
                onMouseLeave={() => handleMouseLeave(0)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{ transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
              >
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
                  whileHover={{ 
                    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                    rotate: 5
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-white font-bold text-sm">xtrawrkx</span>
                </motion.div>
              </motion.a>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:space-x-8">
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
                  <motion.a
                    href={item.href}
                    className="text-white hover:text-blue-200 transition-colors duration-300 font-medium text-sm flex items-center space-x-1 relative overflow-hidden"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {item.hasDropdown && (
                      <motion.div
                        animate={{ rotate: 0 }}
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                      </motion.div>
                    )}
                    
                    {/* Hover underline effect */}
                    <motion.div
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-200"
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  </motion.a>
                  
                  {/* Enhanced Dropdown */}
                  {item.hasDropdown && (
                    <motion.div
                      className="absolute top-full left-0 mt-2 w-48 bg-[#131a43] rounded-xl shadow-xl border border-[#1e293b] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-95 group-hover:scale-100"
                      initial={false}
                    >
                      <div className="py-2">
                        {['Overview', 'Solutions', 'Case Studies'].map((dropdownItem, idx) => (
                          <motion.a
                            key={dropdownItem}
                            href="#"
                            className="block px-4 py-2 text-sm text-blue-100 hover:bg-[#1e293b] hover:text-white transition-all duration-200 relative overflow-hidden"
                            whileHover={{ x: 5, backgroundColor: "rgba(59, 130, 246, 0.3)" }}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: idx * 0.05 }}
                          >
                            <span className="relative z-10">{dropdownItem}</span>
                            <motion.div
                              className="absolute left-0 top-0 w-0 h-full bg-blue-600/30"
                              whileHover={{ width: "100%" }}
                              transition={{ duration: 0.3 }}
                            />
                          </motion.a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons with enhanced effects */}
            <div className="hidden lg:flex lg:items-center lg:space-x-4">
              <motion.button
                ref={(el) => {
                  if (el) magneticRefs.current[1] = el
                }}
                onMouseMove={(e) => handleMouseMove(e, 1)}
                onMouseLeave={() => handleMouseLeave(1)}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(236, 72, 153, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg relative overflow-hidden group"
                style={{ transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
              >
                <span className="relative z-10">Book Consultation</span>
                
                {/* Ripple effect */}
                <motion.div
                  className="absolute inset-0 bg-white/20 rounded-xl"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>
              
              <motion.button
                ref={(el) => {
                  if (el) magneticRefs.current[2] = el
                }}
                onMouseMove={(e) => handleMouseMove(e, 2)}
                onMouseLeave={() => handleMouseLeave(2)}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
                }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center hover:border-brand-primary transition-all duration-300 shadow-lg relative overflow-hidden group"
                style={{ transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 rounded-full"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  whileHover={{ rotate: 45, scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowUpRight className="w-5 h-5 text-gray-700" />
                </motion.div>
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-blue-200 transition-colors duration-300"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Navigation Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isOpen ? 1 : 0, 
            height: isOpen ? 'auto' : 0 
          }}
          transition={{ duration: 0.3 }}
          className="lg:hidden overflow-hidden bg-[#131a43] border-t border-[#1e293b]"
        >
          <div className="px-4 py-6 space-y-4">
            {navigationItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ x: 10, color: "#93c5fd" }}
                className="block text-blue-100 hover:text-blue-200 transition-all duration-300 font-medium py-2 relative overflow-hidden"
                onClick={() => setIsOpen(false)}
              >
                <span className="relative z-10">{item.name}</span>
                <motion.div
                  className="absolute left-0 top-0 w-0 h-full bg-[#1e293b]/30"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
            
            <div className="pt-4 border-t border-[#1e293b]">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg relative overflow-hidden"
              >
                <span className="relative z-10">Book Consultation</span>
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.nav>
    </>
  )
}

export default Navigation

