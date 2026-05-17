'use client'

import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading.jsx'
import { useLang } from '../context/LangContext.jsx'

/**
 * Clients wall.
 *
 * Placeholder approach (per project brief):
 * Each slot is a styled cell with the client name.
 * To swap in real assets:
 *   1. Drop the logo SVG/PNG into /public/clients/
 *   2. Replace the <span> text inside <ClientSlot> with <img src="/clients/saudia.svg" />
 */

function ClientSlot({ name, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: (index % 12) * 0.04, duration: 0.4 }}
      whileHover={{ scale: 1.05, borderColor: 'rgba(114, 64, 237, 0.6)' }}
      className="flex h-24 items-center justify-center rounded-xl border border-white/8 bg-white/[0.02] px-4 transition-colors"
    >
      {/* TODO: replace with <img src="/clients/{slug}.svg" alt={name} /> */}
      <span className="text-center text-sm font-medium text-white/55">
        {name}
      </span>
    </motion.div>
  )
}

export default function Clients() {
  const { t } = useLang()
  const { clients } = t

  return (
    <section
      id="clients"
      className="relative overflow-hidden py-24 md:py-32"
    >
      {/* Soft background */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-72 -translate-y-1/2 bg-gradient-to-r from-slook-blue/5 via-slook-purple/8 to-slook-blue/5 blur-3xl" />

      <div className="container-slook">
        <SectionHeading
          kicker={clients.kicker}
          title={clients.title}
          sub={clients.sub}
        />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {clients.list.map((name, i) => (
            <ClientSlot key={i} name={name} index={i} />
          ))}
        </div>

        {/* +50 badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 flex justify-center"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5">
            <span className="text-2xl font-bold text-gradient">+50</span>
            <span className="text-sm text-white/65">
              {t.dir === 'rtl' ? 'علامة تجارية' : 'brands & growing'}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
