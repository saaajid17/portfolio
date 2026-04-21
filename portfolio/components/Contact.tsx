'use client'

import { motion } from 'framer-motion'
import Reveal from './Reveal'
import SectionLabel from './SectionLabel'
import MagneticBtn from './MagneticBtn'

function GithubIcon() {
  return (
    <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.73-4.03-1.42-4.03-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.05.14 3 .4 2.28-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.7.8.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-36 px-6 md:px-14 border-t border-[rgba(255,255,255,0.04)]">
      <div className="max-w-[580px] mx-auto text-center">
        <Reveal><SectionLabel label="Contact" /></Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-display font-light leading-[1.1] mb-5"
              style={{ fontSize: 'clamp(2rem, 3.6vw, 3rem)' }}>
            Let's<br />
            <em className="text-gold" style={{ fontStyle: 'italic' }}>connect</em>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-muted text-[0.93rem] leading-[1.85] mb-8">
            Whether you're a recruiter, researcher, professor, or fellow builder —
            I'm always open to meaningful conversations. Reach out.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <MagneticBtn strength={0.15}>
            <motion.a
              href="mailto:readowanulhaquesajid@gmail.com"
              className="inline-block font-display font-light text-[#F4F0EA]
                         border-b border-[rgba(201,169,110,0.25)] pb-0.5 mb-10
                         hover:text-gold hover:border-gold transition-colors duration-300"
              style={{ fontSize: 'clamp(1rem, 2.4vw, 1.7rem)', wordBreak: 'break-all' }}
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 200, damping: 22 }}
            >
              readowanulhaquesajid@gmail.com
            </motion.a>
          </MagneticBtn>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="flex justify-center gap-3 flex-wrap">
            {[
              { href: 'https://github.com/saaajid17', label: 'GitHub', icon: <GithubIcon /> },
              { href: 'mailto:readowanulhaquesajid@gmail.com', label: 'Email', icon: <MailIcon /> },
            ].map((s) => (
              <MagneticBtn key={s.label} strength={0.3}>
                <motion.a
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-2 px-5 py-2.5
                             border border-[rgba(255,255,255,0.06)] text-muted text-[0.7rem]
                             tracking-[0.12em] uppercase
                             hover:border-[rgba(201,169,110,0.22)] hover:text-gold
                             transition-colors duration-300"
                  whileHover={{ y: -2 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 22 }}
                >
                  {s.icon}
                  {s.label}
                </motion.a>
              </MagneticBtn>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
