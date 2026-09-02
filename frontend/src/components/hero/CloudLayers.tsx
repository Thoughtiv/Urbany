'use client'

import { motion, type MotionValue } from 'framer-motion'

/**
 * Volumetric fog drifting between the camera and the city.
 *
 * Each layer is fractal noise turned into white fog via a colour matrix (bright
 * noise -> opaque, dark noise -> transparent), shaped by soft elliptical masks.
 * Layers differ in noise scale, blur, opacity and drift so they read as depth.
 *
 * Deliberately ONE sheet per layer, wider than the viewport, easing back and
 * forth by a couple of percent. Tiling a second copy to loop infinitely would
 * put a hard seam down the screen — fractal noise cannot match across the join.
 */

interface CloudLayerSpec {
  seed: number
  /** Noise scale — lower is larger and softer, i.e. further away. */
  frequency: string
  opacity: number
  blur: number
  /** Seconds for one drift sweep. Slow enough to feel atmospheric. */
  duration: number
  /** Vertical placement + height, as viewport-relative percentages. */
  top: string
  height: string
  drift: 'a' | 'b'
}

const LAYERS: CloudLayerSpec[] = [
  // Far — big, soft, barely moving.
  { seed: 5, frequency: '0.0014 0.0030', opacity: 0.17, blur: 16, duration: 34, top: '-12%', height: '62%', drift: 'a' },
  // Mid.
  { seed: 17, frequency: '0.0028 0.0056', opacity: 0.19, blur: 11, duration: 27, top: '14%', height: '58%', drift: 'b' },
  // Near.
  { seed: 29, frequency: '0.0050 0.0092', opacity: 0.16, blur: 7, duration: 21, top: '48%', height: '58%', drift: 'a' },
  // Foreground wisps — sharpest, fastest, lowest coverage.
  { seed: 41, frequency: '0.0080 0.0140', opacity: 0.13, blur: 4, duration: 16, top: '66%', height: '48%', drift: 'b' },
]

/** Patchy coverage on purpose — the gaps are what keep the city legible. */
const BLOBS = [
  { cx: 180, cy: 300, rx: 380, ry: 170 },
  { cx: 760, cy: 180, rx: 300, ry: 130 },
  { cx: 1240, cy: 330, rx: 390, ry: 175 },
  { cx: 1820, cy: 210, rx: 340, ry: 160 },
  { cx: 520, cy: 520, rx: 330, ry: 145 },
  { cx: 1520, cy: 540, rx: 350, ry: 150 },
]

function FogSheet({ spec }: { spec: CloudLayerSpec }) {
  const id = `urbany-cloud-${spec.seed}`
  return (
    <svg
      viewBox="0 0 2000 700"
      preserveAspectRatio="none"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <filter
          id={`${id}-tex`}
          x="-10%"
          y="-20%"
          width="120%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency={spec.frequency}
            numOctaves={5}
            seed={spec.seed}
            result="noise"
          />
          {/* RGB pinned to a cool blue-white; alpha driven hard off the noise so
              the fog breaks into wisps with genuinely clear gaps. */}
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0.87
                    0 0 0 0 0.91
                    0 0 0 0 0.95
                    0 0 0 2.6 -1.05"
          />
          <feGaussianBlur stdDeviation={spec.blur} />
        </filter>

        <radialGradient id={`${id}-falloff`}>
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="55%" stopColor="#fff" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>

        <mask id={`${id}-mask`}>
          {BLOBS.map((b, i) => (
            <ellipse key={i} {...b} fill={`url(#${id}-falloff)`} />
          ))}
        </mask>
      </defs>

      <g mask={`url(#${id}-mask)`}>
        <rect width="2000" height="700" fill="#ffffff" filter={`url(#${id}-tex)`} opacity={spec.opacity} />
      </g>
    </svg>
  )
}

/**
 * `parallax` is optional so the preloader can mount an identical instance with
 * no scroll binding. Both instances mount in the same frame, so their CSS drift
 * animations stay in phase — which is what lets the intro hand off to the hero
 * without the clouds visibly jumping.
 */
export function CloudLayers({ parallax }: { parallax?: MotionValue<string>[] }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {LAYERS.map((spec, i) => (
        <motion.div
          key={spec.seed}
          className="absolute left-0 w-full"
          style={{
            top: spec.top,
            height: spec.height,
            ...(parallax ? { y: parallax[i] } : {}),
          }}
        >
          {/* Overhangs the viewport on both sides so the sheet's own edges
              never scroll into frame while it drifts. */}
          <div
            className={`urbany-drift urbany-drift--${spec.drift} absolute -left-[14%] h-full w-[128%]`}
            style={{ animationDuration: `${spec.duration}s` }}
          >
            <FogSheet spec={spec} />
          </div>
        </motion.div>
      ))}
    </div>
  )
}
