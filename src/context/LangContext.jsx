'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { content } from '../i18n'

const LangContext = createContext(null)

export function LangProvider({ children, defaultLang = 'ar' }) {
  const [lang, setLang] = useState(defaultLang)

  const value = useMemo(() => {
    const t = content[lang]
    return {
      lang,
      setLang,
      toggle: () => setLang((l) => (l === 'ar' ? 'en' : 'ar')),
      t,
      dir: t.dir,
      isRTL: t.dir === 'rtl',
    }
  }, [lang])

  // Sync <html dir> + <html lang> so MUI / Tailwind / browser behave correctly
  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = value.dir
  }, [lang, value.dir])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside <LangProvider>')
  return ctx
}
