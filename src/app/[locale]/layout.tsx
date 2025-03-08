import React, { use } from 'react'

import { NextIntlClientProvider, useMessages } from 'next-intl'

import { SnackBarProvider } from '@/components/providers/snackbarProvider'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import { getMessages } from 'next-intl/server'
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

export default async function RootLayout(props: {
    children: React.ReactNode
    params: Promise<{ locale: string }>
}) {
    const { locale } = await props.params
    if (!routing.locales.includes(locale as any)) {
        notFound()
    }

    const { children } = props

    const messages = await getMessages()
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${sarabun.variable} ${kanit.variable}`}>
                <NextIntlClientProvider messages={messages}>
                    <SnackBarProvider>{children}</SnackBarProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
NextIntlClientProvider
