import type { Metadata } from 'next'
import { Oranienbaum } from 'next/font/google'
import localFont from 'next/font/local'
import '@/styles/globals.scss'

import GlobalLoader from '@/components/layout/GlobalLoader/GlobalLoader'
import { AudioProvider } from '@/context/AudioContext'
import { GSAPProvider } from '@/context/GsapProvider'

const oranienbaum = Oranienbaum({
  variable: '--fontOranienbaum',
  weight: ['400'],
  subsets: ['latin'],
})

const sloopScriptPro = localFont({
  src: [
    {
      path: '../../public/fonts/SloopScriptPro.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--fontSloopScriptPro',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Свадьба Анатолия и Виктории',
  description: 'Присоединяйтесь к празднованию нашего особенного дня!',
  openGraph: {
    title: 'Свадьба Анатолия и Виктории',
    description: 'Присоединяйтесь к празднованию нашего особенного дня!',
    url: '/',
    siteName: 'Forevent - студія онлайн-запрошень',
    images: [
      {
        url: '/icons/logo.svg',
        width: 1200,
        height: 630,
        alt: 'Свадьба Анатолия и Виктории',
        type: 'image/jpeg',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Свадьба Анатолия и Виктории',
    description: 'Присоединяйтесь к празднованию нашего особенного дня!',
    images: ['/icons/logo.svg'],
  },
  icons: {
    icon: '/icons/logo.svg',
  },
  other: {
    google: 'notranslate',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ru"
      className={`${oranienbaum.variable} ${sloopScriptPro.variable}`}
    >
      <body>
        <AudioProvider>
          <GSAPProvider>
            <GlobalLoader>{children}</GlobalLoader>
          </GSAPProvider>
        </AudioProvider>
      </body>
    </html>
  )
}
