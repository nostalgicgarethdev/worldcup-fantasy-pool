import { useEffect } from 'react'

export function CursorLiquidMask() {
  useEffect(() => {
    const root = document.documentElement

    const update = (e: MouseEvent) => {
      // Use requestAnimationFrame for smooth 60fps updates
      requestAnimationFrame(() => {
        root.style.setProperty('--cursor-x', `${e.clientX}px`)
        root.style.setProperty('--cursor-y', `${e.clientY}px`)
      })
    }

    // Only enable on devices with fine pointer (mouse/trackpad), not touch
    const media = window.matchMedia('(pointer: fine)')
    if (!media.matches) return

    window.addEventListener('mousemove', update, { passive: true })

    // Initialize at center so there's no flash
    root.style.setProperty('--cursor-x', '50%')
    root.style.setProperty('--cursor-y', '50%')

    return () => {
      window.removeEventListener('mousemove', update)
      root.style.removeProperty('--cursor-x')
      root.style.removeProperty('--cursor-y')
    }
  }, [])

  return <div className="cursor-mask" />
}
