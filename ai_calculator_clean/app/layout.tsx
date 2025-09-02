
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Product Launch Calculator - Calculate Your Revenue Opportunity',
  description: 'Discover exactly how much money you\'re leaving on the table by NOT having an AI-powered digital product. Get your personalized 7-step roadmap to capture it in 7 days.',
  keywords: 'AI product launch, revenue calculator, digital product, AI automation, business growth',
  authors: [{ name: 'AI Product Launch Calculator' }],
  openGraph: {
    title: 'Calculate Your Hidden AI Revenue Opportunity',
    description: 'See exactly how much money you\'re losing without an AI-powered digital product + get the proven 7-step roadmap to capture it.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculate Your Hidden AI Revenue Opportunity',
    description: 'See exactly how much money you\'re losing without an AI-powered digital product + get the proven 7-step roadmap to capture it.',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
