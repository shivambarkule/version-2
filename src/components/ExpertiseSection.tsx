export default function ExpertiseSection() {
  return (
    <section id="about" className="bg-brand-gray-light py-20 px-6">
      <div className="bg-white rounded-3xl max-w-8xl mx-auto px-10 py-20 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <p className="text-brand-gray uppercase tracking-wide text-sm font-medium mb-6">
                PIPELY EXPERTISE
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-brand-dark leading-tight">
                Discover our commitment to excellence
              </h2>
            </div>
            
            <p className="text-lg text-brand-gray leading-relaxed">
              With over a decade of experience, we deliver tailored solutions that empower your business to grow. By understanding your unique challenges, our team provides strategic insights to ensure your success through collaboration and innovation.
            </p>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="bg-brand-gray-light rounded-3xl h-[500px] lg:h-[600px] flex items-center justify-center overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80" 
                alt="Professional woman in business setting"
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>
            

          </div>
        </div>
      </div>
    </section>
  )
}
