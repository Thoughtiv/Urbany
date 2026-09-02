import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono, Montserrat } from 'next/font/google'
import { ApolloWrapper } from '@/components/providers/ApolloWrapper'
import { ToastProvider } from '@/components/providers/ToastProvider'
import SiteHeader from '@/components/common/SiteHeader'
import SiteFooter from '@/components/common/SiteFooter'
import { Preloader } from '@/components/preloader/Preloader'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import '@/styles/globals.css'

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
})

/** Display face for the giant hero wordmark — wide, geometric, architectural. */
const montserrat = Montserrat({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['800', '900'],
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 5.0,
  themeColor: '#080a0c',
}

export const metadata: Metadata = {
  title: 'Urbany - Verified Plots, Real Legal Intelligence',
  description:
    'Urbany finds HMDA/DTCP-verified plots across Hyderabad’s growth corridors, with legal intelligence — HMDA, DTCP, EC, and TGRERA status — built into every listing.',
  keywords: [
    'real estate',
    'plot buying',
    'HMDA verified plots',
    'DTCP verified plots',
    'legal intelligence',
    'hyderabad real estate',
    'growth corridors',
    'PWA',
    'search',
  ],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://urbany.example.com',
    title: 'Urbany',
    description: 'Verified plots across Hyderabad’s growth corridors, backed by real legal intelligence.',
    siteName: 'Urbany',
    images: [
      {
        url: 'https://urbany.example.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Urbany',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Urbany',
    description: 'Verified plots across Hyderabad’s growth corridors, backed by real legal intelligence.',
    images: ['https://urbany.example.com/twitter-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${montserrat.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        <ApolloWrapper>
          <ToastProvider>
            <SmoothScrollProvider />
            <Preloader />
            <div className="min-h-screen">
              <SiteHeader />
              {children}
              <SiteFooter />
            </div>
          </ToastProvider>
        </ApolloWrapper>
      </body>
    </html>
  )
}
