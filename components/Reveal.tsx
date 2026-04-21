'use client'

import { ReactNode, useRef } from 'react'
import { motion, useInView, Variants } from 'framer-motion'

interface Props {
  children: ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'left' | 'right' | 'scale'
  once?: boolean
}

export default function Reveal({
  children,
  delay = 0,
  className = '',
  direction = 'up',
  once = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once, margin: '0px 0px -60px 0px' })

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y:     direction === 'up'    ? 32 : 0,
      x:     direction === 'left'  ? -32 : direction === 'right' ? 32 : 0,
      scale: direction === 'scale' ? 0.92 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 60,
        damping: 20,
        mass: 0.8,
        delay,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  )
}
