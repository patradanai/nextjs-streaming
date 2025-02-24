import React from 'react'

import { NextPage } from 'next'
import { headers } from 'next/headers'
import { WithContext, WebPage } from 'schema-dts'

import HomeModule from '@/modules/Home/Home'
import { resourceService } from '@/services/implements'
import { env } from '@/utils/env'
import { logger } from '@/utils/logger'
import { StructureData } from '@/utils/structureData'

const HomePage: NextPage = async () => {
    const headersList = await headers()
    const data = await resourceService.getResource({
        id: env.NEXT_PUBLIC_RESOURCE_ID,
    })

    logger(headersList.get('user-agent'), 'user-agent')

    const jsonLd: WithContext<WebPage> = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: data.metaDescription.metaTitle,
        image: data.metaDescription.ogImage.imageUrl,
        description: data.metaDescription.metaDescription,
    }

    return (
        <>
            <StructureData data={jsonLd} />
            <HomeModule resource={data} />
        </>
    )
}

export default HomePage
