'use client'

import { motion } from 'framer-motion'
import { fadeInUp, scrollViewport } from '@/lib/motion'
import type { ReactNode } from 'react'

interface FadeInWhenVisibleProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function FadeInWhenVisible({ children, className, delay = 0 }: FadeInWhenVisibleProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={scrollViewport}
      variants={fadeInUp}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}
