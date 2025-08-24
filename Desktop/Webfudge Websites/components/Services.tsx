'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Factory, Cog, Shield, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react'

const Services = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const services = [
    {
      icon: Factory,
      title: "Smart Manufacturing",
      description: "Revolutionize your production with IoT integration, real-time monitoring, and AI-powered optimization systems.",
      features: [
        "IoT Device Integration",
        "Real-time Analytics",
        "Predictive Maintenance",
        "Energy Optimization",
        "Quality Control Automation"
      ],
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
      color: "from-brand-primary to-brand-secondary"
    },
    {
      icon: Cog,
      title: "Production Automation",
      description: "Streamline operations with advanced robotics, automated workflows, and intelligent manufacturing systems.",
      features: [
        "Robotic Assembly Lines",
        "Automated Quality Testing",
        "Smart Inventory Management",
        "Process Optimization",
        "24/7 Production Capability"
      ],
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop",
      color: "from-brand-secondary to-brand-accent"
    },
    {
      icon: Shield,
      title: "Quality Systems",
      description: "Ensure excellence with comprehensive quality assurance, testing protocols, and continuous improvement systems.",
      features: [
        "ISO 9001 Compliance",
        "Statistical Process Control",
        "Defect Prevention Systems",
        "Continuous Improvement",
        "Customer Satisfaction Metrics"
      ],
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop",
      color: "from-brand-accent to-brand-primary"
    },
    {
      icon: TrendingUp,
      title: "Supply Chain Optimization",
      description: "Optimize your supply chain with intelligent logistics, real-time tracking, and predictive analytics.",
      features: [
        "Real-time Tracking",
        "Demand Forecasting",
        "Inventory Optimization",
        "Supplier Management",
        "Cost Reduction Strategies"
      ],
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop",
      color: "from-brand-primary to-brand-secondary"
    }
  ]

  return (
    <section id="services" className="py-20 bg-[#131a43]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-heading text-white mb-4">Our Services</h2>
          <p className="text-sub text-white/80 max-w-3xl mx-auto">
            We deliver comprehensive manufacturing solutions that drive efficiency, 
            quality, and innovation across your entire production ecosystem.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300"
              >
                <div className="text-5xl mb-6 flex justify-center">
                  <IconComponent className="w-16 h-16 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-white/80 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={feature} className="flex items-center text-white/70">
                      <span className="w-2 h-2 bg-brand-primary rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-6">
            Ready to Transform Your Manufacturing?
          </h3>
          <p className="text-body text-white/80 mb-8 max-w-2xl mx-auto">
            Let's discuss how our services can optimize your production processes 
            and drive sustainable growth for your business.
          </p>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
          >
            Explore Services
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Services

