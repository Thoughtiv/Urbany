'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Locomotive-style inertial scrolling, via Lenis (which Locomotive Scroll v4 is
 * itself built on).
 *
 * Lenis drives the *native* scroll position rather than transforming a wrapper
 * element, which is why the fixed navbar, the IntersectionObserver section rail
 * and Framer Motion's `useScroll` parallax all keep working untouched. A
 * transform-based smooth-scroll container would break all three.
 */

let instance: Lenis | null = null

/** The live Lenis instance, or null when smooth scroll is off (reduced motion). */
export function getLenis() {
  return instance
}

export function SmoothScrollProvider() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.05,
      // Exponential ease-out: quick response, long settle.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Native momentum on touch already feels right; overriding it fights the OS.
      syncTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    })

    instance = lenis
    document.documentElement.classList.add('lenis-active')

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      instance = null
      document.documentElement.classList.remove('lenis-active')
    }
  }, [])

  return null
}
