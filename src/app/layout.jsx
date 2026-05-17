import { Poppins, IBM_Plex_Sans_Arabic } from 'next/font/google'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import Providers from './providers'
import './globals.css'

/**
 * Root layout — server component.
 * Loads optimized Google fonts via next/font, then hands children to the
 * client-side Providers wrapper (LangContext + MUI theme).
 *
 * NOTE: The <html dir> attribute is rewritten by LangContext at runtime
 * once the user toggles language. We default to "ar"/"rtl" to match the
 * Slook brand's primary audience and to avoid a hydration flash.
 */

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const ibmArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ibm-arabic',
  display: 'swap',
})

export const metadata = {
  title: 'Slook — Marketing Intelligence Ecosystem',
  description:
    'Slook is a Marketing Intelligence Ecosystem where AI, data, and human insight build brands that get seen, understood, and chosen.',
  themeColor: '#7240ED',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'Slook — Marketing Intelligence Ecosystem',
    description:
      'AI + data + human insight. We make you seen, understood, and chosen.',
    url: 'https://slook.sa',
    siteName: 'Slook',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${poppins.variable} ${ibmArabic.variable}`}
      suppressHydrationWarning
    >
      <body>
        <AppRouterCacheProvider options={{ key: 'mui', prepend: true }}>
          <Providers>{children}</Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
