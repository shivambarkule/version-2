'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Play, ChevronDown, TrendingUp, Users, Award, Zap } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useVantaHalo } from '@/hooks/useVantaClouds'

const Hero = () => {
  const [counts, setCounts] = useState({ projects: 0, engineers: 0, clients: 0, efficiency: 0 })
  const { scrollY } = useScroll()
  const magneticRefs = useRef<(HTMLButtonElement | HTMLDivElement)[]>([])
  const vantaRef = useVantaHalo()
  
  // Parallax effects
  const y1 = useTransform(scrollY, [0, 300], [0, -100])
  const y2 = useTransform(scrollY, [0, 300], [0, 150])
  const opacity = useTransform(scrollY, [0, 200], [1, 0.3])

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Magnetic pull effect for interactive elements
  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    const element = magneticRefs.current[index]
    if (element) {
      const { clientX, clientY } = e
      const { width, height, left, top } = element.getBoundingClientRect()
      const x = clientX - left - width / 2
      const y = clientY - top - height / 2
      
      element.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.02)`
    }
  }

  const handleMouseLeave = (index: number) => {
    const element = magneticRefs.current[index]
    if (element) {
      element.style.transform = 'translate(0px, 0px) scale(1)'
    }
  }

  // Counter animation
  useEffect(() => {
    const animateCounts = () => {
      const targets = { projects: 500, engineers: 50, clients: 200, efficiency: 98 }
      const duration = 2000
      const steps = 60
      const stepValue: { [key: string]: number } = {}
      
      Object.keys(targets).forEach(key => {
        stepValue[key] = targets[key as keyof typeof targets] / steps
      })

      let currentStep = 0
      const timer = setInterval(() => {
        currentStep++
        setCounts({
          projects: Math.min(Math.floor(stepValue.projects * currentStep), targets.projects),
          engineers: Math.min(Math.floor(stepValue.engineers * currentStep), targets.engineers),
          clients: Math.min(Math.floor(stepValue.clients * currentStep), targets.clients),
          efficiency: Math.min(Math.floor(stepValue.efficiency * currentStep), targets.efficiency)
        })

        if (currentStep >= steps) {
          clearInterval(timer)
          setCounts(targets)
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }

    const timer = setTimeout(animateCounts, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Vanta.js Halo Background */}
      <div 
        ref={vantaRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <motion.div
            ref={(el) => {
              if (el) magneticRefs.current[2] = el
            }}
            onMouseMove={(e) => handleMouseMove(e, 2)}
            onMouseLeave={() => handleMouseLeave(2)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
            }}
            className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6 cursor-pointer"
            style={{ transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
          >
            <motion.span 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-brand-primary rounded-full mr-2"
            />
            <span className="text-sm font-medium text-white">Innovation in Manufacturing</span>
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-hero mb-6 text-white drop-shadow-lg"
        >
          <motion.span
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ x: -10, color: "#60A5FA" }}
          >
            End-to-End
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="block text-brand-primary drop-shadow-lg"
            whileHover={{ 
              scale: 1.05,
              textShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
            }}
          >
            Manufacturing
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            whileHover={{ y: -5, color: "#34D399" }}
          >
            Solutions
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-sub text-white/90 max-w-3xl mx-auto mb-8 drop-shadow-lg"
        >
          From design to production, we leverage cutting-edge technology to deliver advanced manufacturing processes, 
          automation, and smart factory implementations for automotive, electronics, and industrial sectors.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <motion.button 
            ref={(el) => {
              if (el) magneticRefs.current[3] = el
            }}
            onMouseMove={(e) => handleMouseMove(e, 3)}
            onMouseLeave={() => handleMouseLeave(3)}
            whileHover={{ 
              scale: 1.05, 
              y: -2,
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary btn-md group relative overflow-hidden"
            style={{ transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
          >
            <span className="relative z-10 flex items-center">
              Get Started Today
              <motion.span 
                className="btn-icon group-hover:bg-brand-primary group-hover:text-white transition-all duration-300"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </span>
            
            {/* Enhanced button effects */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-brand-primary to-brand-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            />
            <motion.div
              className="absolute inset-0 bg-white/20 rounded-xl"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
          </motion.button>
          
          <motion.button 
            ref={(el) => {
              if (el) magneticRefs.current[4] = el
            }}
            onMouseMove={(e) => handleMouseMove(e, 4)}
            onMouseLeave={() => handleMouseLeave(4)}
            whileHover={{ 
              scale: 1.05, 
              y: -2,
              boxShadow: "0 20px 40px rgba(236, 72, 153, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary btn-md group relative overflow-hidden"
            style={{ transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
          >
            <span className="relative z-10 flex items-center">
              <motion.span 
                className="btn-icon group-hover:bg-brand-primary group-hover:text-white transition-all duration-300"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Play className="h-4 w-4" />
              </motion.span>
              Watch Our Story
            </span>
            
            {/* Enhanced button effects */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-brand-secondary to-brand-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            />
            <motion.div
              className="absolute inset-0 bg-white/20 rounded-xl"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>

        {/* Enhanced Stats with Magnetic Effects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          {[
            { 
              number: counts.projects, 
              label: 'Projects Completed',
              icon: TrendingUp,
              color: 'from-brand-primary to-brand-secondary'
            },
            { 
              number: counts.engineers, 
              label: 'Expert Engineers',
              icon: Users,
              color: 'from-brand-secondary to-brand-accent'
            },
            { 
              number: counts.clients, 
              label: 'Happy Clients',
              icon: Award,
              color: 'from-brand-accent to-brand-primary'
            },
            { 
              number: `${counts.efficiency}%`, 
              label: 'Efficiency Rate',
              icon: Zap,
              color: 'from-brand-primary to-brand-secondary'
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              ref={(el) => {
                if (el) magneticRefs.current[5 + index] = el
              }}
              onMouseMove={(e) => handleMouseMove(e, 5 + index)}
              onMouseLeave={() => handleMouseLeave(5 + index)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.8 + index * 0.1 }}
              whileHover={{ 
                y: -8, 
                scale: 1.05,
                boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
              }}
              className="text-center group cursor-pointer bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20"
              style={{ transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
            >
              <motion.div
                className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                whileHover={{ 
                  rotate: 360,
                  scale: 1.1,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
                }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon className="h-8 w-8 text-white" />
              </motion.div>
              <motion.div
                className="text-3xl font-bold text-white mb-2"
                key={stat.number}
                whileHover={{ 
                  scale: 1.1,
                  color: "#60A5FA"
                }}
              >
                {stat.number}
                {stat.label === 'Projects Completed' && '+'}
                {stat.label === 'Expert Engineers' && '+'}
                {stat.label === 'Happy Clients' && '+'}
              </motion.div>
              <div className="text-sm text-white/80 font-medium group-hover:text-blue-200 transition-colors duration-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            ref={(el) => {
              if (el) magneticRefs.current[9] = el
            }}
            onMouseMove={(e) => handleMouseMove(e, 9)}
            onMouseLeave={() => handleMouseLeave(9)}
            onClick={scrollToNext}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            whileHover={{ 
              scale: 1.2,
              color: "#60A5FA",
              boxShadow: "0 10px 20px rgba(96, 165, 250, 0.3)"
            }}
            className="text-white hover:text-blue-200 transition-all duration-300 cursor-pointer drop-shadow-lg"
            style={{ transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
          >
            <ChevronDown className="h-6 w-6" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero

