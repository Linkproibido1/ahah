import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Magazine Luiza',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxoHtnPSh8KNTxyRHF4_QGDqa_nyZUeIajdC8ndQOiNAUiLS3b1HP-8UtMm-gyn39B6AA&usqp=CAU" />
      </head>
      <body>{children}</body>
    </html>
  )
}
