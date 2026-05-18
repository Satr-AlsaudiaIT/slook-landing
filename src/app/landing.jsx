'use client'

import { useLang } from '../context/LangContext'
import { ContactInfoProvider } from '../context/ContactInfoContext'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Process from '../components/Process'
import Services from '../components/Services'
import Clients from '../components/Clients'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import WhatsAppFloat from '../components/WhatsAppFloat'

/**
 * Client wrapper for the landing page.
 * Receives the server-fetched contactInfo and exposes it through context
 * so deep components (Navbar, Footer, Contact) can read live values.
 */
export default function Landing({ contactInfo }) {
  const { dir } = useLang()
  return (
    <ContactInfoProvider value={contactInfo}>
      <div dir={dir} className="min-h-screen bg-slook-ink text-white">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Process />
          <Services />
          <Clients />
          <Contact />
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </ContactInfoProvider>
  )
}
