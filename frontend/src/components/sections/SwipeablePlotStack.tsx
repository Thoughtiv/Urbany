'use client'

import { useState } from 'react'
import { AnimatePresence, motion, type PanInfo } from 'framer-motion'
import { CheckCircle2, MapPin, RotateCcw, X } from 'lucide-react'
import { FadeInWhenVisible } from '@/components/motion/FadeInWhenVisible'

interface PlotCard {
  id: string
  title: string
  corridor: string
  price: string
  size: string
  image: string
}

const PLOTS: PlotCard[] = [
  {
    id: '1',
    title: 'Survey No. 214/A',
    corridor: 'Kokapet',
    price: '₹8,200/sqyd',
    size: '267 sqyd',
    image: 'linear-gradient(160deg, hsl(202 55% 22%), hsl(215 45% 9%))',
  },
  {
    id: '2',
    title: 'Survey No. 88/C',
    corridor: 'Tellapur',
    price: '₹6,400/sqyd',
    size: '300 sqyd',
    image: 'linear-gradient(160deg, hsl(198 50% 20%), hsl(220 40% 10%))',
  },
  {
    id: '3',
    title: 'Survey No. 51/B',
    corridor: 'Financial District',
    price: '₹8,500/sqyd',
    size: '180 sqyd',
    image: 'linear-gradient(160deg, hsl(205 58% 24%), hsl(212 42% 8%))',
  },
  {
    id: '4',
    title: 'Survey No. 302',
    corridor: 'Gachibowli',
    price: '₹7,900/sqyd',
    size: '240 sqyd',
    image: 'linear-gradient(160deg, hsl(200 52% 21%), hsl(218 38% 9%))',
  },
]

const SWIPE_THRESHOLD = 120

export function SwipeablePlotStack() {
  const [deck, setDeck] = useState(PLOTS)
  const [lastDirection, setLastDirection] = useState<'left' | 'right' | null>(null)

  const dismiss = (direction: 'left' | 'right') => {
    setLastDirection(direction)
    setDeck((prev) => prev.slice(1))
  }

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > SWIPE_THRESHOLD) dismiss('right')
    else if (info.offset.x < -SWIPE_THRESHOLD) dismiss('left')
  }

  const reset = () => {
    setDeck(PLOTS)
    setLastDirection(null)
  }

  return (
    <section id="browse" className="bg-background py-20">
      <div className="container grid gap-12 lg:grid-cols-[0.9fr,1.1fr] lg:items-center">
        <FadeInWhenVisible>
          <p className="text-sm uppercase tracking-[0.3em] text-primary-hover">Browse Verified Plots</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Swipe through this week&apos;s newly verified listings.
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Drag a card away — or use the buttons — to move through freshly verified plots across every corridor.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <button
              onClick={() => dismiss('left')}
              disabled={deck.length === 0}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-destructive transition-colors hover:bg-card-elevated disabled:opacity-40"
              aria-label="Pass"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              onClick={() => dismiss('right')}
              disabled={deck.length === 0}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-emerald-400 transition-colors hover:bg-card-elevated disabled:opacity-40"
              aria-label="Shortlist"
            >
              <CheckCircle2 className="h-5 w-5" />
            </button>
            {deck.length === 0 && (
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-card-elevated"
              >
                <RotateCcw className="h-4 w-4" />
                Start over
              </button>
            )}
          </div>
        </FadeInWhenVisible>

        <div className="relative mx-auto h-[420px] w-full max-w-sm">
          <AnimatePresence>
            {deck.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-border text-center"
              >
                <p className="text-lg font-semibold text-foreground">You&apos;re all caught up.</p>
                <p className="mt-1 text-sm text-muted-foreground">Check back for new verified listings.</p>
              </motion.div>
            )}
            {deck
              .slice(0, 3)
              .reverse()
              .map((plot, i) => {
                const isTop = i === deck.slice(0, 3).length - 1
                const stackIndex = deck.slice(0, 3).length - 1 - i
                return (
                  <motion.div
                    key={plot.id}
                    className="absolute inset-0 flex flex-col justify-between rounded-[1.75rem] border border-border p-6 shadow-2xl shadow-black/40"
                    style={{ background: plot.image }}
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{
                      scale: 1 - stackIndex * 0.04,
                      y: stackIndex * 12,
                      opacity: 1,
                      zIndex: 10 - stackIndex,
                    }}
                    exit={{
                      x: lastDirection === 'right' ? 320 : -320,
                      opacity: 0,
                      rotate: lastDirection === 'right' ? 18 : -18,
                      transition: { duration: 0.35 },
                    }}
                    drag={isTop ? 'x' : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.6}
                    onDragEnd={isTop ? handleDragEnd : undefined}
                    whileDrag={{ cursor: 'grabbing' }}
                  >
                    <div className="flex items-start justify-between">
                      <span className="inline-flex items-center gap-1 rounded-full bg-card/70 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur-sm">
                        <MapPin className="h-3 w-3" />
                        {plot.corridor}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Verified
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-white/70">{plot.title}</p>
                      <div className="mt-1 flex items-baseline gap-2">
                        <p className="text-2xl font-semibold text-white">{plot.price}</p>
                        <p className="text-sm text-white/60">· {plot.size}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
