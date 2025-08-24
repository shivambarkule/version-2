import { useEffect, useRef, useState } from 'react'

export const useVantaHalo = () => {
  const vantaRef = useRef<HTMLDivElement>(null)
  const [vantaEffect, setVantaEffect] = useState<any>(null)

  useEffect(() => {
    let effect: any = null

    const initVanta = async () => {
      if (typeof window !== 'undefined') {
        const VANTA = (window as any).VANTA
        
        if (VANTA && VANTA.HALO) {
          effect = VANTA.HALO({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            amplitudeFactor: 1.90,
            xOffset: 0.20,
            yOffset: -0.21,
            size: 1.10
          })
          setVantaEffect(effect)
        }
      }
    }

    // Load Vanta.js script if not already loaded
    if (typeof window !== 'undefined' && !(window as any).VANTA) {
      const script = document.createElement('script')
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js'
      script.onload = () => {
        const vantaScript = document.createElement('script')
        vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.halo.min.js'
        vantaScript.onload = initVanta
        document.head.appendChild(vantaScript)
      }
      document.head.appendChild(script)
    } else {
      initVanta()
    }

    return () => {
      if (effect && effect.destroy) {
        effect.destroy()
      }
    }
  }, [])

  return vantaRef
}
