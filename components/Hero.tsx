'use client'

import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import MagneticBtn from './MagneticBtn'

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false })

const nameWords = ['Readowanul', 'Haque']
const nameAccent = 'Sajid'

export default function Hero() {
  const { scrollYProgress } = useScroll()
  const rawY = useTransform(scrollYProgress, [0, 0.3], [0, -80])
  const y = useSpring(rawY, { stiffness: 60, damping: 20 })
  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex overflow-hidden"
      aria-label="Introduction"
    >
      {/* ── Text side ───────────────────────────────────────── */}
      <motion.div
        className="relative z-10 flex flex-col justify-center
                   w-full md:w-1/2
                   px-6 md:px-14
                   pt-[90px] pb-16 md:py-0"
        style={{ y, opacity }}
      >
        {/* Eyebrow */}
        <motion.p
          className="text-gold text-[0.7rem] tracking-[0.24em] uppercase mb-5 flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 80, damping: 18, delay: 0.15 }}
        >
          <span className="block w-6 h-px bg-gold flex-shrink-0" />
          Hello, I'm
        </motion.p>

        {/* Name */}
        <h1 className="font-display font-light leading-[1.04] mb-3" aria-label="Readowanul Haque Sajid">
          {nameWords.map((word, wi) => (
            <span key={word} className="block overflow-hidden">
              <motion.span
                className="block"
                style={{ fontSize: 'clamp(3rem, 6vw, 5.2rem)', letterSpacing: '-0.02em' }}
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 55,
                  damping: 18,
                  delay: 0.25 + wi * 0.12,
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
          <span className="block overflow-hidden">
            <motion.em
              className="block not-italic text-gold"
              style={{ fontSize: 'clamp(3rem, 6vw, 5.2rem)', letterSpacing: '-0.02em' }}
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 55, damping: 18, delay: 0.49 }}
            >
              {nameAccent}
            </motion.em>
          </span>
        </h1>

        {/* Subtitle */}
        <motion.p
          className="text-[0.82rem] tracking-[0.08em] text-muted mb-5 uppercase"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 65, damping: 20, delay: 0.62 }}
        >
          CSE Student&nbsp; · &nbsp;ML / AI Enthusiast&nbsp; · &nbsp;Builder
        </motion.p>

        {/* Description */}
        <motion.p
          className="text-muted text-[0.93rem] leading-relaxed max-w-[400px] mb-8"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 65, damping: 20, delay: 0.75 }}
        >
          Studying <strong className="text-[#F4F0EA] font-normal">Computer Science at BRAC University</strong>, Dhaka.
          Mapping a deliberate path toward Machine Learning and AI — one week, one milestone, one project at a time.
        </motion.p>

        {/* CTA */}
        <motion.div
          className="flex gap-3 flex-wrap"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 65, damping: 20, delay: 0.88 }}
        >
          <MagneticBtn strength={0.25}>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-7 py-3
                         bg-gold text-[#080808] text-[0.72rem] font-medium
                         tracking-[0.13em] uppercase
                         transition-all duration-300
                         hover:bg-[#E2C98E] hover:shadow-[0_8px_28px_rgba(201,169,110,0.28)]
                         hover:-translate-y-0.5"
            >
              View Projects →
            </a>
          </MagneticBtn>

          <MagneticBtn strength={0.25}>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3
                         border border-[rgba(201,169,110,0.18)] text-muted text-[0.72rem]
                         tracking-[0.13em] uppercase
                         transition-all duration-300
                         hover:border-gold hover:text-[#F4F0EA]"
            >
              Get in Touch
            </a>
          </MagneticBtn>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-6 md:left-14 flex items-center gap-3
                     text-faint text-[0.62rem] tracking-[0.18em] uppercase hidden md:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <motion.span
            className="block h-px bg-gold origin-left"
            style={{ width: '2.5rem' }}
            animate={{ scaleX: [1, 1.15, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          Scroll to explore
        </motion.div>
      </motion.div>

      {/* ── 3D Scene side ───────────────────────────────────── */}
      <motion.div
        className="absolute right-0 top-0 h-full w-full md:w-1/2"
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      >
        <HeroScene />
      </motion.div>
    </section>
  )
}
