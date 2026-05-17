'use client'

import { motion } from 'framer-motion'
import {
  Store, Megaphone, Share2, Globe, Heart, Mic,
  Palette, FileText, Camera, BarChart2, Tv,
  PartyPopper, Gift, MapPin, GraduationCap,
} from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import { useLang } from '../context/LangContext.jsx'

const ICON_MAP = {
  '01': Store,
  '02': Megaphone,
  '03': Share2,
  '04': Globe,
  '05': Heart,
  '06': Mic,
  '07': Palette,
  '08': FileText,
  '09': Camera,
  '10': BarChart2,
  '11': Tv,
  '12': PartyPopper,
  '13': Gift,
  '14': MapPin,
  '15': GraduationCap,
}

const card = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

function ServiceCard({ item, accent }) {
  const Icon = ICON_MAP[item.n]
  return (
    <motion.article
      variants={card}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="card-glass group relative overflow-hidden rounded-2xl p-6 transition-shadow hover:shadow-glow"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute top-3 ltr:right-4 rtl:left-4 service-num opacity-30"
      >
        {item.n}
      </span>

      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl ring-1 ring-white/10 ${
          accent === 'blue'
            ? 'bg-gradient-to-br from-slook-blue/30 to-slook-purple/20 text-slook-blue'
            : 'bg-gradient-to-br from-slook-purple/30 to-slook-blue/20 text-slook-purple'
        }`}
      >
        <Icon className="size-5" />
      </div>

      <h3 className="mt-5 text-lg font-semibold leading-snug">{item.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-white/65">{item.body}</p>
    </motion.article>
  )
}

export default function Services() {
  const { t } = useLang()
  const { services } = t

  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="container-slook">
        <SectionHeading kicker={services.kicker} title={services.title} />

        {/* Digital marketing */}
        <div className="mt-16">
          <div className="mb-8 flex items-center gap-4">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-slook-purple/40 to-transparent" />
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slook-purple">
              {services.digitalLabel}
            </h3>
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-slook-purple/40 to-transparent" />
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {services.digital.map((s) => (
              <ServiceCard key={s.n} item={s} accent="purple" />
            ))}
          </motion.div>
        </div>

        {/* Offline / brand */}
        <div className="mt-20">
          <div className="mb-8 flex items-center gap-4">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-slook-blue/40 to-transparent" />
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slook-blue">
              {services.offlineLabel}
            </h3>
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-slook-blue/40 to-transparent" />
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ show: { transition: { staggerChildren: 0.06 } } }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {services.offline.map((s) => (
              <ServiceCard key={s.n} item={s} accent="blue" />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
