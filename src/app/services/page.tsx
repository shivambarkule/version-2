'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ServiceCard from '@/components/ServiceCard'

export default function ServicesPage() {
  const [favorites, setFavorites] = useState<Set<number>>(new Set())

  const services = [
    {
      title: "Faucet & leak repairs",
      description: "Professional faucet repair and leak detection services to fix any plumbing issues quickly and efficiently. Our expert technicians use advanced diagnostic tools to identify and resolve leaks, ensuring your home stays dry and your water bills stay low.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
    },
    {
      title: "Remodeling service",
      description: "Complete bathroom and kitchen remodeling services with expert craftsmanship and modern designs. We transform your space with premium materials, innovative layouts, and attention to detail that exceeds expectations.",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop"
    },
    {
      title: "Drain cleaning & repairs",
      description: "Expert drain cleaning and repair services to keep your plumbing system running smoothly. We use state-of-the-art equipment to clear blockages and restore proper drainage flow throughout your property.",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop"
    },
    {
      title: "Sewer repair & cleaning",
      description: "Professional sewer line repair and cleaning services to prevent costly plumbing emergencies. Our team provides comprehensive sewer maintenance, including video inspections and trenchless repair options.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
    },
    {
      title: "Water line repair",
      description: "Expert water line repair and replacement services to ensure clean water supply to your property. We handle everything from minor leaks to complete water line replacements with minimal disruption.",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop"
    },
    {
      title: "Gas line services",
      description: "Professional gas line installation, repair, and maintenance services for your safety and comfort. Our certified technicians ensure all gas work meets strict safety standards and local building codes.",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop"
    }
  ]

  const handleFavorite = (index: number) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(index)) {
      newFavorites.delete(index)
    } else {
      newFavorites.add(index)
    }
    setFavorites(newFavorites)
  }

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Services Section */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-8xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive plumbing and home improvement services with over 15 years of experience. Our team of certified professionals is committed to delivering exceptional quality and customer satisfaction on every project.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                name={service.title}
                description={service.description}
                image={service.image}
                isFavorite={favorites.has(index)}
                onFavorite={() => handleFavorite(index)}
                link={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                buttonText="Learn More"
              />
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}
