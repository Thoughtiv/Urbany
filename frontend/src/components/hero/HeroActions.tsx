'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function HeroActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 1.35, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4"
    >
      <Link
        href="/search"
        className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-primary px-9 py-4 text-[17px] font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-hover focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
      >
        Explore the Map
        <ArrowRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1" />
      </Link>

      <Link
        href="/signup"
        className="inline-flex w-full items-center justify-center rounded-full border border-border bg-black/30 px-9 py-4 text-[17px] font-semibold text-foreground backdrop-blur-md transition-colors duration-300 hover:border-white/25 hover:bg-black/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-hover focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
      >
        Create Free Account
      </Link>
    </motion.div>
  )
}
