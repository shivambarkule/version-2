import type { Metadata } from 'next'
import { Inter, Poppins, Newsreader } from 'next/font/google'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-primary'
})
const newsreader = Newsreader({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-heading'
})

export const metadata: Metadata = {
  title: 'Xtrawrkx Manufacturing Business Pvt Ltd',
  description: 'End-to-end manufacturing solutions from design to production, leveraging cutting-edge technology. We specialize in advanced manufacturing processes, automation, and smart factory implementations for automotive, electronics, and industrial sectors.',
  keywords: 'manufacturing, automation, smart factory, automotive, electronics, industrial, production, quality systems, supply chain optimization',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${newsreader.variable}`}>
      <body className={`${inter.className} bg-[#131a43] text-white`}>
        {children}
      </body>
    </html>
  )
}

