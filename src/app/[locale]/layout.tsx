import React, { use } from 'react'

import { NextIntlClientProvider, useMessages } from 'next-intl'

import { SnackBarProvider } from '@/components/providers/snackbarProvider'

export default function RootLayout(props: {
    children: React.ReactNode
    params: Promise<{ locale: string }>
}) {
    const params = use(props.params)

    const { locale } = params

    const { children } = props

    const messages = useMessages()
    return (
        <html lang={locale}>
            <body>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <SnackBarProvider>{children}</SnackBarProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
