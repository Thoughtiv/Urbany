'use client'

import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  className?: string
  prefix?: string
  suffix?: string
  /** Decimal places to show, e.g. 1 for "8.6" */
  decimals?: number
  duration?: number
}

/** Counts up from 0 to `value` once it scrolls into view. */
export function AnimatedCounter({
  value,
  className,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 1.2,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: duration * 1000, bounce: 0 })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, motionValue, value])

  useEffect(() => {
    return springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${latest.toFixed(decimals)}${suffix}`
      }
    })
  }, [springValue, prefix, suffix, decimals])

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  )
}
