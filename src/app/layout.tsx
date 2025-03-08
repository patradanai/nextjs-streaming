import '@/styles/globals.css'
import '@/configs/fontawesome.config'

import React from 'react'

import type { Viewport } from 'next'
import ErrorModal from '@/components/ErrorModal'

export const viewport: Viewport = {
    initialScale: 1,
    width: 'device-width',
    maximumScale: 3,
    minimumScale: 1,
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>
            <ErrorModal />
        </html>
    )
}
