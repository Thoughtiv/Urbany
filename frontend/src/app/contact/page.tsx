'use client'

import Link from 'next/link'

export default function ContactPage() {
  return (
    <main className="container mx-auto py-20 px-4">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">Contact Us</h1>
        <p className="text-lg leading-8 text-slate-700 mb-6">
          Have a question about HireBuyer? Reach out to our support team and we will get back to you shortly.
        </p>
        <div className="space-y-4 text-slate-700">
          <p>Email: <a href="mailto:support@hirebuyer.com" className="font-semibold text-sky-600">support@hirebuyer.com</a></p>
          <p>Phone: <span className="font-semibold">+1 (555) 123-4567</span></p>
        </div>
        <Link href="/" className="inline-flex items-center rounded-full bg-sky-600 px-5 py-3 text-white shadow hover:bg-sky-700 mt-8">
          Back to home
        </Link>
      </div>
    </main>
  )
}
