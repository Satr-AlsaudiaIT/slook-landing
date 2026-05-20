import { Poppins } from 'next/font/google'
import Providers from './providers'
import './globals.css'

/**
 * Fonts
 *  - Poppins (Google Fonts)        → used only in the LTR / English version
 *  - DIN Next LT Arabic (self-hosted) → used only in the RTL / Arabic version,
 *    loaded via @font-face in globals.css from `public/fonts/`.
 *
 * We use @font-face (not next/font/local) for the Arabic font so the build
 * doesn't fail when the licensed files aren't present yet — the browser just
 * falls back to a system Arabic font until you add them.
 *
 * Drop your DIN Next LT files at:
 *    public/fonts/DINNextLTArabic-Regular.woff2  (or .woff / .ttf / .otf)
 *    public/fonts/DINNextLTArabic-Bold.woff2
 */

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata = {
  title: 'Slook — Marketing Intelligence Ecosystem',
  description:
    'Slook is a Marketing Intelligence Ecosystem where AI, data, and human insight build brands that get seen, understood, and chosen.',
  themeColor: '#7240ED',
  icons: { icon: '/logo-02.png' },
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
      className={poppins.variable}
      suppressHydrationWarning
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
