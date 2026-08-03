'use client'

import Link from 'next/link'
import { Menu, UserCircle2 } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'

export default function SiteHeader() {
  const { user, logout } = useAuthStore()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl shadow-sm">
      <div className="container flex items-center justify-between gap-4 py-4">
        <Link href="/" className="inline-flex items-center gap-3 text-slate-900">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-600 text-white text-lg font-bold">
            HB
          </span>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-700">HireBuyer</p>
            <span className="text-base font-semibold">Property Matching</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            Explore Areas
          </Link>
          <Link href="/search" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            Builders
          </Link>
          <Link href="/search" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            Insights
          </Link>
          {!user ? (
            <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Login
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                {user.firstName}
              </Link>
              <button onClick={handleLogout} className="text-sm font-medium text-red-600 hover:text-red-700">
                Logout
              </button>
            </div>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {!user ? (
            <Link
              href="/signup"
              className="hidden rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-200/50 transition hover:bg-sky-700 md:inline-flex"
            >
              Create Buyer Profile
            </Link>
          ) : (
            <Link href="/dashboard" className="hidden rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-200/50 transition hover:bg-sky-700 md:inline-flex">
              Dashboard
            </Link>
          )}

          <button className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 md:hidden">
            <Menu className="h-5 w-5" />
          </button>
          <button className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50">
            <UserCircle2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  )
}
