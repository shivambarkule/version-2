"use client"

import type React from "react"
import { useCallback, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

const morphTime = 2.0
const cooldownTime = 1.0

const useNavMorphingText = (texts: string[]) => {
  const textIndexRef = useRef(0)
  const morphRef = useRef(0)
  const cooldownRef = useRef(0)
  const timeRef = useRef(new Date())

  const text1Ref = useRef<HTMLSpanElement>(null)
  const text2Ref = useRef<HTMLSpanElement>(null)

  const setStyles = useCallback(
    (fraction: number) => {
      const [current1, current2] = [text1Ref.current, text2Ref.current]
      if (!current1 || !current2) return

      const len = Array.isArray(texts) ? texts.length : 0
      if (len === 0) {
        current1.textContent = ""
        current2.textContent = ""
        current1.style.filter = "none"
        current1.style.opacity = "0%"
        current2.style.filter = "none"
        current2.style.opacity = "0%"
        return
      }
      if (len === 1) {
        const only = String(texts[0] ?? "")
        if (current1) current1.innerHTML = only.replace(/\n/g, '<br>')
        if (current2) current2.innerHTML = only.replace(/\n/g, '<br>')
        current1.style.filter = "none"
        current1.style.opacity = "0%"
        current2.style.filter = "none"
        current2.style.opacity = "100%"
        return
      }

      current2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`
      current2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`

      const invertedFraction = 1 - fraction
      current1.style.filter = `blur(${Math.min(8 / invertedFraction - 8, 100)}px)`
      current1.style.opacity = `${Math.pow(invertedFraction, 0.4) * 100}%`

      const currentText = texts[textIndexRef.current % len]
      const nextText = texts[(textIndexRef.current + 1) % len]
      
      // Handle line breaks
      if (current1) {
        current1.innerHTML = currentText.replace(/\n/g, '<br>')
      }
      if (current2) {
        current2.innerHTML = nextText.replace(/\n/g, '<br>')
      }
    },
    [texts],
  )

  const doMorph = useCallback(() => {
    morphRef.current -= cooldownRef.current
    cooldownRef.current = 0

    let fraction = morphRef.current / morphTime

    if (fraction > 1) {
      cooldownRef.current = cooldownTime
      fraction = 1
    }

    setStyles(fraction)

    if (fraction === 1) {
      textIndexRef.current++
    }
  }, [setStyles])

  const doCooldown = useCallback(() => {
    morphRef.current = 0
    const [current1, current2] = [text1Ref.current, text2Ref.current]
    if (current1 && current2) {
      current2.style.filter = "none"
      current2.style.opacity = "100%"
      current1.style.filter = "none"
      current1.style.opacity = "0%"
    }
  }, [])

  useEffect(() => {
    let animationFrameId: number

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      const newTime = new Date()
      const dt = (newTime.getTime() - timeRef.current.getTime()) / 1000
      timeRef.current = newTime

      cooldownRef.current -= dt

      if (cooldownRef.current <= 0) doMorph()
      else doCooldown()
    }

    animate()
    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [doMorph, doCooldown])

  return { text1Ref, text2Ref }
}

interface NavMorphingTextProps {
  className?: string
  texts: string[]
}

const NavTexts: React.FC<Pick<NavMorphingTextProps, "texts">> = ({ texts }) => {
  const { text1Ref, text2Ref } = useNavMorphingText(texts)
  return (
    <>
      <span className="absolute inset-0 block" ref={text1Ref} />
      <span className="absolute inset-0 block" ref={text2Ref} />
    </>
  )
}

const NavSvgFilters: React.FC = () => (
  <svg id="nav-filters" className="fixed h-0 w-0" preserveAspectRatio="xMidYMid slice">
    <defs>
      <filter id="nav-threshold">
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 255 -140"
        />
      </filter>
    </defs>
  </svg>
)

export const NavMorphingText: React.FC<NavMorphingTextProps> = ({ texts = [], className }) => (
  <div
    className={cn(
      "relative inline-block [filter:url(#nav-threshold)_blur(0.3px)]",
      className,
    )}
  >
    <NavTexts texts={texts} />
    <NavSvgFilters />
  </div>
)