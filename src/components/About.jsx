'use client'

import { motion } from 'framer-motion'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import InsightsIcon from '@mui/icons-material/Insights'
import PsychologyIcon from '@mui/icons-material/Psychology'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import SectionHeading from './SectionHeading.jsx'
import { useLang } from '../context/LangContext.jsx'

const ICONS = [InsightsIcon, PsychologyIcon, RocketLaunchIcon]

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function About() {
  const { t } = useLang()
  const { about } = t

  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="container-slook">
        <SectionHeading kicker={about.kicker} title={about.title} sub={about.lead} />

        {/* 3 pillars */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {about.points.map((p, i) => {
            const Icon = ICONS[i]
            return (
              <motion.div
                key={i}
                variants={item}
                whileHover={{ y: -4 }}
                className="card-glass group rounded-2xl p-6 transition-shadow hover:shadow-glow"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-slook-purple/30 to-slook-blue/20 ring-1 ring-white/10">
                    <Icon sx={{ color: '#7240ED' }} />
                  </span>
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white/70">
                  {p.body}
                </p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Why Slook block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="card-glass mt-20 overflow-hidden rounded-3xl p-8 md:p-12"
        >
          <div className="grid items-start gap-10 md:grid-cols-2">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-slook-blue">
                {about.whyKicker}
              </span>
              <h3 className="mt-3 text-3xl font-bold md:text-4xl">
                {about.whyTitle}
              </h3>
              <p className="mt-6 text-white/65 md:text-lg">{about.whyClose}</p>
            </div>

            <ul className="space-y-3">
              {about.whyPoints.map((point, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4"
                >
                  <CheckCircleIcon
                    sx={{ color: '#7240ED', fontSize: 22 }}
                    className="mt-0.5 shrink-0"
                  />
                  <span className="text-white/85">{point}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
