"use client"

import { MorphingText } from "./morph/morphing-text"

export default function NameMorphing() {
  const texts = [
    "This is",
    "Shivam Barkule",
    "UI/UX Designer",
    "Shivam Barkule", 
    "Frontend Developer",
    "Shivam Barkule",
    "Creative Thinker",
    "Shivam Barkule",
    "Problem Solver",
    "Shivam Barkule"
  ]

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="text-center">
        <MorphingText 
          texts={texts}
          className="text-black dark:text-white mb-8"
        />
        <p className="text-lg text-black/70 dark:text-white/70 max-w-2xl mx-auto">
          Crafting digital experiences with passion and precision
        </p>
      </div>
    </div>
  )
}