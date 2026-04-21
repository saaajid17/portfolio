'use client'

import { motion } from 'framer-motion'
import Reveal from './Reveal'
import SectionLabel from './SectionLabel'

const items = [
  {
    icon: '🧠',
    title: 'Machine Learning',
    desc: 'Deeply interested in supervised and unsupervised learning, neural network architectures, and how models generalize. Currently building foundations through Andrew Ng\'s curriculum and hands-on Python notebooks.',
  },
  {
    icon: '💬',
    title: 'Natural Language Processing',
    desc: 'Fascinated by how machines understand and generate human language. Planning an NLP-focused project in Semester 9 with potential alignment to my undergraduate thesis.',
  },
  {
    icon: '☁️',
    title: 'Cloud & MLOps',
    desc: 'Exploring Microsoft Azure (working toward AZ-900) to understand how ML models are deployed, monitored, and scaled in real-world production environments.',
  },
  {
    icon: '📄',
    title: 'Undergraduate Research',
    desc: 'Actively planning to connect with BRAC University faculty for a supervised research project. Target outcome: at least one co-authored publication before graduation.',
  },
]

export default function Research() {
  return (
    <section id="research" className="py-24 md:py-36 px-6 md:px-14 overflow-hidden">
      <div className="max-w-[1100px] mx-auto">
        <Reveal><SectionLabel label="Research" /></Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-display font-light leading-[1.1] mb-12"
              style={{ fontSize: 'clamp(2rem, 3.6vw, 3rem)' }}>
            What I'm<br />
            <em className="text-gold" style={{ fontStyle: 'italic' }}>curious</em> about
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 60, damping: 18, delay: i * 0.1 }}
              whileHover={{
                y: -5,
                borderColor: 'rgba(201,169,110,0.22)',
                transition: { type: 'spring', stiffness: 200, damping: 20 },
              }}
              className="border border-[rgba(255,255,255,0.04)] p-7
                         transition-colors duration-300 group"
            >
              {/* Floating icon */}
              <motion.span
                className="block text-[1.8rem] mb-5 select-none w-fit"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
              >
                {item.icon}
              </motion.span>

              <h3 className="font-display text-[1.3rem] font-light mb-3 leading-snug">{item.title}</h3>
              <p className="text-muted text-[0.83rem] leading-[1.85]">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
