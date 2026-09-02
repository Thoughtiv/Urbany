'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, ShieldCheck } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { FadeInWhenVisible } from '@/components/motion/FadeInWhenVisible'
import { cn } from '@/lib/utils'

interface MapNode {
  name: string
  x: number
  y: number
  risk: 'clear' | 'flagged'
  note: string
}

const NODES: MapNode[] = [
  { name: 'Financial District', x: 66, y: 28, risk: 'clear', note: 'No Gram Panchayat risk' },
  { name: 'Gachibowli', x: 46, y: 42, risk: 'clear', note: 'No Gram Panchayat risk' },
  { name: 'Kokapet', x: 58, y: 58, risk: 'clear', note: 'No Gram Panchayat risk' },
  { name: 'Tellapur', x: 30, y: 50, risk: 'flagged', note: '2 plots flagged: unapproved layout' },
  { name: 'Adibatla', x: 78, y: 72, risk: 'clear', note: 'No Gram Panchayat risk' },
  { name: 'Shamshabad', x: 20, y: 76, risk: 'flagged', note: '1 plot flagged: GP land dispute' },
]

export function CorridorRiskMap() {
  const [riskView, setRiskView] = useState(false)
  const flaggedCount = useMemo(() => NODES.filter((n) => n.risk === 'flagged').length, [])

  return (
    <section id="risk-map" className="bg-section py-20">
      <div className="container grid gap-10 lg:grid-cols-[0.9fr,1.1fr] lg:items-center">
        <FadeInWhenVisible>
          <p className="text-sm uppercase tracking-[0.3em] text-primary-hover">Risk Intelligence</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Flip the switch. See what standard listings won&apos;t show you.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every corridor is screened for Gram Panchayat risk — the single highest-risk category for plot buyers.
            Flagged zones show up before you shortlist, not after you've paid a token advance.
          </p>

          <div className="mt-8 flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 text-sm">
              <ShieldCheck className={riskView ? 'h-5 w-5 text-subtle-foreground' : 'h-5 w-5 text-primary-hover'} />
              <span className={riskView ? 'text-subtle-foreground' : 'font-semibold text-foreground'}>Standard</span>
            </div>
            <Switch checked={riskView} onCheckedChange={setRiskView} aria-label="Toggle Gram Panchayat risk view" />
            <div className="flex items-center gap-2 text-sm">
              <AlertTriangle className={riskView ? 'h-5 w-5 text-destructive' : 'h-5 w-5 text-subtle-foreground'} />
              <span className={riskView ? 'font-semibold text-foreground' : 'text-subtle-foreground'}>Risk View</span>
            </div>
          </div>

          {riskView && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-sm text-destructive"
            >
              {flaggedCount} of {NODES.length} corridors have at least one Gram Panchayat–flagged plot.
            </motion.p>
          )}
        </FadeInWhenVisible>

        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-border bg-background">
          <svg className="absolute inset-0 h-full w-full opacity-30" aria-hidden="true">
            <defs>
              <pattern id="risk-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="hsl(var(--border))" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#risk-grid)" />
          </svg>

          {NODES.map((node) => {
            const isFlagged = riskView && node.risk === 'flagged'
            return (
              <div
                key={node.name}
                className="group absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <motion.div
                  className={cn(
                    'absolute inset-0 -m-3 rounded-full transition-colors duration-500',
                    isFlagged ? 'bg-destructive/50' : 'bg-primary-hover/40'
                  )}
                  animate={{
                    scale: isFlagged ? [1, 2.4, 1] : [1, 1.8, 1],
                    opacity: isFlagged ? [0.6, 0, 0.6] : [0.35, 0, 0.35],
                  }}
                  transition={{ duration: isFlagged ? 1.6 : 3, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div
                  className={cn(
                    'relative h-3 w-3 rounded-full transition-colors duration-500',
                    isFlagged ? 'bg-destructive' : 'bg-primary-hover'
                  )}
                />
                <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-44 -translate-x-1/2 rounded-lg border border-border bg-card/95 px-3 py-2 text-center opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
                  <p className="text-xs font-semibold text-foreground">{node.name}</p>
                  <p className={`mt-0.5 text-[11px] ${isFlagged ? 'text-destructive' : 'text-muted-foreground'}`}>
                    {isFlagged ? node.note : 'No Gram Panchayat risk'}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
