'use client'
import React, { useEffect } from 'react'

import { NextPage } from 'next'
import dynamic from 'next/dynamic'

import Button from '@/components/ui/Button/Button'
import Container from '@/components/ui/Container/Container'
import Section from '@/components/ui/Container/Section'
import { ImageLoader } from '@/components/ui/ImageLoader'
import { useHomeClient } from '@/hooks/useHome'
import { IResourceData } from '@/types/resource'
import { env } from '@/utils/env'
import { logger } from '@/utils/logger'
import { getRGBColorNoPrefix } from '@/utils/parseColor'

const RenderHtmlModule = dynamic(() => import('@/components/ui/renderHtml'), {
    ssr: false,
})
interface Props {
    resource: IResourceData
}

const HomeModule: NextPage<Props> = ({ resource }) => {
    const { data, loading, error } = useHomeClient(env.NEXT_PUBLIC_RESOURCE_ID)

    if (loading) <div>Loading...</div>

    if (error) <div>Error</div>

    useEffect(() => {
        logger('data', JSON.stringify(data))
        if (
            !data?.resource.primaryColor.hex ||
            !data?.resource.secondaryColor.hex
        )
            return
        document.body.style.setProperty(
            '--tw-color-primary',
            getRGBColorNoPrefix(data?.resource.primaryColor.hex)
        )
        document.body.style.setProperty(
            '--tw-color-secondary',
            getRGBColorNoPrefix(data?.resource.secondaryColor.hex)
        )
    }, [data])

    return (
        <>
            <Container className="bg-[#320A57] pb-5">
                <Section className="py-5">
                    <h1 className="text-center text-xl text-secondary md:text-3xl">
                        {resource.mainTitle}
                    </h1>
                    <div className="border-b border-yellow-500 pt-5" />
                </Section>
                {/* Button Login, Register Mobile */}
                <Section className="grid-col-1 grid gap-2">
                    <a
                        href={'//' + resource.loginUrl}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Button className="h-10 w-full rounded-none border border-yellow-500 bg-gradient-to-t from-primary via-[#48088b]/50 to-[#a70ce7] text-black">
                            <span className="text-xl font-semibold">Login</span>
                        </Button>
                    </a>
                    <a
                        href={'//' + resource.registerUrl}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Button className="h-10 w-full rounded-none border border-yellow-500 bg-gradient-to-t from-primary via-[#48088b]/50 to-[#a70ce7] text-black">
                            <span className="text-xl font-semibold">
                                Signup
                            </span>
                        </Button>
                    </a>
                </Section>

                {/* Banner */}
                <Section className="relative hidden py-5 md:block">
                    <ImageLoader
                        src={resource.banner.imageUrl}
                        alt={resource.banner.imageAlt}
                        width={1924}
                        height={1024}
                        style={{ objectFit: 'contain' }}
                    />
                </Section>

                <Section className="relative block py-5 md:hidden">
                    <ImageLoader
                        src={resource.mobileBanner.imageUrl}
                        alt={resource.mobileBanner.imageAlt}
                        width={1924}
                        height={1024}
                        style={{ objectFit: 'cover' }}
                    />
                </Section>

                <Section>
                    <RenderHtmlModule
                        html={resource.mainContent.html}
                        className="text-white"
                    />
                </Section>
            </Container>
        </>
    )
}

export default HomeModule
