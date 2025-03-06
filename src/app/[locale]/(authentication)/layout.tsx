import '@/styles/globals.css'
import '@/configs/fontawesome.config'

import React from 'react'

import DefaultLayout from '@/components/layouts/DefaultLayout/DefaultLayout'
export default async function RootLayout(
    props: {
        children: React.ReactNode
        params: Promise<{ locale: string }>
    }
) {
    const params = await props.params;

    const {
        locale
    } = params;

    const {
        children
    } = props;

    return (
        <html lang={locale}>
            <body>
                <DefaultLayout>{children}</DefaultLayout>
            </body>
        </html>
    )
}
