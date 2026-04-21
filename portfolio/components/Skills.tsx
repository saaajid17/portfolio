'use client'

import { motion } from 'framer-motion'
import Reveal from './Reveal'
import SectionLabel from './SectionLabel'

const technical = [
  { name: 'Python',                  level: 'Learning actively', pct: 52 },
  { name: 'Machine Learning (Theory)',level: 'Building',         pct: 38 },
  { name: 'GitHub / Git',            level: 'Active',            pct: 48 },
  { name: 'Azure Cloud',             level: 'In progress',       pct: 18 },
  { name: 'Data Science Fundamentals',level: 'Enrolling',        pct: 22 },
]

const certs = [
  { name: 'Andrew Ng — ML Specialization', level: 'Week 1 done',   pct: 8  },
  { name: 'CS50P — Harvard Python',        level: 'Starting',      pct: 5  },
  { name: 'IBM Data Science Certificate',  level: 'Planned',       pct: 3  },
  { name: 'AZ-900 Azure Fundamentals',     level: 'Planned Sem 8', pct: 3  },
  { name: 'IELTS',                         level: 'Target: Sem 9', pct: 2  },
]

function SkillBar({ name, level, pct, delay = 0 }: {
  name: string; level: string; pct: number; delay?: number
}) {
  return (
    <motion.div
      className="mb-5"
      initial={{ opacity: 0, x: -18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 65, damping: 20, delay }}
    >
      <div className="flex justify-between mb-1.5">
        <span className="text-[0.85rem] text-[#F4F0EA]">{name}</span>
        <span className="text-[0.72rem] text-muted">{level}</span>
      </div>
      <div className="h-px bg-[rgba(255,255,255,0.05)] overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-gold to-[#E2C98E]"
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1], delay: delay + 0.15 }}
        />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="bg-2 py-24 md:py-36 px-6 md:px-14">
      <div className="max-w-[1100px] mx-auto">
        <Reveal><SectionLabel label="Skills" /></Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-display font-light leading-[1.1] mb-12"
              style={{ fontSize: 'clamp(2rem, 3.6vw, 3rem)' }}>
            Tools &amp;<br />
            <em className="text-gold" style={{ fontStyle: 'italic' }}>technologies</em>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <div>
            <p className="text-[0.68rem] tracking-[0.16em] uppercase text-gold mb-6">Technical</p>
            {technical.map((s, i) => (
              <SkillBar key={s.name} {...s} delay={i * 0.06} />
            ))}
          </div>
          <div>
            <p className="text-[0.68rem] tracking-[0.16em] uppercase text-gold mb-6">
              Certifications &amp; Learning
            </p>
            {certs.map((s, i) => (
              <SkillBar key={s.name} {...s} delay={i * 0.06} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
