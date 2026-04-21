'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import Reveal from './Reveal'
import SectionLabel from './SectionLabel'

const stats = [
  { num: 'CSE',  label: 'Major' },
  { num: 'BRAC', label: 'University' },
  { num: 'ML',   label: 'Focus Area' },
  { num: 'BD',   label: 'Based In' },
]

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  // Parallax on photo
  const rawImgY = useTransform(scrollYProgress, [0, 1], [-35, 35])
  const imgY = useSpring(rawImgY, { stiffness: 40, damping: 20 })

  return (
    <section id="about" ref={ref} className="bg-2 py-24 md:py-36 px-6 md:px-14 overflow-hidden">
      <div className="max-w-[1100px] mx-auto grid md:grid-cols-[360px_1fr] gap-16 md:gap-24 items-center">

        {/* Photo */}
        <Reveal direction="left">
          <div className="relative" data-hover>
            {/* Decorative border */}
            <div className="absolute -top-3 -left-3 -bottom-[-12px] -right-[-12px]
                            border border-[rgba(201,169,110,0.12)] pointer-events-none z-10" />

            {/* Photo container with parallax */}
            <motion.div style={{ y: imgY }} className="overflow-hidden">
              <Image
                src="/sajid.jpg"
                alt="Sajid at an outdoor evening event"
                width={720}
                height={1080}
                className="block w-full object-cover grayscale-[12%] contrast-[1.04] saturate-[0.88]"
                priority={false}
              />
            </motion.div>

            {/* Tag */}
            <motion.div
              className="absolute -bottom-4 -right-4 z-20 bg-[#070707]
                         border border-[rgba(201,169,110,0.18)]
                         px-4 py-3 text-gold text-[0.68rem] tracking-[0.16em] uppercase"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.5 }}
            >
              BRAC University · CSE
            </motion.div>
          </div>
        </Reveal>

        {/* Text */}
        <div>
          <Reveal><SectionLabel label="About Me" /></Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-display font-light leading-[1.1] mb-7"
                style={{ fontSize: 'clamp(2rem, 3.6vw, 3rem)' }}>
              The mind<br />behind the{' '}
              <em className="text-gold not-italic" style={{ fontStyle: 'italic' }}>code</em>
            </h2>
          </Reveal>

          {[
            <>I'm <strong className="text-[#F4F0EA] font-normal">Sajid</strong>, a Computer Science student at BRAC University, Bangladesh. My focus is on <strong className="text-[#F4F0EA] font-normal">Machine Learning and Artificial Intelligence</strong> — I'm fascinated by the idea of building systems that learn, adapt, and solve real problems.</>,
            <>I'm at the exciting beginning of a deliberate journey. I've mapped out my path — from certifications to research to internships — not just to graduate, but to <strong className="text-[#F4F0EA] font-normal">build something meaningful</strong> along the way.</>,
            <>Long-term, I'm aiming for undergraduate research, a co-authored paper, and eventually graduate school or a career in AI — either here or abroad.</>,
          ].map((text, i) => (
            <Reveal key={i} delay={0.18 + i * 0.1}>
              <p className="text-muted text-[0.93rem] leading-[1.9] mb-4">{text}</p>
            </Reveal>
          ))}

          {/* Stats */}
          <Reveal delay={0.45}>
            <div className="flex gap-8 mt-8 pt-8 border-t border-[rgba(255,255,255,0.04)] flex-wrap">
              {stats.map((s, i) => (
                <motion.div
                  key={s.num}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 70, damping: 18, delay: 0.5 + i * 0.07 }}
                >
                  <div className="font-display text-[1.9rem] font-light text-gold leading-none mb-1">
                    {s.num}
                  </div>
                  <div className="text-[0.66rem] tracking-[0.14em] uppercase text-muted">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  )
}
