'use client'

import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading.jsx'
import { useLang } from '../context/LangContext.jsx'
import { useEffect, useState } from 'react'
import * as icons from 'lucide-react';

const card = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Services() {
  const { t, lang } = useLang()
  const { services } = t

  const [serviceList, setServiceList] = useState([])
  const activeServices = serviceList.filter((s) => s.is_active === 1)
  const serviceNumber = new Map(
    activeServices.map((service, index) => [service.id, index + 1])
  );

  // Get services from db
  useEffect(() => {
    async function loadServices() {
      const res = await fetch('/api/services');
      const data = await res.json();
      console.log(data)
      setServiceList(data);
    }
    loadServices();
  }, [])

  // Filter services by category
  const digitalServices = activeServices.filter((s) => s.category === 'digital');
  const offlineServices = activeServices.filter((s) => s.category === 'offline');
  const trainingServices = activeServices.filter((s) => s.category === 'training');

  function ServiceCard({ item, accent }) {
    const Icon = icons[item.icon_slug];
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
          {String(serviceNumber.get(item.id)).padStart(2, '0')}
        </span>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ring-1 ring-white/10 ${accent === 'blue'
            ? 'bg-gradient-to-br from-slook-blue/30 to-slook-purple/20 text-slook-blue'
            : 'bg-gradient-to-br from-slook-purple/30 to-slook-blue/20 text-slook-purple'
            }`}
        >
          {Icon && <Icon className="size-5" />}
        </div>

        <h3 className="mt-5 text-lg font-semibold leading-snug">{lang === 'ar' ? item.title_ar : item.title_en}</h3>
        <p className="mt-3 text-sm leading-relaxed text-white/65">{lang === 'ar' ? item.body_ar : item.body_en}</p>
      </motion.article>
    )
  }

  if (!activeServices.length) {
    return <></>;
  }

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
            key={`digital-${lang}`}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {digitalServices.map((s) => (
              <ServiceCard key={s.id} item={s} accent="purple" />
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
            key={`offline-${lang}`}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ show: { transition: { staggerChildren: 0.06 } } }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {offlineServices.map((s) => (
              <ServiceCard key={s.id} item={s} accent="blue" />
            ))}
          </motion.div>
        </div>

        {/* Training and empowerment */}
        {services.training && (
          <div className="mt-20">
            <div className="mb-8 flex items-center gap-4">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent via-slook-purple/40 to-transparent" />
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slook-purple">
                {services.trainingLabel}
              </h3>
              <span className="h-px flex-1 bg-gradient-to-r from-transparent via-slook-purple/40 to-transparent" />
            </div>

            <motion.div
              key={`training-${lang}`}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              variants={{ show: { transition: { staggerChildren: 0.08 } } }}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {trainingServices.map((s) => (
                <ServiceCard key={s.id} item={s} accent="purple" />
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}
