import '@/styles/globals.css'
import '@/configs/fontawesome.config'

import React from 'react'

import type { Metadata } from 'next'

import DefaultLayout from '@/components/layouts/DefaultLayout/DefaultLayout'
import { resourceService } from '@/services/implements'
import { env } from '@/utils/env'
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

export async function generateMetadata(): Promise<Metadata> {
    const data = await resourceService.getResource({
        id: env.NEXT_PUBLIC_RESOURCE_ID,
    })

    const { metaDescription, favicon } = data

    return {
        icons: {
            icon: favicon,
            shortcut: favicon,
            apple: favicon,
        },
        robots: {
            index: metaDescription.isIndex,
            follow: metaDescription.isFollow,
            nocache: true,
            googleBot: {
                index: metaDescription.isIndex,
                follow: metaDescription.isFollow,
                noimageindex: false,
            },
        },
        title: metaDescription.metaTitle,
        description: metaDescription.metaDescription,
        keywords: metaDescription.keywords,
        openGraph: {
            title: metaDescription.metaTitle,
            description: metaDescription.metaDescription,
            images: [metaDescription.ogImage.imageUrl],
        },
        twitter: {
            title: metaDescription.metaTitle,
            description: metaDescription.metaDescription,
            images: [metaDescription.ogImage.imageUrl],
        },
        alternates: {
            canonical: metaDescription.canonical,
        },
    }
}
