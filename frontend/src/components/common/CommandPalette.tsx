'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Building2, LayoutDashboard, MapPin, ScrollText, Search, Sparkles } from 'lucide-react'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'

const NAV_ITEMS = [
  { label: 'Search Properties', href: '/search', icon: Search },
  { label: 'Explore Corridors', href: '/#corridors', icon: MapPin },
  { label: 'Legal Intelligence', href: '/#legal', icon: ScrollText },
  { label: 'Pricing', href: '/pricing', icon: Sparkles },
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Partner Portal', href: '/partner', icon: Building2 },
]

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const go = (href: string) => {
    setOpen(false)
    router.push(href)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary-hover/50 hover:text-foreground"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Quick search…</span>
        <kbd className="ml-2 hidden items-center gap-0.5 rounded border border-border bg-card-elevated px-1.5 py-0.5 text-[10px] font-medium text-subtle-foreground sm:inline-flex">
          ⌘K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search properties, corridors, pages…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigate">
            {NAV_ITEMS.map((item) => (
              <CommandItem key={item.href} onSelect={() => go(item.href)}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Growth Corridors">
            {['Financial District', 'Gachibowli', 'Kokapet'].map((corridor) => (
              <CommandItem key={corridor} onSelect={() => go(`/search?corridor=${encodeURIComponent(corridor)}`)}>
                <MapPin className="mr-2 h-4 w-4" />
                {corridor}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
