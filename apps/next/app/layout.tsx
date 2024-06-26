'use client'
import { Metadata } from 'next'
import { NextTamaguiProvider } from './NextTamaguiProvider'
import { useEffect } from 'react'
//import * from ""

/* export const metadata: Metadata = {
  title: 'Diria Mobile App',
  description: 'Diria Hotel mobile Web App',
  icons: '/favicon.ico',
} */

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // You can use `suppressHydrationWarning` to avoid the warning about mismatched content during hydration in dev mode
    <html lang="en" suppressHydrationWarning>
      {/* <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      /> */}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />

      <meta name="HandheldFriendly" content="true" />

      <body className="touch-action: none;">
        <NextTamaguiProvider>{children}</NextTamaguiProvider>
      </body>
    </html>
  )
}
