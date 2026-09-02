'use client'

import { motion, useMotionValue, useSpring, type MotionProps, type MotionStyle } from 'framer-motion'
import Link from 'next/link'
import { type ComponentProps, type ComponentType, type MouseEvent, type ReactNode, useRef } from 'react'

// motion() loses the MotionProps overlap on a wrapped component, so restate it.
const MotionLink = motion(Link) as ComponentType<
  Omit<ComponentProps<typeof Link>, 'style'> & MotionProps
>

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  /** If set, renders as a Next.js Link instead of a button. */
  href?: string
  /** How strongly the button follows the cursor, in pixels of max travel. */
  strength?: number
}

/** A button/link that subtly pulls toward the cursor on hover — used for primary landing-page CTAs. */
export function MagneticButton({ children, className, onClick, href, strength = 12 }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.5 })
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.5 })

  const handleMouseMove = (e: MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    x.set((relX / (rect.width / 2)) * strength)
    y.set((relY / (rect.height / 2)) * strength)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const sharedProps = {
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    style: { x: springX, y: springY } as MotionStyle,
    className,
  }

  if (href) {
    return (
      <MotionLink ref={ref} href={href} {...sharedProps}>
        {children}
      </MotionLink>
    )
  }

  return (
    <motion.button ref={ref} onClick={onClick} {...sharedProps}>
      {children}
    </motion.button>
  )
}
