'use client'

import { motion, type MotionValue } from 'framer-motion'

interface HeroWordmarkProps {
  y: MotionValue<string>
  scale: MotionValue<number>
  opacity: MotionValue<number>
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
}

/**
 * The hero's dominant element. The brand swoosh is anchored to the `U` glyph's
 * own box rather than positioned by hand, so it stays aligned regardless of the
 * font that actually loads or the viewport width.
 */
export function HeroWordmark({ y, scale, opacity, mouseX, mouseY }: HeroWordmarkProps) {
  return (
    <motion.div style={{ y, scale, opacity }} className="relative">
      <motion.h1
        style={{ x: mouseX, y: mouseY }}
        className="select-none text-center font-display font-black uppercase leading-[0.82] tracking-[-0.03em] text-white"
      >
        <span
          className="inline-block"
          style={{ fontSize: 'clamp(2.9rem, 14.4vw, 14.5rem)' }}
        >
          <motion.span
            className="relative inline-block"
            initial={{ opacity: 0, y: '0.12em' }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            U
            {/* Brand swoosh, sized to the U it sits under */}
            <svg
              viewBox="0 0 100 24"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="absolute left-1/2 w-[78%] -translate-x-1/2"
              style={{ bottom: '-0.07em', height: '0.15em' }}
            >
              <path
                d="M4 3 Q50 31 96 3"
                fill="none"
                stroke="#03659C"
                strokeWidth="11"
                strokeLinecap="round"
              />
            </svg>
          </motion.span>
          {'RBANY'.split('').map((letter, i) => (
            <motion.span
              key={letter + i}
              className="inline-block"
              initial={{ opacity: 0, y: '0.12em' }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.1,
                delay: 0.15 + (i + 1) * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {letter}
            </motion.span>
          ))}
        </span>
      </motion.h1>
    </motion.div>
  )
}
