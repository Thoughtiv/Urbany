'use client'

import { Hero } from '@/components/hero/Hero'
import { SectionNavigation } from '@/components/hero/SectionNavigation'
import { LegalIntelligenceShowcase } from '@/components/sections/LegalIntelligenceShowcase'
import { CorridorRiskMap } from '@/components/sections/CorridorRiskMap'
import { SwipeablePlotStack } from '@/components/sections/SwipeablePlotStack'
import { CorridorLeaderboard } from '@/components/sections/CorridorLeaderboard'

export default function HomePage() {
  return (
    <main className="bg-background text-foreground">
      <SectionNavigation />
      <Hero />
      <LegalIntelligenceShowcase />
      <CorridorRiskMap />
      <SwipeablePlotStack />
      <CorridorLeaderboard />
    </main>
  )
}
