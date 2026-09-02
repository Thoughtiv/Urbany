'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useAuthStore } from '@/store/authStore'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Buy', href: '/search?intent=buy' },
  { label: 'Rent', href: '/search?intent=rent' },
  { label: 'Projects', href: '/#browse' },
  { label: 'Agents', href: '/#corridors' },
  { label: 'Insights', href: '/#legal' },
  { label: 'About Us', href: '/about' },
]

export default function SiteHeader() {
  const { user, logout } = useAuthStore()
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => setScrolled(latest > 32))

  const handleLogout = async () => {
    await logout()
    setMobileOpen(false)
    router.push('/')
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,backdrop-filter] duration-500',
        scrolled || mobileOpen
          ? 'border-white/[0.07] bg-background/80 backdrop-blur-xl'
          : 'border-transparent bg-transparent'
      )}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-5 py-5 sm:px-8 lg:px-14">
        <Link href="/" aria-label="Urbany home" className="shrink-0">
          <Image
            src="/images/logo.png"
            alt="Urbany"
            width={300}
            height={100}
            priority
            className="h-[52px] w-auto sm:h-14 lg:h-[62px]"
          />
        </Link>

        <nav className="hidden items-center gap-10 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="group relative text-[19px] font-medium text-white/70 transition-colors duration-300 hover:text-white"
            >
              {link.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-primary-hover transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-5">
          {!user ? (
            <>
              <Link
                href="/login"
                className="hidden text-[19px] font-medium text-white/70 transition-colors duration-300 hover:text-white lg:inline-flex"
              >
                Login
              </Link>
              <Link
                href="/properties/create"
                className="group hidden items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-[18px] font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary-hover sm:inline-flex"
              >
                List Property
                <ArrowRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </>
          ) : (
            <div className="hidden items-center gap-5 lg:flex">
              <Link
                href="/dashboard"
                className="text-[19px] font-medium text-white/70 transition-colors hover:text-white"
              >
                {user.firstName}
              </Link>
              <button
                onClick={handleLogout}
                className="text-[19px] font-medium text-white/50 transition-colors hover:text-destructive"
              >
                Logout
              </button>
            </div>
          )}

          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/25 text-white backdrop-blur-md transition-colors hover:bg-black/40 lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/[0.07] lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-5 sm:px-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-3.5 text-[19px] font-medium text-white/75 transition-colors hover:bg-white/[0.05] hover:text-white"
                >
                  {link.label}
                </Link>
              ))}

              <div className="mt-3 flex flex-col gap-3 border-t border-white/[0.07] pt-4">
                {!user ? (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-full border border-border px-6 py-3.5 text-center text-[16px] font-semibold text-white"
                    >
                      Login
                    </Link>
                    <Link
                      href="/properties/create"
                      onClick={() => setMobileOpen(false)}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-[16px] font-semibold text-primary-foreground"
                    >
                      List Property
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-full bg-primary px-6 py-3.5 text-center text-[16px] font-semibold text-primary-foreground"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="rounded-full border border-border px-6 py-3.5 text-[16px] font-semibold text-white/70"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
