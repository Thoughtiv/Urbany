'use client'

import { type MouseEvent, useMemo } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { MagneticButton } from '@/components/motion/MagneticButton'

interface CorridorNode {
  name: string
  stat: string
  x: number // percentage across viewport
  y: number // percentage down viewport
  delay: number
}

const CORRIDORS: CorridorNode[] = [
  { name: 'Financial District', stat: '₹8,500/sqyd', x: 66, y: 34, delay: 0 },
  { name: 'Gachibowli', stat: '₹7,900/sqyd', x: 46, y: 46, delay: 0.6 },
  { name: 'Kokapet', stat: '₹8,200/sqyd', x: 58, y: 62, delay: 1.2 },
  { name: 'Tellapur', stat: '₹6,400/sqyd', x: 32, y: 54, delay: 1.8 },
  { name: 'Adibatla', stat: '₹4,100/sqyd', x: 78, y: 74, delay: 2.4 },
  { name: 'Shamshabad', stat: '₹3,800/sqyd', x: 24, y: 78, delay: 3.0 },
]

// Loose network connecting corridors, purely aesthetic — not a real road layout.
const LINKS: [number, number][] = [
  [0, 1],
  [1, 2],
  [1, 3],
  [2, 4],
  [3, 5],
]

export function HeroSection() {
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const springX = useSpring(pointerX, { stiffness: 60, damping: 20 })
  const springY = useSpring(pointerY, { stiffness: 60, damping: 20 })
  const parallaxX = useTransform(springX, [-1, 1], [-14, 14])
  const parallaxY = useTransform(springY, [-1, 1], [-14, 14])

  const gridId = useMemo(() => 'hero-grid', [])

  const handlePointerMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    pointerX.set(((e.clientX - rect.left) / rect.width) * 2 - 1)
    pointerY.set(((e.clientY - rect.top) / rect.height) * 2 - 1)
  }

  return (
    <section
      onMouseMove={handlePointerMove}
      className="relative flex min-h-screen items-center overflow-hidden bg-background pt-20"
    >
      {/* Blueprint grid backdrop */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.35]" aria-hidden="true">
        <defs>
          <pattern id={gridId} width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M 64 0 L 0 0 0 64" fill="none" stroke="hsl(var(--border))" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${gridId})`} />
      </svg>

      {/* Corridor network layer — parallaxes gently with the cursor */}
      <motion.div className="absolute inset-0" style={{ x: parallaxX, y: parallaxY }} aria-hidden="true">
        <svg className="h-full w-full">
          {LINKS.map(([a, b], i) => {
            const from = CORRIDORS[a]
            const to = CORRIDORS[b]
            return (
              <motion.line
                key={i}
                x1={`${from.x}%`}
                y1={`${from.y}%`}
                x2={`${to.x}%`}
                y2={`${to.y}%`}
                stroke="hsl(var(--primary-hover))"
                strokeWidth={1}
                strokeDasharray="4 6"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.35 }}
                transition={{ duration: 1.8, delay: 0.4 + i * 0.15, ease: 'easeOut' }}
              />
            )
          })}
        </svg>

        {CORRIDORS.map((corridor) => (
          <div
            key={corridor.name}
            className="group absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${corridor.x}%`, top: `${corridor.y}%` }}
          >
            <motion.div
              className="absolute inset-0 -m-3 rounded-full bg-primary-hover/40"
              animate={{ scale: [1, 2.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, delay: corridor.delay, ease: 'easeInOut' }}
            />
            <motion.div
              className="relative h-2.5 w-2.5 rounded-full bg-primary-hover shadow-[0_0_12px_2px] shadow-primary-hover/70"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: corridor.delay * 0.3, duration: 0.4 }}
            />
            <div className="pointer-events-none absolute left-1/2 top-full mt-2 w-max -translate-x-1/2 rounded-lg border border-border bg-card/90 px-2.5 py-1.5 text-center opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
              <p className="text-xs font-semibold text-foreground">{corridor.name}</p>
              <p className="text-[10px] text-muted-foreground">{corridor.stat}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Vignette so the centered headline stays legible over the map */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 50% 44%, hsl(var(--background) / 0.92), transparent 70%), linear-gradient(to bottom, hsl(var(--background)) 0%, transparent 18%, transparent 78%, hsl(var(--background)) 100%)',
        }}
      />

      {/* Content */}
      <div className="container relative z-10 flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm uppercase tracking-[0.4em] text-primary-hover"
        >
          6 Verified Growth Corridors · Hyderabad
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-7xl"
        >
          Every plot on this map has already been checked for you.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground"
        >
          HMDA, DTCP, EC, and TGRERA status — verified before it's listed, not after you've fallen for it.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <MagneticButton
            href="/search"
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-xl shadow-primary/25 transition-colors hover:bg-primary-hover"
          >
            Explore the Map
            <ArrowRight className="ml-2 h-5 w-5" />
          </MagneticButton>
          <MagneticButton
            href="/signup"
            className="inline-flex items-center justify-center rounded-full border border-border bg-card/60 px-8 py-4 text-base font-semibold text-foreground backdrop-blur-sm transition-colors hover:bg-card"
          >
            Create Free Account
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-subtle-foreground"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="h-6 w-6" />
      </motion.div>
    </section>
  )
}
