'use client'

import { ArrowDown, ArrowUp, Minus } from 'lucide-react'
import { FadeInWhenVisible } from '@/components/motion/FadeInWhenVisible'

interface CorridorRank {
  rank: number
  name: string
  price: string
  growth: string
  trend: 'up' | 'down' | 'flat'
}

const CORRIDORS: CorridorRank[] = [
  { rank: 1, name: 'Financial District', price: '₹8,500/sqyd', growth: '+12.4%', trend: 'up' },
  { rank: 2, name: 'Kokapet', price: '₹8,200/sqyd', growth: '+9.8%', trend: 'up' },
  { rank: 3, name: 'Gachibowli', price: '₹7,900/sqyd', growth: '+6.1%', trend: 'flat' },
  { rank: 4, name: 'Tellapur', price: '₹6,400/sqyd', growth: '+14.7%', trend: 'up' },
  { rank: 5, name: 'Adibatla', price: '₹4,100/sqyd', growth: '-1.2%', trend: 'down' },
  { rank: 6, name: 'Shamshabad', price: '₹3,800/sqyd', growth: '+18.3%', trend: 'up' },
]

function TrendIcon({ trend }: { trend: CorridorRank['trend'] }) {
  if (trend === 'up') return <ArrowUp className="h-3.5 w-3.5 text-emerald-400" />
  if (trend === 'down') return <ArrowDown className="h-3.5 w-3.5 text-destructive" />
  return <Minus className="h-3.5 w-3.5 text-subtle-foreground" />
}

function LeaderboardRow({ corridor }: { corridor: CorridorRank }) {
  return (
    <div className="flex w-[280px] shrink-0 items-center gap-4 rounded-2xl border border-border bg-card px-5 py-4 sm:w-[320px]">
      <span className="text-lg font-semibold text-subtle-foreground">
        {String(corridor.rank).padStart(2, '0')}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">{corridor.name}</p>
        <p className="text-xs text-muted-foreground">{corridor.price}</p>
      </div>
      <div className="flex items-center gap-1.5">
        <TrendIcon trend={corridor.trend} />
        <span
          className={
            corridor.trend === 'up'
              ? 'text-sm font-semibold text-emerald-400'
              : corridor.trend === 'down'
                ? 'text-sm font-semibold text-destructive'
                : 'text-sm font-semibold text-subtle-foreground'
          }
        >
          {corridor.growth}
        </span>
      </div>
    </div>
  )
}

export function CorridorLeaderboard() {
  // Duplicate the list so the CSS marquee loops seamlessly.
  const loopItems = [...CORRIDORS, ...CORRIDORS]

  return (
    <section id="corridors" className="border-y border-border bg-section py-16">
      <FadeInWhenVisible className="container mb-8">
        <p className="text-sm uppercase tracking-[0.3em] text-primary-hover">Live Corridor Rankings</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Growth corridors, ranked by momentum.
        </h2>
      </FadeInWhenVisible>

      <div
        className="group relative overflow-hidden"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}
      >
        <div className="flex w-max animate-[marquee_32s_linear_infinite] gap-4 group-hover:[animation-play-state:paused]">
          {loopItems.map((corridor, i) => (
            <LeaderboardRow key={`${corridor.name}-${i}`} corridor={corridor} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
