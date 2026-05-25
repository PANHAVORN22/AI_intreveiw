import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AppLayout } from '@/components/layout/AppLayout'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const _jetBrainsMono = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'InterviewAI - Technical Interview Platform',
  description: 'AI-powered technical interviews for engineering candidates',
  generator: 'AI-interview',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark bg-background">
      <body className="font-sans antialiased text-foreground">
        <AppLayout>{children}</AppLayout>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
