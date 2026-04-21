'use client'

interface Props { label: string }

export default function SectionLabel({ label }: Props) {
  return (
    <p className="text-gold text-[0.68rem] tracking-[0.22em] uppercase mb-3 gold-line">{label}</p>
  )
}
