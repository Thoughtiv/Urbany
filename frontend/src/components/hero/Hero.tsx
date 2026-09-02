'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { CloudLayers } from './CloudLayers'
import { HeroWordmark } from './HeroWordmark'
import { VerificationBar } from './VerificationBar'
import { HeroActions } from './HeroActions'
import { ScrollIndicator } from './ScrollIndicator'

/**
 * Cinematic hero. Every band of the scene moves at its own rate under scroll
 * and (on pointer devices) under the cursor, so the composition reads as depth
 * rather than one flat image with text on top.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const [allowPointerParallax, setAllowPointerParallax] = useState(false)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // --- Scroll-driven depth: background slowest, foreground UI fastest ---
  const cityY = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const cityScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.3])
  const cloudParallax = [
    useTransform(scrollYProgress, [0, 1], ['0%', '58%']),
    useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
    useTransform(scrollYProgress, [0, 1], ['0%', '155%']),
    useTransform(scrollYProgress, [0, 1], ['0%', '215%']),
  ]
  const wordmarkY = useTransform(scrollYProgress, [0, 1], ['0%', '-85%'])
  const wordmarkScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.74])
  const wordmarkOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '-150%'])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])

  // --- Pointer-driven depth, smoothed so it never snaps to the cursor ---
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const smoothX = useSpring(pointerX, { stiffness: 45, damping: 20, mass: 0.6 })
  const smoothY = useSpring(pointerY, { stiffness: 45, damping: 20, mass: 0.6 })

  const cityMouseX = useTransform(smoothX, [-1, 1], [-22, 22])
  const cityMouseY = useTransform(smoothY, [-1, 1], [-16, 16])
  const wordMouseX = useTransform(smoothX, [-1, 1], [-38, 38])
  const wordMouseY = useTransform(smoothY, [-1, 1], [-22, 22])
  const uiMouseX = useTransform(smoothX, [-1, 1], [-15, 15])

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setAllowPointerParallax(fine && !reduced)
  }, [])

  useEffect(() => {
    if (!allowPointerParallax) return
    const onMove = (e: PointerEvent) => {
      pointerX.set((e.clientX / window.innerWidth) * 2 - 1)
      pointerY.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [allowPointerParallax, pointerX, pointerY])

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-background"
    >
      {/* 1 — Aerial city */}
      <motion.div className="absolute inset-0" style={{ y: cityY, scale: cityScale }}>
        <motion.div className="absolute inset-0" style={{ x: cityMouseX, y: cityMouseY }}>
          <Image
            src="/images/bg.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="scale-110 object-cover object-center"
          />
        </motion.div>
      </motion.div>

      {/* 2 — Cinematic grade: keeps type legible without crushing the city */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 50% 45%, rgba(8,10,12,0.26) 0%, rgba(8,10,12,0.50) 55%, rgba(8,10,12,0.82) 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(8,10,12,0.68) 0%, transparent 20%, transparent 74%, rgba(8,10,12,0.88) 100%)',
        }}
      />

      {/* 3 — Volumetric fog between camera and city */}
      <CloudLayers parallax={cloudParallax} />

      {/* 4 — Content */}
      <div className="relative z-10 flex w-full flex-col items-center px-5 pb-24 pt-32 sm:px-8 lg:pt-36">
        <HeroWordmark
          y={wordmarkY}
          scale={wordmarkScale}
          opacity={wordmarkOpacity}
          mouseX={wordMouseX}
          mouseY={wordMouseY}
        />

        <motion.div
          style={{ y: copyY, opacity: copyOpacity, x: uiMouseX }}
          className="mt-7 flex w-full flex-col items-center gap-7 sm:mt-9 sm:gap-8"
        >
          <div className="text-center">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl font-light tracking-tight text-white sm:text-3xl lg:text-[34px]"
            >
              Spaces that move with you.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3 text-[15px] text-muted-foreground sm:text-[17px] lg:text-[19px]"
            >
              Verified properties. Transparent deals. Better living.
            </motion.p>
          </div>

          <VerificationBar />
          <HeroActions />
        </motion.div>
      </div>

      <ScrollIndicator opacity={indicatorOpacity} />
    </section>
  )
}
