'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, scrollViewport } from '@/lib/motion'
import type { ReactNode } from 'react'

interface StaggerChildrenProps {
  children: ReactNode
  className?: string
  stagger?: number
  delayChildren?: number
}

/** Wraps a grid/list. Give each direct child a `<StaggerItem>` (or `motion.div variants={fadeInUp}`) to participate. */
export function StaggerChildren({ children, className, stagger, delayChildren }: StaggerChildrenProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={scrollViewport}
      variants={staggerContainer(stagger, delayChildren)}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={fadeInUp}>
      {children}
    </motion.div>
  )
}
