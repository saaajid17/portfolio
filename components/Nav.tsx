'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import MagneticBtn from './MagneticBtn'

const links = [
  { label: 'About',    href: '#about' },
  { label: 'Journey',  href: '#journey' },
  { label: 'Projects', href: '#projects' },
  { label: 'Research', href: '#research' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Contact',  href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 50))

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-14"
      style={{ height: 70 }}
      animate={{
        backgroundColor: scrolled ? 'rgba(7,7,7,0.85)' : 'rgba(7,7,7,0)',
        borderBottomColor: scrolled ? 'rgba(201,169,110,0.1)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
      }}
      transition={{ duration: 0.4 }}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Logo */}
      <MagneticBtn>
        <a href="#hero" className="font-display text-[1.9rem] text-gold leading-none">S.</a>
      </MagneticBtn>

      {/* Desktop links */}
      <ul className="hidden md:flex gap-8 list-none">
        {links.map((l, i) => (
          <li key={l.href}>
            <MagneticBtn>
              <motion.a
                href={l.href}
                className="relative text-[0.7rem] tracking-[0.16em] uppercase text-muted hover:text-gold transition-colors duration-300 group"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.6 }}
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px bg-gold w-0 group-hover:w-full transition-all duration-300 ease-out" />
              </motion.a>
            </MagneticBtn>
          </li>
        ))}
      </ul>

      {/* Mobile toggle */}
      <button
        className="md:hidden flex flex-col gap-[5px] p-1 bg-transparent border-none"
        onClick={() => setOpen(o => !o)}
        aria-label="Menu"
        aria-expanded={open}
      >
        {[0,1,2].map(i => (
          <motion.span
            key={i}
            className="block h-px bg-muted origin-center"
            style={{ width: 22 }}
            animate={open ? (
              i === 0 ? { rotate: 45, y: 6 } :
              i === 1 ? { opacity: 0 } :
              { rotate: -45, y: -6 }
            ) : { rotate: 0, y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden fixed inset-0 top-[70px] z-[99] flex flex-col items-center justify-center gap-10"
            style={{ background: 'rgba(7,7,7,0.97)', backdropFilter: 'blur(24px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                className="font-display text-3xl font-light text-muted hover:text-gold transition-colors"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
