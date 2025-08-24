'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowUp, Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram, Youtube } from 'lucide-react'

const Footer = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerLinks = {
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Team', href: '#about' },
      { name: 'Careers', href: '#' },
      { name: 'News & Media', href: '#insights' }
    ],
    services: [
      { name: 'Smart Manufacturing', href: '#services' },
      { name: 'Production Automation', href: '#services' },
      { name: 'Quality Systems', href: '#services' },
      { name: 'Supply Chain Optimization', href: '#services' }
    ],
    industries: [
      { name: 'Automotive', href: '#industries' },
      { name: 'Electronics', href: '#industries' },
      { name: 'Industrial', href: '#industries' },
      { name: 'Aerospace', href: '#industries' }
    ],
    resources: [
      { name: 'Case Studies', href: '#insights' },
      { name: 'Whitepapers', href: '#insights' },
      { name: 'Industry Reports', href: '#insights' },
      { name: 'Blog', href: '#insights' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'Sitemap', href: '#' }
    ]
  }

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ]

  return (
    <footer className="bg-[#131a43] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-bold text-lg">X</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Xtrawrkx</h3>
            </div>
            <p className="text-white/80 mb-6 max-w-md">
              End-to-end manufacturing solutions from design to production, leveraging cutting-edge technology 
              for automotive, electronics, and industrial sectors.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: '📧', href: 'mailto:info@xtrawrkx.com' },
                { icon: '📱', href: 'tel:+15551234567' },
                { icon: '📍', href: '#contact' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-lg hover:bg-white/20 transition-all duration-300"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Services', 'Industries', 'Insights', 'Contact'].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase()}`}
                    className="text-white/70 hover:text-white transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              {['Smart Manufacturing', 'Production Automation', 'Quality Systems', 'Supply Chain'].map((service) => (
                <li key={service}>
                  <a 
                    href="#services"
                    className="text-white/70 hover:text-white transition-colors duration-300"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm mb-4 md:mb-0">
              © 2024 Xtrawrkx Manufacturing Business Pvt Ltd. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="/privacy" className="text-white/60 hover:text-white transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="/terms" className="text-white/60 hover:text-white transition-colors duration-300">
                Terms of Service
              </a>
              <a href="/sitemap" className="text-white/60 hover:text-white transition-colors duration-300">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0 }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-12 h-12 bg-brand-primary hover:bg-brand-secondary text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-50"
      >
        <ArrowUp className="h-6 w-6" />
      </motion.button>
    </footer>
  )
}

export default Footer
