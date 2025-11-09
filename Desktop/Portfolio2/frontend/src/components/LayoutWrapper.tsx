"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { PixelImage } from "@/components/pixel-image";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isWorkOrAboutPage = pathname.startsWith("/work") || pathname.startsWith("/excursions") || pathname.startsWith("/about") || pathname.startsWith("/contact");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (isHomePage) {
    return (
      <div className="relative h-full w-full">
        {/* Mobile hero image - suits photo */}
        <div className="absolute inset-0 z-0 md:hidden">
          <PixelImage 
            src="/suits.jpg"
            grid="8x8"
            grayscaleAnimation={true}
            pixelFadeInDuration={1200}
            maxAnimationDelay={2000}
            colorRevealDelay={5000}
          />
        </div>

        {/* Desktop hero image - signature */}
        <div className="absolute inset-0 z-0 hidden md:block">
          <PixelImage 
            src="/signature.jpg"
            grid="8x8"
            grayscaleAnimation={true}
            pixelFadeInDuration={1200}
            maxAnimationDelay={2000}
            colorRevealDelay={5000}
          />
        </div>
        
        {/* Sidebar with completely transparent background - always visible */}
        <div className="absolute left-0 top-0 z-10 h-full w-[280px] md:w-[320px]">
          <Sidebar transparent={true} />
        </div>

        {/* Main content area - empty for home page */}
        <main className="relative z-10 h-full ml-[280px] md:ml-[320px]">
          {children}
        </main>
      </div>
    );
  }

  // Layout for work and about pages with mobile hamburger menu
  if (isWorkOrAboutPage) {
    return (
      <div className="h-full">
        {/* Desktop layout */}
        <div className="hidden md:grid md:grid-cols-[320px_1fr] h-full">
          <Sidebar />
          <main className="relative h-full overflow-y-auto">
            {children}
          </main>
        </div>

        {/* Mobile layout */}
        <div className="md:hidden h-full relative">
          {/* Hamburger menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="fixed top-4 left-4 z-50 p-2 bg-white/90 backdrop-blur-sm rounded-md shadow-lg"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-5 h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block w-5 h-0.5 bg-black mt-1 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-5 h-0.5 bg-black mt-1 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>

          {/* Mobile sidebar overlay */}
          {isMobileMenuOpen && (
            <>
              <div 
                className="fixed inset-0 bg-black/50 z-40"
                onClick={() => setIsMobileMenuOpen(false)}
              ></div>
              <div className="fixed left-0 top-0 z-50 h-full w-[280px] transform transition-transform duration-300">
                <Sidebar />
              </div>
            </>
          )}

          {/* Main content - full width on mobile */}
          <main className="h-full overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    );
  }

  // Regular layout for other pages
  return (
    <div className="grid grid-cols-[280px_1fr] md:grid-cols-[320px_1fr] h-full">
      {/* Left sidebar - always visible */}
      <Sidebar />

      {/* Right content area */}
      <main className="relative h-full overflow-y-auto">
        {children}
      </main>
    </div>
  );
}