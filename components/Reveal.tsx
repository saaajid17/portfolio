'use client'
import { ReactNode, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'left' | 'right' | 'scale'
  once?: boolean
}

export default function Reveal({ children, delay = 0, className = '', direction = 'up', once = true }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once, margin: '0px 0px -60px 0px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: direction === 'up' ? 30 : 0, x: direction === 'left' ? -30 : direction === 'right' ? 30 : 0 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : direction === 'up' ? 30 : 0, x: inView ? 0 : direction === 'left' ? -30 : direction === 'right' ? 30 : 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
