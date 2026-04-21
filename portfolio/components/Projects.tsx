'use client'

import { useRef, ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Reveal from './Reveal'
import SectionLabel from './SectionLabel'

// ── 3D tilt card ──────────────────────────────────────────────────
function TiltCard({ children, dim = false }: { children: ReactNode; dim?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const sx = useSpring(mx, { stiffness: 120, damping: 22 })
  const sy = useSpring(my, { stiffness: 120, damping: 22 })

  const rotateX = useTransform(sy, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(sx, [-0.5, 0.5], [-6, 6])
  const glareX  = useTransform(sx, [-0.5, 0.5], ['0%', '100%'])
  const glareY  = useTransform(sy, [-0.5, 0.5], ['0%', '100%'])

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width  - 0.5)
    my.set((e.clientY - rect.top)  / rect.height - 0.5)
  }
  const handleLeave = () => { mx.set(0); my.set(0) }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 900,
        opacity: dim ? 0.45 : 1,
      }}
      whileHover={dim ? {} : { scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 200, damping: 24 }}
      className="relative border border-[rgba(255,255,255,0.04)] p-7
                 hover:border-[rgba(201,169,110,0.16)] transition-colors duration-300
                 overflow-hidden group"
      data-hover
    >
      {/* Glare */}
      {!dim && (
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100
                     transition-opacity duration-500"
          style={{
            background: 'radial-gradient(circle at var(--gx) var(--gy), rgba(201,169,110,0.07), transparent 60%)',
            '--gx': glareX,
            '--gy': glareY,
          } as any}
        />
      )}

      {/* Top line that draws in */}
      <motion.div
        className="absolute top-0 left-0 h-[1px] bg-gradient-to-r from-gold to-transparent"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        style={{ transformOrigin: 'left', width: '100%' }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />

      {children}
    </motion.div>
  )
}

const projects = [
  {
    status: 'Active',
    tag:    'Web App · Career Tool',
    name:   'CSE Career Quest',
    desc:   'An interactive tracker I built to map my own CSE career milestones week by week — from GitHub setup and ML certifications to thesis preparation. A personal accountability system turned shareable roadmap.',
    links:  [{ label: 'GitHub', href: 'https://github.com/saaajid17', icon: 'git' }],
  },
  {
    status: null,
    tag:    'Coming Soon · Semester 8',
    name:   'ML Project #1',
    desc:   'A machine learning project currently in planning. Will be built during Semester 8 as part of my structured learning path and added here once complete.',
    links:  [],
    ghost:  true,
  },
  {
    status: null,
    tag:    'Coming Soon · Semester 9',
    name:   'NLP Research Project',
    desc:   'Natural Language Processing project planned for Semester 9, aligned with my thesis research direction and NLP interest area.',
    links:  [],
    ghost:  true,
  },
]

function GithubIcon() {
  return (
    <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.73-4.03-1.42-4.03-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.05.14 3 .4 2.28-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.7.8.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="bg-2 py-24 md:py-36 px-6 md:px-14">
      <div className="max-w-[1100px] mx-auto">
        <Reveal><SectionLabel label="Projects" /></Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-display font-light leading-[1.1] mb-12"
              style={{ fontSize: 'clamp(2rem, 3.6vw, 3rem)' }}>
            Things I've <em className="text-gold" style={{ fontStyle: 'italic' }}>built</em><br />
            &amp; am building
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 55, damping: 18, delay: i * 0.12 }}
            >
              <TiltCard dim={p.ghost}>
                {p.status && (
                  <span className="inline-block text-[0.59rem] px-2 py-0.5 mb-4
                                   bg-[rgba(201,169,110,0.1)] text-gold
                                   border border-[rgba(201,169,110,0.18)]
                                   tracking-[0.1em] uppercase">
                    {p.status}
                  </span>
                )}
                <p className="text-[0.67rem] tracking-[0.1em] uppercase text-muted mb-1">{p.tag}</p>
                <h3 className="font-display text-[1.5rem] font-light mb-3 leading-snug">{p.name}</h3>
                <p className="text-muted text-[0.83rem] leading-[1.82] mb-5">{p.desc}</p>
                {p.links.length > 0 && (
                  <div className="flex gap-4">
                    {p.links.map(l => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-[0.68rem] tracking-[0.12em]
                                   uppercase text-muted hover:text-gold transition-colors duration-300"
                      >
                        <GithubIcon />
                        {l.label}
                      </a>
                    ))}
                  </div>
                )}
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
