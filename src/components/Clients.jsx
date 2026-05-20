'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import { useLang } from '../context/LangContext.jsx'

const clientLogos = [
  { id: 1, name: 'Client 1', src: '/clients/clients logos-01.png' },
  { id: 2, name: 'Client 2', src: '/clients/clients logos-02.png' },
  { id: 3, name: 'Client 3', src: '/clients/clients logos-03.png' },
  { id: 4, name: 'Client 4', src: '/clients/clients logos-04.png' },
  { id: 5, name: 'Client 5', src: '/clients/clients logos-05.png' },
  { id: 6, name: 'Client 6', src: '/clients/clients logos-06.png' },
  { id: 7, name: 'Client 7', src: '/clients/clients logos-07.png' },
  { id: 8, name: 'Client 8', src: '/clients/clients logos-08.png' },
  { id: 9, name: 'Client 9', src: '/clients/clients logos-09.png' },
  { id: 10, name: 'Client 10', src: '/clients/clients logos-10.png' },
  { id: 11, name: 'Client 11', src: '/clients/clients logos-11.png' },
  { id: 12, name: 'Client 12', src: '/clients/clients logos-12.png' },
  { id: 13, name: 'Client 13', src: '/clients/clients logos-13.png' },
  { id: 14, name: 'Client 14', src: '/clients/clients logos-14.png' },
]

function ClientCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  const itemsPerView = 6
  const totalSlides = clientLogos.length

  useEffect(() => {
    if (!autoPlay) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides)
    }, 3000)
    return () => clearInterval(interval)
  }, [autoPlay, totalSlides])

  const nextSlide = () => {
    setAutoPlay(false)
    setCurrentIndex((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setAutoPlay(false)
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const getVisibleLogos = () => {
    const visible = []
    for (let i = 0; i < itemsPerView; i++) {
      visible.push(clientLogos[(currentIndex + i) % totalSlides])
    }
    return visible
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        {/* Carousel container */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-4"
            animate={{ x: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            {getVisibleLogos().map((logo, idx) => (
              <motion.div
                key={`${logo.id}-${idx}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
                className="flex min-w-[calc(16.666%-1rem)] flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur transition-colors hover:border-white/20 hover:bg-white/[0.05]"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="max-h-16 w-full object-contain"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Navigation buttons */}
        <button
          onClick={prevSlide}
          onMouseEnter={() => setAutoPlay(false)}
          onMouseLeave={() => setAutoPlay(true)}
          className="absolute -left-6 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/70 transition-all hover:border-white/40 hover:bg-white/10 hover:text-white"
          aria-label="Previous slide"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          onClick={nextSlide}
          onMouseEnter={() => setAutoPlay(false)}
          onMouseLeave={() => setAutoPlay(true)}
          className="absolute -right-6 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/70 transition-all hover:border-white/40 hover:bg-white/10 hover:text-white"
          aria-label="Next slide"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      {/* Slide indicators */}
      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: Math.ceil(totalSlides / itemsPerView) }).map(
          (_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setAutoPlay(false)
                setCurrentIndex(idx * itemsPerView)
              }}
              className={`h-2 rounded-full transition-all ${
                idx === Math.floor(currentIndex / itemsPerView)
                  ? 'w-6 bg-slook-purple'
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          )
        )}
      </div>
    </div>
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

        <div className="mt-14">
          <ClientCarousel />
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
