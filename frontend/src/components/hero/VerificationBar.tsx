'use client'

import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'

const AUTHORITIES = ['HMDA', 'DTCP', 'EC', 'TGRERA'] as const

/**
 * Compact trust strip. Communicates that statutory approvals are checked before
 * a property is listed — the product's core differentiator — without spelling
 * the whole sentence out in the hero.
 */
export function VerificationBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
      className="flex justify-center"
    >
      <ul
        className="flex flex-wrap items-center justify-center gap-x-1 gap-y-3 rounded-2xl border border-white/[0.08] bg-black/25 px-4 py-3.5 backdrop-blur-md sm:gap-x-0 sm:rounded-full sm:px-3"
        aria-label="Statutory approvals verified before listing"
      >
        {AUTHORITIES.map((name, i) => (
          <li
            key={name}
            className={[
              'flex items-center gap-3 px-4 py-1 sm:px-6',
              i > 0 ? 'sm:border-l sm:border-white/[0.10]' : '',
            ].join(' ')}
          >
            <ShieldCheck className="h-[22px] w-[22px] shrink-0 text-primary-hover" strokeWidth={1.8} />
            <span className="leading-tight">
              <span className="block text-[15px] font-semibold tracking-wide text-foreground">
                {name}
              </span>
              <span className="block text-[11px] uppercase tracking-[0.18em] text-subtle-foreground">
                Verified
              </span>
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
