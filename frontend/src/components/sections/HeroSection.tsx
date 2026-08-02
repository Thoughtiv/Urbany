'use client'

import Link from 'next/link'
import { ArrowRight, MapPin, ShieldCheck, Sparkles } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-sky-700 via-slate-950 to-transparent opacity-80"></div>
      <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl" />
      <div className="absolute left-0 bottom-0 h-96 w-96 rounded-full bg-slate-700/30 blur-3xl" />

      <div className="container relative z-10 py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr,0.8fr] items-center">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.35em] text-sky-300">Find the Right Property — Not Just Listings</p>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight text-white md:text-6xl lg:text-7xl">
              Tell us your budget and preferences, HireBuyer finds the best properties for you.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Explore verified developments, builder credibility ratings, and smart matching to easily discover the right investment for your goals.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-white/10 border border-white/10 p-5">
                <p className="text-sm uppercase tracking-[0.25em] text-sky-300">Verified</p>
                <p className="mt-3 text-xl font-semibold text-white">Property Data</p>
              </div>
              <div className="rounded-3xl bg-white/10 border border-white/10 p-5">
                <p className="text-sm uppercase tracking-[0.25em] text-sky-300">Trusted</p>
                <p className="mt-3 text-xl font-semibold text-white">Builder Ratings</p>
              </div>
              <div className="rounded-3xl bg-white/10 border border-white/10 p-5">
                <p className="text-sm uppercase tracking-[0.25em] text-sky-300">Smart</p>
                <p className="mt-3 text-xl font-semibold text-white">Match Recommendations</p>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/search" className="inline-flex items-center justify-center rounded-full bg-sky-500 px-7 py-4 text-base font-semibold text-white shadow-xl shadow-sky-500/20 transition hover:bg-sky-400">
                Get My Matches
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/signup" className="inline-flex items-center justify-center rounded-full border border-slate-300/50 bg-white/10 px-7 py-4 text-base font-semibold text-white transition hover:bg-white/15">
                Create Buyer Profile
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
            <div className="rounded-[1.75rem] bg-slate-950 p-8 text-slate-50 shadow-lg shadow-slate-950/40">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-sky-300">Property Match</p>
                  <h2 className="mt-4 text-3xl font-semibold text-white">Top recommendations for Hyderabad</h2>
                </div>
                <div className="rounded-3xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white">Best Value</div>
              </div>

              <div className="mt-8 grid gap-4">
                <div className="rounded-3xl bg-slate-900/95 p-4">
                  <div className="flex items-center justify-between gap-4 text-sm text-slate-400">
                    <span>Match Score</span>
                    <span className="font-semibold text-white">92%</span>
                  </div>
                  <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
                    <div className="h-full w-[92%] rounded-full bg-sky-400" />
                  </div>
                </div>
                <div className="rounded-3xl bg-slate-900/95 p-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Budget</p>
                    <p className="mt-2 text-lg font-semibold text-white">₹95L - ₹1.1Cr</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Preferred Area</p>
                    <p className="mt-2 text-lg font-semibold text-white">Financial District</p>
                  </div>
                </div>
                <div className="rounded-3xl bg-slate-900/95 p-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Property Type</p>
                    <p className="mt-2 text-lg font-semibold text-white">3 BHK</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Tour Status</p>
                    <p className="mt-2 text-lg font-semibold text-white">Reserve Seat</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              <div className="rounded-3xl bg-white/10 p-5 text-slate-100">
                <p className="text-xs uppercase tracking-[0.3em] text-sky-300">Why HireBuyer</p>
                <p className="mt-3 text-sm leading-6 text-slate-200">We combine verified builder scores, market insights, and curated tours so you can move from discovery to booking faster.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
                <div className="flex items-center gap-3 text-slate-100">
                  <ShieldCheck className="h-5 w-5 text-sky-400" />
                  <p className="text-sm">Instant builder verification for every shortlisted project.</p>
                </div>
                <div className="mt-4 flex items-center gap-3 text-slate-100">
                  <MapPin className="h-5 w-5 text-sky-400" />
                  <p className="text-sm">Track commute, location, and livability all in one place.</p>
                </div>
                <div className="mt-4 flex items-center gap-3 text-slate-100">
                  <Sparkles className="h-5 w-5 text-sky-400" />
                  <p className="text-sm">Smart property matching that learns your preferences.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
