'use client'

import { LangProvider } from '../context/LangContext'
import { Toaster } from '@/components/ui/sonner'

export default function Providers({ children }) {
  return (
    <LangProvider defaultLang="ar">
      {children}
      <Toaster />
    </LangProvider>
  )
}
