import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// import './globals.css'
import { Header } from '@/components/header'
import Footer from '@/components/footer'
import { Script } from '@/components/script'
import SessionWrapper from '@/components/sessionwrapper'
import AppDataProvider from '@/components/appdataprovider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BOUTIQUE',
  description: 'BOUTIQUE',
  icons: {
    icon: '/assets/img/favicon.png'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppDataProvider>
      <SessionWrapper>
        <html lang="en">
          <head>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="robots" content="all,follow" />
            <link rel="stylesheet" href="/assets/vendor/glightbox/css/glightbox.min.css" />
            <link rel="stylesheet" href="/assets/vendor/nouislider/nouislider.min.css" />
            <link rel="stylesheet" href="/assets/vendor/choices.js/public/assets/styles/choices.min.css" />
            <link rel="stylesheet" href="/assets/vendor/swiper/swiper-bundle.min.css" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@300;400;700&amp;display=swap" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Martel+Sans:wght@300;400;800&amp;display=swap" />
            <link rel="stylesheet" href="/assets/css/style.default.css" id="theme-stylesheet" />
            <link rel="stylesheet" href="/assets/css/custom.css" />
          </head>
          <body className={inter.className}>
              <div className="page-holder">
                <Header />
                {children}
                <Footer />
                <Script />
              </div>
          </body>
        </html>
      </SessionWrapper>
    </AppDataProvider>
  )
}
