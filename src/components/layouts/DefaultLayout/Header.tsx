import React from 'react'

import { NextPage } from 'next'

import { ImageLoader } from '@/components/ui/ImageLoader'
import { resourceService } from '@/services/implements'
import { env } from '@/utils/env'

interface IHeader {}

export const Header: NextPage<IHeader> = async () => {
    const data = await resourceService.getResource({
        id: env.NEXT_PUBLIC_RESOURCE_ID,
    })

    return (
        <div className="relative">
            <nav className={'z-50 w-full bg-transparent'}>
                <div className="container mx-auto flex h-[120px] w-full flex-col items-center justify-center">
                    <div className="relative h-full w-[400px]">
                        <ImageLoader
                            src={data.logo}
                            alt="userinfo"
                            style={{ objectFit: 'contain' }}
                            fill
                        />
                    </div>
                    <div className="w-full border-b border-yellow-500" />
                </div>
            </nav>
        </div>
    )
}
