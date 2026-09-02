'use client'

import { type Variants } from 'framer-motion'

/**
 * Shared Framer Motion primitives for the Urbany UI.
 * Import these instead of writing one-off animation props per component.
 */

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

/** Wrap a grid/list's children in this to stagger their reveal. */
export const staggerContainer = (stagger = 0.1, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
})

/** Default viewport options for scroll-triggered reveals — fire once, slightly before fully in view. */
export const scrollViewport = { once: true, margin: '-80px' } as const

/** Spring used for magnetic buttons and price-toggle swaps. */
export const springTransition = { type: 'spring', stiffness: 300, damping: 24 } as const
