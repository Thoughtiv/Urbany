'use client'

import Link from 'next/link'

export default function AboutPage() {
  return (
    <main className="container mx-auto py-20 px-4">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">About HireBuyer</h1>
        <p className="text-lg leading-8 text-slate-700 mb-6">
          HireBuyer helps buyers discover the best real estate investments by combining verified builder data,
          advanced property matching, and local market insights.
        </p>
        <p className="text-lg leading-8 text-slate-700 mb-6">
          Our platform is built to make property search smarter, faster, and more transparent for every buyer.
        </p>
        <Link href="/" className="inline-flex items-center rounded-full bg-sky-600 px-5 py-3 text-white shadow hover:bg-sky-700">
          Back to home
        </Link>
      </div>
    </main>
  )
}
