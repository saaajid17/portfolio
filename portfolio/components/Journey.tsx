'use client'

import { motion } from 'framer-motion'
import Reveal from './Reveal'
import SectionLabel from './SectionLabel'

const weeks = [
  {
    num: 'Week 1',
    title: 'Just Start',
    status: 'done',
    tasks: [
      { done: true,  text: 'Create GitHub account' },
      { done: true,  text: 'Fill GitHub profile' },
      { done: true,  text: 'Install Anaconda (Python)' },
      { done: true,  text: 'Watch Andrew Ng — ML Week 1' },
    ],
  },
  {
    num: 'Week 2',
    title: 'Build First Thing',
    status: 'active',
    tasks: [
      { done: false, text: 'First GitHub repository' },
      { done: false, text: 'CS50P — Harvard Python' },
      { done: false, text: 'Google ML Crash Course Mod 1' },
    ],
  },
  {
    num: 'Week 3',
    title: 'Thesis + First Cert',
    status: 'soon',
    tasks: [
      { done: false, text: 'Email BRACU professor re: thesis' },
      { done: false, text: 'Enroll — IBM Data Science Cert' },
      { done: false, text: 'Update LinkedIn' },
    ],
  },
  {
    num: 'Week 4',
    title: 'Project + Azure',
    status: 'soon',
    tasks: [
      { done: false, text: 'Run first Python notebook' },
      { done: false, text: 'Start AZ-900 Azure Fundamentals' },
      { done: false, text: 'Follow ML/tech people online' },
    ],
  },
]

const semesters = [
  { sem: 'Semester 7 — Now', title: 'Foundation',    items: ['Setup + ML basics', 'GitHub & Python env', 'Identify thesis idea'] },
  { sem: 'Semester 8',       title: 'Build',         items: ['Projects + IBM cert', 'Azure fundamentals', 'Deepen ML/DL skills'] },
  { sem: 'Semester 9',       title: 'Break In',      items: ['Internship hunt', 'NLP project', 'IELTS preparation'] },
  { sem: 'Semester 10',      title: 'Thesis & Launch', items: ['Complete thesis', 'Publish a paper', 'Job applications'] },
  { sem: 'Post Graduation',  title: "What's Next",   items: ['GP NEXT or abroad', 'Graduate school', 'AI research contributions'], highlight: true },
]

const statusStyles: Record<string, string> = {
  done:   'bg-[rgba(201,169,110,0.12)] text-gold border border-[rgba(201,169,110,0.2)]',
  active: 'bg-[rgba(100,180,160,0.08)] text-[#82C9BA] border border-[rgba(100,180,160,0.22)]',
  soon:   'bg-[rgba(255,255,255,0.02)] text-[#2C2C28] border border-[rgba(255,255,255,0.04)]',
}
const statusLabel = { done: 'Done ✓', active: 'In Progress', soon: 'Upcoming' }

export default function Journey() {
  return (
    <section id="journey" className="py-24 md:py-36 px-6 md:px-14 overflow-hidden">
      <div className="max-w-[1100px] mx-auto">
        <Reveal><SectionLabel label="Journey" /></Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-display font-light leading-[1.1] mb-4"
              style={{ fontSize: 'clamp(2rem, 3.6vw, 3rem)' }}>
            The <em className="text-gold" style={{ fontStyle: 'italic' }}>roadmap</em><br />
            I'm walking
          </h2>
        </Reveal>

        <Reveal delay={0.18}>
          <p className="text-muted text-[0.93rem] leading-[1.88] max-w-xl mb-14">
            This isn't a wish list — it's a structured plan. Every semester has a goal, every week a milestone.
          </p>
        </Reveal>

        {/* Weekly cards */}
        <p className="text-[0.68rem] tracking-[0.18em] uppercase text-muted mb-5">
          Monthly Milestones
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-16">
          {weeks.map((w, wi) => (
            <motion.div
              key={w.num}
              className="border border-[rgba(255,255,255,0.05)] p-5
                         hover:border-[rgba(201,169,110,0.18)]
                         transition-colors duration-300 group"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 60, damping: 18, delay: wi * 0.1 }}
              whileHover={{ y: -4, transition: { type: 'spring', stiffness: 200, damping: 20 } }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[0.75rem] font-medium tracking-[0.07em] uppercase text-[#F4F0EA]">
                  {w.num}
                </span>
                <span className={`text-[0.58rem] px-2 py-0.5 tracking-[0.08em] uppercase ${statusStyles[w.status]}`}>
                  {statusLabel[w.status as keyof typeof statusLabel]}
                </span>
              </div>
              <p className="text-[0.8rem] text-muted mb-4 font-medium">{w.title}</p>
              <ul className="space-y-2">
                {w.tasks.map((t, ti) => (
                  <li key={ti} className={`flex gap-2 items-start text-[0.78rem] ${t.done ? 'text-[#2A2A24]' : 'text-muted'}`}>
                    <span className={`mt-[3px] flex-shrink-0 w-[13px] h-[13px] flex items-center justify-center
                                      text-[8px] border
                                      ${t.done
                                        ? 'border-gold text-gold bg-[rgba(201,169,110,0.1)]'
                                        : 'border-[rgba(255,255,255,0.06)] text-transparent'}`}>
                      {t.done ? '✓' : ''}
                    </span>
                    {t.text}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Semester roadmap */}
        <p className="text-[0.68rem] tracking-[0.18em] uppercase text-muted mb-5">
          2-Year Semester Roadmap
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {semesters.map((s, si) => (
            <motion.div
              key={s.sem}
              className={`border p-5 relative overflow-hidden
                          transition-all duration-300
                          ${s.highlight
                            ? 'border-[rgba(201,169,110,0.22)]'
                            : 'border-[rgba(255,255,255,0.05)] hover:border-[rgba(201,169,110,0.15)]'}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 65, damping: 18, delay: si * 0.08 }}
              whileHover={{ y: -3, transition: { type: 'spring', stiffness: 220, damping: 22 } }}
            >
              {/* Bottom gold line that grows on hover */}
              <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-gold"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />

              <p className={`text-[0.62rem] tracking-[0.14em] uppercase mb-1
                             ${s.highlight ? 'text-[#E2C98E]' : 'text-gold'}`}>
                {s.sem}
              </p>
              <p className={`font-display text-[1.1rem] mb-3 ${s.highlight ? 'text-gold' : 'text-[#F4F0EA]'}`}>
                {s.title}
              </p>
              <ul className="space-y-1">
                {s.items.map((item, ii) => (
                  <li key={ii} className="text-muted text-[0.76rem] pl-3 relative before:content-['·'] before:absolute before:left-0 before:text-gold before:opacity-60">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
