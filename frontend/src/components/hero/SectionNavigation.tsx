'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getLenis } from '@/components/providers/SmoothScrollProvider'

const SECTIONS = [
  { id: 'hero', label: 'Overview' },
  { id: 'legal', label: 'Legal Intelligence' },
  { id: 'risk-map', label: 'Risk Map' },
  { id: 'browse', label: 'Browse Plots' },
  { id: 'corridors', label: 'Corridors' },
] as const

/**
 * Editorial-style section rail. Desktop only — on smaller viewports the page
 * relies on normal scrolling and the bottom indicator instead.
 */
export function SectionNavigation() {
  const [active, setActive] = useState<string>('hero')

  useEffect(() => {
    const targets = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    )
    if (!targets.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top of the viewport that is on screen.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const goTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    // Route through Lenis when it is running so the jump shares the same
    // easing as wheel scrolling; fall back to native for reduced motion.
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(el, { duration: 1.2 })
    else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <motion.nav
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Page sections"
      className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-5 lg:flex"
    >
      {SECTIONS.map((section) => {
        const isActive = active === section.id
        return (
          <button
            key={section.id}
            onClick={() => goTo(section.id)}
            aria-label={section.label}
            aria-current={isActive ? 'true' : undefined}
            className="group relative flex h-3 w-3 items-center justify-center"
          >
            <span
              className={[
                'block rounded-full transition-all duration-300',
                isActive
                  ? 'h-2.5 w-2.5 bg-primary-hover'
                  : 'h-1.5 w-1.5 bg-white/30 group-hover:bg-white/70',
              ].join(' ')}
            />
            <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md border border-border bg-card/90 px-2 py-1 text-[11px] text-foreground opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
              {section.label}
            </span>
          </button>
        )
      })}

      <span
        className="mt-2 text-[10px] uppercase tracking-[0.35em] text-subtle-foreground"
        style={{ writingMode: 'vertical-rl' }}
      >
        Scroll
      </span>
    </motion.nav>
  )
}
