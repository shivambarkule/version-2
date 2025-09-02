export default function CTASection() {
  return (
    <section className="bg-gray-100 py-20 px-6">
      <div className="bg-[#fef2f2] rounded-3xl max-w-8xl mx-auto px-10 py-20 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <p className="text-gray-600 uppercase tracking-wide text-sm font-medium mb-6">
                JOIN US
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Ready to elevate your business?
              </h2>
              <p className="text-lg text-gray-700 mt-6 leading-relaxed">
                Partner with us to take your digital presence to the next level.
              </p>
            </div>
            
            <button className="bg-black text-white px-8 py-4 rounded-xl font-bold text-sm tracking-wide hover:bg-gray-800 transition-colors">
              GET STARTED
            </button>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="bg-gray-300 rounded-3xl h-[400px] flex items-center justify-center overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Business professionals collaborating"
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>
          </div>
        </div>


      </div>
    </section>
  )
}
