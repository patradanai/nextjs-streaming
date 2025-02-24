import React, { use } from 'react';

import { NextIntlClientProvider, useMessages } from 'next-intl'

import { ApolloWrapper } from '@/components/ApolloWrapper'
import { SnackBarProvider } from '@/components/providers/snackbarContext'

export default function RootLayout(
    props: {
        children: React.ReactNode
        params: Promise<{ locale: string }>
    }
) {
    const params = use(props.params);

    const {
        locale
    } = params;

    const {
        children
    } = props;

    const messages = useMessages()
    return (
        <html lang={locale}>
            <body>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <ApolloWrapper>
                        <SnackBarProvider>{children}</SnackBarProvider>
                    </ApolloWrapper>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
