'use client'

import { motion } from 'framer-motion'
import SearchIcon from '@mui/icons-material/Search'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import BuildIcon from '@mui/icons-material/Build'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import SectionHeading from './SectionHeading.jsx'
import { useLang } from '../context/LangContext.jsx'

const ICONS = [SearchIcon, LightbulbIcon, BuildIcon, TrendingUpIcon]

const card = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: 'easeOut' },
  }),
}

export default function Process() {
  const { t, isRTL } = useLang()
  const { process } = t

  return (
    <section
      id="process"
      className="relative overflow-hidden py-24 md:py-32"
    >
      {/* Background accent */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-72 -translate-y-1/2 bg-gradient-to-r from-transparent via-slook-purple/10 to-transparent blur-3xl" />

      <div className="container-slook">
        <SectionHeading kicker={process.kicker} title={process.title} />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {process.steps.map((step, i) => {
            const Icon = ICONS[i]
            return (
              <motion.div
                key={step.num}
                custom={i}
                variants={card}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                whileHover={{ y: -6 }}
                className="card-glass relative overflow-hidden rounded-2xl p-6"
              >
                {/* Connector line (desktop only, between cards) */}
                {i < 3 && (
                  <div
                    className={`pointer-events-none absolute top-12 hidden h-px w-full bg-gradient-to-r from-slook-purple/40 to-transparent lg:block ${
                      isRTL ? 'right-full' : 'left-full'
                    }`}
                  />
                )}

                {/* Step number */}
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-slook-purple to-slook-blue text-white shadow-glow">
                    <Icon />
                  </span>
                  <span className="text-3xl font-bold text-white/10">
                    {step.num}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-bold text-gradient">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  {step.body}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
