'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Factory, Cog, Shield, TrendingUp, Users, Award, Clock, Target } from 'lucide-react'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const specialties = [
    {
      icon: Factory,
      title: "Smart Manufacturing",
      description: "Advanced IoT integration and real-time monitoring systems for intelligent production processes.",
      color: "from-brand-primary to-brand-secondary"
    },
    {
      icon: Cog,
      title: "Production Automation",
      description: "State-of-the-art robotics and automated systems to maximize efficiency and precision.",
      color: "from-brand-secondary to-brand-accent"
    },
    {
      icon: Shield,
      title: "Quality Systems",
      description: "Comprehensive quality assurance and control systems ensuring excellence in every product.",
      color: "from-brand-accent to-brand-primary"
    },
    {
      icon: TrendingUp,
      title: "Supply Chain Optimization",
      description: "Streamlined logistics and inventory management for seamless operations.",
      color: "from-brand-primary to-brand-secondary"
    }
  ]

  const stats = [
    { icon: Users, number: "150+", label: "Team Members", color: "from-brand-primary to-brand-secondary" },
    { icon: Award, number: "25+", label: "Years Experience", color: "from-brand-secondary to-brand-accent" },
    { icon: Clock, number: "24/7", label: "Support Available", color: "from-brand-accent to-brand-primary" },
    { icon: Target, number: "99.8%", label: "Success Rate", color: "from-brand-primary to-brand-secondary" }
  ]

  return (
    <section id="about" className="py-20 bg-[#131a43]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-heading text-white mb-4">About Xtrawrkx</h2>
          <p className="text-sub text-white/80 max-w-3xl mx-auto">
            We are a leading manufacturing solutions provider, specializing in end-to-end production processes 
            that drive innovation and efficiency across multiple industries.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold text-white mb-6">
              Transforming Manufacturing Through Innovation
            </h3>
            <p className="text-body text-white/80 mb-6">
              Our expertise spans across automotive, electronics, and industrial sectors, delivering 
              cutting-edge solutions that optimize production processes and enhance operational efficiency.
            </p>
            <p className="text-body text-white/80 mb-8">
              With years of experience and a commitment to excellence, we help businesses achieve 
              their manufacturing goals through advanced technology and strategic implementation.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              Learn More
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-6"
          >
            {[
              {
                icon: '🏭',
                title: 'Smart Manufacturing',
                description: 'AI-driven production optimization and real-time monitoring systems.'
              },
              {
                icon: '⚡',
                title: 'Production Automation',
                description: 'Advanced robotics and automated assembly line solutions.'
              },
              {
                icon: '🔍',
                title: 'Quality Systems',
                description: 'Comprehensive quality control and assurance frameworks.'
              },
              {
                icon: '📊',
                title: 'Supply Chain Optimization',
                description: 'End-to-end supply chain management and optimization.'
              }
            ].map((specialty, index) => (
              <motion.div
                key={specialty.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{specialty.icon}</div>
                <h4 className="text-lg font-semibold text-white mb-2">{specialty.title}</h4>
                <p className="text-sm text-white/70">{specialty.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-3 gap-8 text-center"
        >
          {[
            { number: '15+', label: 'Years Experience' },
            { number: '500+', label: 'Projects Completed' },
            { number: '98%', label: 'Client Satisfaction' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20"
            >
              <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-white/80">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default About

