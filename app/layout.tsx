import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FlowToForce - Personal Training Program',
  description: 'FlowToForce: Your personalized fitness journey with structured training programs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
