import type { Metadata } from 'next'
import { Cormorant_Garamond, Outfit } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-outfit',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sajid — CSE Student & ML Enthusiast',
  description: 'Readowanul Haque Sajid — Computer Science student at BRAC University, ML/AI enthusiast and builder.',
  keywords: ['Sajid', 'BRAC University', 'CSE', 'Machine Learning', 'AI', 'Portfolio'],
  authors: [{ name: 'Readowanul Haque Sajid' }],
  openGraph: {
    title: 'Sajid — Portfolio',
    description: 'CSE student at BRAC University. Building in ML/AI.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
