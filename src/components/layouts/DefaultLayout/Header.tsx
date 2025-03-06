import React from 'react'

import { NextPage } from 'next'

import { ImageLoader } from '@/components/ui/ImageLoader'
import { env } from '@/utils/env'

interface IHeader {}

export const Header: NextPage<IHeader> = async () => {
    return (
        <div className="relative">
            <nav className={'z-50 w-full bg-transparent'}>
                <div className="container mx-auto flex h-[120px] w-full flex-col items-center justify-center">
                    <div className="relative h-full w-[400px]">
                        <ImageLoader
                            src={"/images/logo.avif"}
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
