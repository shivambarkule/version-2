'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Car, Cpu, Factory, Plane, Zap, Users, Globe, Shield } from 'lucide-react'

const Industries = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const industries = [
    {
      icon: Car,
      title: 'Automotive',
      description: 'Revolutionizing automotive manufacturing with smart production lines, quality assurance systems, and supply chain optimization.',
      features: ['Smart Production Lines', 'Quality Assurance', 'Supply Chain Management', 'EV Manufacturing'],
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop',
      color: 'from-brand-primary to-brand-secondary',
      stats: { projects: '150+', efficiency: '40%', quality: '99.8%' }
    },
    {
      icon: Cpu,
      title: 'Electronics',
      description: 'Advanced electronics manufacturing with precision automation, testing protocols, and rapid prototyping capabilities.',
      features: ['Precision Automation', 'Testing Protocols', 'Rapid Prototyping', 'IoT Integration'],
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop',
      color: 'from-brand-secondary to-brand-accent',
      stats: { projects: '200+', efficiency: '35%', quality: '99.9%' }
    },
    {
      icon: Factory,
      title: 'Industrial',
      description: 'Heavy industrial manufacturing solutions with robust automation, safety systems, and operational excellence.',
      features: ['Robust Automation', 'Safety Systems', 'Operational Excellence', 'Predictive Maintenance'],
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
      color: 'from-brand-accent to-brand-primary',
      stats: { projects: '120+', efficiency: '45%', quality: '99.7%' }
    },
    {
      icon: Plane,
      title: 'Aerospace',
      description: 'Precision aerospace manufacturing with advanced materials, quality standards, and compliance management.',
      features: ['Advanced Materials', 'Quality Standards', 'Compliance Management', 'Precision Engineering'],
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop',
      color: 'from-brand-primary to-brand-accent',
      stats: { projects: '80+', efficiency: '50%', quality: '99.95%' }
    }
  ]

  const capabilities = [
    { icon: Zap, title: 'Smart Automation', description: 'AI-powered production systems' },
    { icon: Users, title: 'Expert Team', description: '50+ specialized engineers' },
    { icon: Globe, title: 'Global Reach', description: '25+ countries served' },
    { icon: Shield, title: 'Quality Assured', description: 'ISO certified processes' }
  ]

  return (
    <section id="industries" className="py-20 bg-[#131a43]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-heading text-white mb-4">Industries We Serve</h2>
          <p className="text-sub text-white/80 max-w-3xl mx-auto">
            We deliver specialized manufacturing solutions across diverse industries, 
            leveraging our expertise to drive innovation and operational excellence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: '🚗',
              title: 'Automotive',
              description: 'Advanced manufacturing solutions for automotive components and assembly lines.',
              features: ['Precision Engineering', 'Quality Assurance', 'Supply Chain Optimization']
            },
            {
              icon: '🔌',
              title: 'Electronics',
              description: 'Cutting-edge electronics manufacturing with focus on miniaturization and quality.',
              features: ['PCB Assembly', 'Component Testing', 'Quality Control']
            },
            {
              icon: '🏭',
              title: 'Industrial',
              description: 'Heavy machinery and industrial equipment manufacturing solutions.',
              features: ['Heavy Equipment', 'Industrial Automation', 'Safety Standards']
            }
          ].map((industry, index) => (
            <motion.div
              key={industry.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300"
            >
              <div className="text-5xl mb-6">{industry.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-4">{industry.title}</h3>
              <p className="text-white/80 mb-6">{industry.description}</p>
              <ul className="space-y-2">
                {industry.features.map((feature, featureIndex) => (
                  <li key={feature} className="flex items-center text-white/70">
                    <span className="w-2 h-2 bg-brand-primary rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-6">
            Ready to Optimize Your Industry?
          </h3>
          <p className="text-body text-white/80 mb-8 max-w-2xl mx-auto">
            Let's discuss how our industry-specific solutions can transform your manufacturing processes.
          </p>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
          >
            Get Industry Solutions
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Industries

