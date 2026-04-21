'use client'

import { useEffect } from 'react'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Journey from '@/components/Journey'
import Projects from '@/components/Projects'
import Research from '@/components/Research'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import Cursor from '@/components/Cursor'

export default function Home() {
  // Smooth scroll via Lenis
  useEffect(() => {
    let lenis: any
    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })

      function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)
    })
    return () => lenis?.destroy()
  }, [])

  return (
    <main className="bg-main noise-bg">
      <Cursor />
      <Nav />
      <Hero />
      <About />
      <Journey />
      <Projects />
      <Research />
      <Skills />
      <Contact />
      <footer className="border-t border-faint px-8 md:px-16 py-6 flex justify-between items-center">
        <span className="text-faint text-xs tracking-widest uppercase">
          © 2025 Readowanul Haque Sajid
        </span>
        <span className="font-display text-faint text-2xl">S.</span>
      </footer>
    </main>
  )
}
