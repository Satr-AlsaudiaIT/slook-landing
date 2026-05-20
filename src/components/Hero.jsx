'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLang } from '../context/LangContext.jsx'
import { useContactInfo } from '../context/ContactInfoContext.jsx'

export default function Hero() {
  const { t } = useLang()
  const { whatsapp } = useContactInfo()
  
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden pt-28 pb-24 md:pt-36 md:pb-32 bg-slook-gradient"
    >
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-60" />
      <motion.div
        className="pointer-events-none absolute -top-32 -end-24 h-[28rem] w-[28rem] rounded-full bg-slook-purple/30 blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-40 -start-20 h-[24rem] w-[24rem] rounded-full bg-slook-blue/25 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
      />

      <div className="container-slook relative ">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="text-5xl font-bold !leading-snug tracking-tight md:text-7xl"
          >
            <span className="block text-white">{t.hero.title1}</span>
            <span className="mt-6 block text-gradient">{t.hero.title2}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl px-7 py-3 text-base font-semibold text-white bg-gradient-to-r from-slook-purple to-slook-blue shadow-[0_0_32px_rgba(114,64,237,0.5)] transition-all hover:from-[#8350FF] hover:to-[#1B75FF] hover:shadow-[0_0_48px_rgba(114,64,237,0.65)]"
            >
              <ArrowRight className="size-5 icon-flip" />
              {t.hero.primary}
            </a>
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-7 py-3 text-base font-semibold text-white transition-all hover:border-slook-purple hover:bg-slook-purple/8"
            >
              {t.hero.secondary}
            </a>
          </motion.div>

          {/* Stat strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="mt-16 grid grid-cols-3 gap-4 border-t border-white/5 pt-8 text-center md:gap-12"
          >
            {t.hero.stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-gradient md:text-4xl">{stat.value}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-white/50 md:text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
