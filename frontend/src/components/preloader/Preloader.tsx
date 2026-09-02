'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CloudLayers } from '@/components/hero/CloudLayers'
import { getLenis } from '@/components/providers/SmoothScrollProvider'
import { CityReveal } from './CityReveal'

const SESSION_KEY = 'urbany:intro-played'

/**
 * Sequence beats, in seconds:
 *   white -> clouds form -> camera descends through them -> city -> hero.
 */
const T = {
  /** The opening white reads as being inside the cloud; it lifts to reveal
   *  structure. Kept short — a white wordmark cannot sit on a white field. */
  whiteFade: { at: 0.3, dur: 1.2 },
  cloudsIn: { at: 0.35, dur: 1.5 },
  /** Held until the white has fully lifted, so the logo has contrast. */
  logoIn: 1.5,
  /** Logo reaches full opacity here and holds until `logoOut`. */
  logoFull: 2.1,
  bar: { at: 1.7, dur: 1.8 },
  logoOut: 3.5,
  logoGone: 4.1,
  exitStart: 4.1,
  exitDuration: 0.9,
}

/**
 * The camera keeps descending right through the cross-fade: clouds and city
 * reach the hero's exact resting scale at the instant the overlay hits zero
 * opacity. Ending the descent early leaves a dead beat where nothing moves.
 */
const DESCENT = { at: 0.35, dur: T.exitStart + T.exitDuration - 0.35 }

type Phase = 'checking' | 'playing' | 'done'

export function Preloader() {
  const [phase, setPhase] = useState<Phase>('checking')
  const [exiting, setExiting] = useState(false)
  // Strict Mode double-invokes effects in dev; decide exactly once per mount.
  const decided = useRef(false)

  useEffect(() => {
    if (decided.current) return
    decided.current = true

    const seen = (() => {
      try {
        return sessionStorage.getItem(SESSION_KEY) === '1'
      } catch {
        return false
      }
    })()

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setPhase(seen || reducedMotion ? 'done' : 'playing')
  }, [])

  // Only remember the intro once it has actually finished, so a reload part-way
  // through still gets the full sequence.
  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      // Private-mode browsers: the intro simply replays next time.
    }
    setPhase('done')
  }, [])

  useEffect(() => {
    if (phase !== 'playing') return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    // Lenis drives scroll itself, so `overflow: hidden` alone will not hold it.
    const lenis = getLenis()
    lenis?.stop()
    return () => {
      document.body.style.overflow = previous
      lenis?.start()
    }
  }, [phase])

  useEffect(() => {
    if (phase !== 'playing') return
    const id = window.setTimeout(() => setExiting(true), T.exitStart * 1000)
    return () => window.clearTimeout(id)
  }, [phase])

  const skip = useCallback(() => setExiting(true), [])

  // Before the effect resolves, paint an opaque frame so page content never
  // flashes underneath for viewers who have already seen the intro.
  if (phase === 'checking') {
    return <div className="fixed inset-0 z-[100] bg-background" aria-hidden="true" />
  }

  if (phase === 'done') return null

  return (
    <AnimatePresence onExitComplete={finish}>
      {!exiting && (
        <motion.div
          key="urbany-intro"
          className="fixed inset-0 z-[100] cursor-pointer overflow-hidden bg-background"
          onClick={skip}
          role="status"
          aria-label="Urbany is loading"
          // Fades straight through to the hero, which by now holds an identical
          // city and identical clouds at the same scale — so nothing jumps.
          exit={{ opacity: 0 }}
          transition={{ duration: T.exitDuration, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* 1 — City, settling to the hero's resting scale */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.25 }}
            animate={{ opacity: 1, scale: 1.04 }}
            transition={{
              opacity: { duration: 1.6, delay: 0.9, ease: 'easeOut' },
              scale: { duration: DESCENT.dur, delay: DESCENT.at, ease: [0.33, 0, 0.35, 1] },
            }}
          >
            <CityReveal />
          </motion.div>

          {/* 2 — The hero's own cloud layers. Same component, same seeds, same
              drift phase; the intro only animates how close and how dense they
              are, landing on scale 1 / opacity 1 — the hero's exact state. */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              opacity: { duration: T.cloudsIn.dur, delay: T.cloudsIn.at, ease: 'easeOut' },
              scale: { duration: DESCENT.dur, delay: DESCENT.at, ease: [0.33, 0, 0.35, 1] },
            }}
            style={{ transformOrigin: '50% 45%' }}
          >
            <CloudLayers />
          </motion.div>

          {/* 3 — Opening white. Clouds emerge out of it as it lifts. */}
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: T.whiteFade.dur, delay: T.whiteFade.at, ease: 'easeInOut' }}
          />

          {/* 4 — Logo + loader, held back until the scene is dark enough for a
              white wordmark to read against it. */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1, 1, 0], y: [10, 10, 0, 0, -22] }}
            transition={{
              duration: T.logoGone,
              // Fade in, then hold for ~1.4s before leaving — a short hold read
              // as the logo flashing past rather than being presented.
              times: [
                0,
                T.logoIn / T.logoGone,
                T.logoFull / T.logoGone,
                T.logoOut / T.logoGone,
                1,
              ],
              ease: 'easeInOut',
            }}
          >
            <Image
              src="/images/logo.png"
              alt="Urbany"
              width={300}
              height={100}
              priority
              className="h-auto w-[220px] drop-shadow-[0_2px_24px_rgba(0,0,0,0.55)] sm:w-[280px]"
            />

            <div className="relative h-1 w-44 overflow-hidden rounded-full bg-white/[0.12]">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-primary-hover shadow-[0_0_12px_1px] shadow-primary-hover/60"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: T.bar.dur, delay: T.bar.at, ease: [0.4, 0, 0.2, 1] }}
              />
              <motion.div
                className="absolute inset-y-0 w-14 bg-gradient-to-r from-transparent via-white/35 to-transparent"
                initial={{ x: '-3.5rem' }}
                animate={{ x: '11rem' }}
                transition={{ duration: 1.1, delay: T.bar.at, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>

          <motion.p
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.35em] text-white/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9, duration: 0.6 }}
          >
            Tap to skip
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
