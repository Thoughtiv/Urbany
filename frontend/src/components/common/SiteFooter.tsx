'use client'

import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-section text-muted-foreground">
      <div className="container grid gap-10 py-16 lg:grid-cols-[1.2fr,1fr,1fr]">
        <div className="space-y-4">
          <Link href="/" className="inline-flex items-center gap-3 text-foreground">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-base font-bold text-primary-foreground">
              U
            </span>
            <span className="text-lg font-semibold tracking-tight">Urbany</span>
          </Link>
          <p className="max-w-md text-sm leading-relaxed">
            HMDA/DTCP-verified plots across Hyderabad's growth corridors, with legal intelligence built in — so you know
            exactly what you're buying before you visit.
          </p>
          <div className="max-w-sm space-y-2 pt-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-subtle-foreground">
              Get corridor alerts
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input type="email" placeholder="you@email.com" className="bg-card" />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 text-sm">
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-subtle-foreground">Product</h3>
            <ul className="space-y-2">
              <li><Link href="/search" className="hover:text-foreground">Search Properties</Link></li>
              <li><Link href="/search#corridors" className="hover:text-foreground">Growth Corridors</Link></li>
              <li><Link href="/search#legal" className="hover:text-foreground">Legal Intelligence</Link></li>
              <li><Link href="/pricing" className="hover:text-foreground">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-subtle-foreground">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-foreground">About Us</Link></li>
              <li><Link href="/partner" className="hover:text-foreground">Partner Portal</Link></li>
              <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-foreground">Privacy</Link></li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-subtle-foreground">Follow Us</h3>
          <div className="flex items-center gap-3">
            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
              <Link
                key={i}
                href="#"
                aria-label={Icon.displayName}
                className="rounded-full border border-border p-2 transition-colors hover:border-primary-hover/50 hover:text-foreground"
              >
                <Icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
          <p className="text-xs text-subtle-foreground">
            © {new Date().getFullYear()} Urbany. Verified plots, real legal intelligence.
          </p>
        </div>
      </div>
    </footer>
  )
}
