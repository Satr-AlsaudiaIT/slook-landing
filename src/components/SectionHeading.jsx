'use client'

import { motion } from 'framer-motion'

export default function SectionHeading({ kicker, title, sub, align = 'center' }) {
  const isCenter = align === 'center'
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className={isCenter ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}
    >
      {kicker && (
        <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-slook-purple">
          {kicker}
        </span>
      )}
      <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
        {title}
      </h2>
      {sub && (
        <p className="mt-4 text-base text-white/65 md:text-lg">{sub}</p>
      )}
    </motion.div>
  )
}
