'use client'

import Image from 'next/image'

/**
 * What the fog parts to reveal: the same aerial city the hero uses.
 *
 * Sharing the asset (and matching the hero's grade) is what makes the intro
 * feel like one continuous camera move into the page rather than a separate
 * splash screen that cuts away.
 */
export function CityReveal() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Image
        src="/images/bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="scale-110 object-cover object-center"
      />

      {/* Same grade as the hero so the hand-off is seamless */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 50% 45%, rgba(8,10,12,0.26) 0%, rgba(8,10,12,0.50) 55%, rgba(8,10,12,0.82) 100%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(8,10,12,0.68) 0%, transparent 20%, transparent 74%, rgba(8,10,12,0.88) 100%)',
        }}
      />
    </div>
  )
}
