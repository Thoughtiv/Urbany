'use client'

import { motion, type MotionValue } from 'framer-motion'

export function ScrollIndicator({ opacity }: { opacity: MotionValue<number> }) {
  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none absolute inset-x-0 bottom-7 z-20 flex flex-col items-center gap-2.5"
      aria-hidden="true"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center gap-2.5"
      >
        <span className="flex h-9 w-[22px] items-start justify-center rounded-full border border-white/30 p-1.5">
          <motion.span
            className="block h-1.5 w-1 rounded-full bg-white/80 motion-reduce:animate-none"
            animate={{ y: [0, 9, 0], opacity: [1, 0.35, 1] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
        <span className="text-[10px] uppercase tracking-[0.35em] text-white/55">Scroll</span>
      </motion.div>
    </motion.div>
  )
}
