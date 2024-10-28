'use client'
import '@/styles/globals.css'
import '@/configs/fontawesome.config'

import React from 'react'

import type { Viewport } from 'next'
import { Sarabun, Kanit } from 'next/font/google'

const sarabun = Sarabun({
    subsets: ['thai'],
    variable: '--font-sarabun',
    display: 'swap',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
})

const kanit = Kanit({
    subsets: ['thai'],
    variable: '--font-kanit',
    display: 'swap',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
})

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
            <body className={`${sarabun.variable} ${kanit.variable}`}>
                {children}
            </body>
        </html>
    )
}
