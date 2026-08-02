'use client'

import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <main className="container mx-auto py-20 px-4">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">Privacy Policy</h1>
        <p className="text-lg leading-8 text-slate-700 mb-6">
          We respect your privacy and are committed to protecting your personal information.
        </p>
        <p className="text-base leading-7 text-slate-600">
          This page outlines how we collect, use, and store data to provide a better experience.
        </p>
        <Link href="/" className="inline-flex items-center rounded-full bg-sky-600 px-5 py-3 text-white shadow hover:bg-sky-700 mt-8">
          Back to home
        </Link>
      </div>
    </main>
  )
}
