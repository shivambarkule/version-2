'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Calendar, User, Clock, BookOpen, TrendingUp, Lightbulb, BarChart3 } from 'lucide-react'

const Insights = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const insights = [
    {
      type: 'Case Study',
      title: 'Automotive Manufacturing Revolution: 40% Efficiency Boost',
      excerpt: 'How we transformed a leading automotive manufacturer\'s production line with smart automation and IoT integration.',
      author: 'Dr. Sarah Chen',
      date: 'Dec 15, 2024',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop',
      category: 'Automotive',
      color: 'from-brand-primary to-brand-secondary'
    },
    {
      type: 'Whitepaper',
      title: 'The Future of Smart Manufacturing: AI & IoT Integration',
      excerpt: 'Comprehensive guide to implementing AI-powered manufacturing systems for maximum efficiency and quality.',
      author: 'Michael Rodriguez',
      date: 'Dec 10, 2024',
      readTime: '12 min read',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
      category: 'Technology',
      color: 'from-brand-secondary to-brand-accent'
    },
    {
      type: 'Industry Report',
      title: 'Supply Chain Optimization Trends 2024',
      excerpt: 'Analysis of emerging trends in supply chain management and how manufacturers can stay ahead of the curve.',
      author: 'Lisa Thompson',
      date: 'Dec 5, 2024',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop',
      category: 'Supply Chain',
      color: 'from-brand-accent to-brand-primary'
    }
  ]

  const categories = [
    { icon: BookOpen, title: 'Case Studies', count: '25+', color: 'text-brand-primary' },
    { icon: TrendingUp, title: 'Industry Reports', count: '15+', color: 'text-brand-secondary' },
    { icon: Lightbulb, title: 'Whitepapers', count: '20+', color: 'text-brand-accent' },
    { icon: BarChart3, title: 'Research Papers', count: '30+', color: 'text-brand-primary' }
  ]

  return (
    <section id="insights" className="py-20 bg-[#131a43]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-heading text-white mb-4">Insights & Resources</h2>
          <p className="text-sub text-white/80 max-w-3xl mx-auto">
            Stay updated with the latest manufacturing trends, industry insights, and expert analysis 
            to drive innovation in your business.
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
              Latest Manufacturing Insights
            </h3>
            <p className="text-body text-white/80 mb-6">
              Our team of experts shares valuable insights on emerging technologies, industry trends, 
              and best practices that can transform your manufacturing operations.
            </p>
            <p className="text-body text-white/80 mb-8">
              From automation strategies to quality improvement techniques, discover actionable 
              insights that drive operational excellence and competitive advantage.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              Read More Insights
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
              { icon: '📊', title: 'Industry Reports', description: 'Comprehensive analysis of manufacturing trends' },
              { icon: '🔬', title: 'Case Studies', description: 'Real-world success stories and implementations' },
              { icon: '📈', title: 'Best Practices', description: 'Proven strategies for operational excellence' },
              { icon: '🚀', title: 'Innovation News', description: 'Latest technological breakthroughs and updates' }
            ].map((insight, index) => (
              <motion.div
                key={insight.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{insight.icon}</div>
                <h4 className="text-lg font-semibold text-white mb-2">{insight.title}</h4>
                <p className="text-sm text-white/70">{insight.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-6">
            Stay Updated with Our Newsletter
          </h3>
          <p className="text-body text-white/80 mb-8 max-w-2xl mx-auto">
            Get the latest manufacturing insights, industry updates, and expert tips delivered directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              Subscribe
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Insights
