'use client'

import { motion } from 'framer-motion'
import { Button } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useLang } from '../context/LangContext.jsx'

export default function Hero() {
  const { t } = useLang()

  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden pt-28 pb-24 md:pt-36 md:pb-32 bg-slook-gradient"
    >
      {/* Grid pattern overlay */}
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-60" />
      {/* Soft glow blobs */}
      <motion.div
        className="pointer-events-none absolute -top-32 -end-24 h-[28rem] w-[28rem] rounded-full bg-slook-purple/30 blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-40 -start-20 h-[24rem] w-[24rem] rounded-full bg-slook-blue/25 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
      />

      <div className="container-slook relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mx-auto max-w-4xl text-center"
        >
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="text-5xl font-bold leading-tight tracking-tight md:text-7xl"
          >
            <span className="block text-white">{t.hero.title1}</span>
            <span className="block text-gradient">{t.hero.title2}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button
              href="#contact"
              variant="contained"
              size="large"
              startIcon={<ArrowForwardIcon className="icon-flip" />}
              sx={{
                background: 'linear-gradient(135deg, #7240ED 0%, #0065F7 100%)',
                boxShadow: '0 0 32px rgba(114, 64, 237, 0.5)',
                paddingInline: '28px',
                fontSize: '1rem',
                '&:hover': {
                  background: 'linear-gradient(135deg, #8350FF 0%, #1B75FF 100%)',
                  boxShadow: '0 0 48px rgba(114, 64, 237, 0.65)',
                },
              }}
            >
              {t.hero.primary}
            </Button>
            <Button
              href="#about"
              variant="outlined"
              size="large"
              sx={{
                color: '#fff',
                borderColor: 'rgba(255,255,255,0.2)',
                paddingInline: '28px',
                fontSize: '1rem',
                '&:hover': {
                  borderColor: '#7240ED',
                  background: 'rgba(114,64,237,0.08)',
                },
              }}
            >
              {t.hero.secondary}
            </Button>
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
                <div className="text-3xl font-bold text-gradient md:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs uppercase tracking-wider text-white/50 md:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
