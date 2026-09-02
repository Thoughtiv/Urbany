'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, FileText, Lock, RotateCw } from 'lucide-react'
import { FadeInWhenVisible } from '@/components/motion/FadeInWhenVisible'
import { StaggerChildren, StaggerItem } from '@/components/motion/StaggerChildren'

interface LegalCard {
  plot: string
  corridor: string
  price: string
  image: string
  checks: { label: string; status: string; locked?: boolean }[]
}

const CARDS: LegalCard[] = [
  {
    plot: 'Survey No. 214/A',
    corridor: 'Kokapet',
    price: '₹8,200/sqyd',
    image: 'linear-gradient(135deg, hsl(202 60% 18%), hsl(210 40% 8%))',
    checks: [
      { label: 'HMDA Approval', status: 'Approved' },
      { label: 'DTCP Layout', status: 'Approved' },
      { label: 'Encumbrance Cert.', status: 'Clear' },
      { label: 'Title Chain', status: 'Pro / Elite', locked: true },
    ],
  },
  {
    plot: 'Survey No. 88/C',
    corridor: 'Tellapur',
    price: '₹6,400/sqyd',
    image: 'linear-gradient(135deg, hsl(202 50% 16%), hsl(220 35% 9%))',
    checks: [
      { label: 'HMDA Approval', status: 'Approved' },
      { label: 'DTCP Layout', status: 'Approved' },
      { label: 'TGRERA Status', status: 'Registered' },
      { label: 'Title Chain', status: 'Pro / Elite', locked: true },
    ],
  },
  {
    plot: 'Survey No. 51/B',
    corridor: 'Financial District',
    price: '₹8,500/sqyd',
    image: 'linear-gradient(135deg, hsl(205 55% 20%), hsl(215 40% 10%))',
    checks: [
      { label: 'HMDA Approval', status: 'Approved' },
      { label: 'Gram Panchayat Risk', status: 'None Flagged' },
      { label: 'Encumbrance Cert.', status: 'Clear' },
      { label: 'Title Chain', status: 'Pro / Elite', locked: true },
    ],
  },
]

function FlipCard({ card }: { card: LegalCard }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className="group h-80 [perspective:1600px]"
      onClick={() => setFlipped((f) => !f)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && setFlipped((f) => !f)}
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-border p-6 [backface-visibility:hidden]"
          style={{ background: card.image }}
        >
          <div className="flex items-start justify-between">
            <span className="rounded-full bg-card/70 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur-sm">
              {card.corridor}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Verified
            </span>
          </div>
          <div>
            <p className="text-sm text-white/70">{card.plot}</p>
            <p className="mt-1 text-2xl font-semibold text-white">{card.price}</p>
            <p className="mt-3 flex items-center gap-1.5 text-xs text-white/60">
              <RotateCw className="h-3.5 w-3.5" />
              Click to view legal report
            </p>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 flex flex-col rounded-2xl border border-border bg-card p-6 [backface-visibility:hidden]"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="mb-4 flex items-center gap-2 text-primary-hover">
            <FileText className="h-4 w-4" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em]">Legal Report</p>
          </div>
          <div className="flex-1 space-y-3">
            {card.checks.map((check) => (
              <div key={check.label} className="flex items-center justify-between border-b border-border pb-2 text-sm">
                <span className="text-muted-foreground">{check.label}</span>
                {check.locked ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-subtle-foreground">
                    <Lock className="h-3 w-3" />
                    {check.status}
                  </span>
                ) : (
                  <span className="font-semibold text-foreground">{check.status}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export function LegalIntelligenceShowcase() {
  return (
    <section id="legal" className="bg-background py-20">
      <div className="container">
        <FadeInWhenVisible className="mx-auto max-w-2xl text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-primary-hover">Legal Intelligence</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Every listing hides a legal report. Literally.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Click any card to flip it over — that's the actual HMDA, DTCP, EC, and TGRERA readout behind the listing.
          </p>
        </FadeInWhenVisible>

        <StaggerChildren className="mt-12 grid gap-6 md:grid-cols-3" stagger={0.12}>
          {CARDS.map((card) => (
            <StaggerItem key={card.plot}>
              <FlipCard card={card} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  )
}
