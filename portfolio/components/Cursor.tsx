'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const dotX = useMotionValue(0)
  const dotY = useMotionValue(0)

  const springX = useSpring(dotX, { stiffness: 120, damping: 18, mass: 0.3 })
  const springY = useSpring(dotY, { stiffness: 120, damping: 18, mass: 0.3 })

  const ringX = useSpring(dotX, { stiffness: 55, damping: 16, mass: 0.6 })
  const ringY = useSpring(dotY, { stiffness: 55, damping: 16, mass: 0.6 })

  const isHover = useRef(false)
  const scaleDot  = useSpring(1, { stiffness: 180, damping: 20 })
  const scaleRing = useSpring(1, { stiffness: 120, damping: 18 })

  useEffect(() => {
    const isFine = window.matchMedia('(pointer: fine)').matches
    if (!isFine) return

    const move = (e: MouseEvent) => {
      dotX.set(e.clientX)
      dotY.set(e.clientY)
    }

    const onEnter = () => { scaleDot.set(1.8); scaleRing.set(1.6); isHover.current = true }
    const onLeave = () => { scaleDot.set(1);   scaleRing.set(1);   isHover.current = false }

    const targets = document.querySelectorAll('a, button, [data-hover]')
    targets.forEach(t => {
      t.addEventListener('mouseenter', onEnter as EventListener)
      t.addEventListener('mouseleave', onLeave as EventListener)
    })

    window.addEventListener('mousemove', move)
    return () => {
      window.removeEventListener('mousemove', move)
      targets.forEach(t => {
        t.removeEventListener('mouseenter', onEnter as EventListener)
        t.removeEventListener('mouseleave', onLeave as EventListener)
      })
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          width: 7,
          height: 7,
          backgroundColor: 'var(--gold)',
          scale: scaleDot,
        }}
      />
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997] rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: 32,
          height: 32,
          border: '1px solid rgba(201,169,110,0.45)',
          scale: scaleRing,
        }}
      />
    </>
  )
}
