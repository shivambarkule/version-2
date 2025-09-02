'use client'

export default function StatsSection() {
  const logos = [
    "Logoipsum", "Logoipsum", "Logoipsum", "Logoipsum", "Logoipsum",
    "Logoipsum", "Logoipsum", "Logoipsum", "Logoipsum", "Logoipsum"
  ]

  return (
    <section className="bg-gray-100 py-20 px-6">
      <div className="bg-white rounded-3xl max-w-8xl mx-auto px-10 py-20 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                With over a decade of experience, we deliver tailored solutions that empower your business to grow.
              </h2>
            </div>
          </div>

          {/* Right Content - Company Logos */}
          <div className="space-y-8">
            {/* Moving Logo Banner at top */}
            <div className="overflow-hidden">
              <div className="flex animate-scroll space-x-8 items-center">
                {/* Duplicate logos for seamless scroll */}
                {[...logos, ...logos].map((logo, index) => (
                  <div key={index} className="flex items-center space-x-2 flex-shrink-0">
                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-500 font-medium text-sm whitespace-nowrap">{logo}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>



        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-12 text-left mt-16">
          <div className="space-y-4">
            <p className="text-gray-500 uppercase tracking-wide text-sm font-medium">
              COMPLETE CUSTOMER<br />SATISFACTION
            </p>
            <div className="text-6xl font-bold text-gray-900">95%</div>
          </div>
          
          <div className="space-y-4">
            <p className="text-gray-500 uppercase tracking-wide text-sm font-medium">
              INNOVATION AND<br />VALUABLE INSIGHT
            </p>
            <div className="text-6xl font-bold text-gray-900">10+</div>
          </div>
          
          <div className="space-y-4">
            <p className="text-gray-500 uppercase tracking-wide text-sm font-medium">
              HIGHLY EFFICIENT<br />FINANCIAL STRATEGIES
            </p>
            <div className="text-6xl font-bold text-gray-900">$10m</div>
          </div>
        </div>
      </div>
    </section>
  )
}
