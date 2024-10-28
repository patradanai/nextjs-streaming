import { ApolloError } from '@apollo/client'

import { HttpApolloException } from '@/exceptions/exceptionApollo'
import { reposities } from '@/repositories'
import { IResourceData, IResourceRequest } from '@/types/resource'
import { BaseApolloServer } from '@/utils/base/baseApollo'
import { logger } from '@/utils/logger'

import { IResourceService } from '../hygraphService'

export class ResourceServiceImpl
    extends BaseApolloServer
    implements IResourceService
{
    async getResource(req: IResourceRequest): Promise<IResourceData> {
        try {
            const { resource } =
                await reposities.resourceRepository.getResource(req)

            const {
                favicon,
                logo,
                primaryColor,
                secondaryColor,
                metaDescription,
                socialFacebook,
                socialLine,
                socialTwitter,
                socialYoutube,
                loginUrl,
                registerUrl,
                createdAt,
                mainContent,
                mobileBanner,
                publishedAt,
                banner,
                mainTitle,
            } = resource

            return {
                favicon: favicon.url,
                logo: logo.url,
                primaryColor: primaryColor,
                secondaryColor: secondaryColor,
                socialFacebook: socialFacebook,
                socialLine: socialLine,
                socialTwitter: socialTwitter,
                socialYoutube: socialYoutube,
                loginUrl: loginUrl,
                registerUrl: registerUrl,
                metaDescription: {
                    isFollow: metaDescription?.isFollow,
                    isIndex: metaDescription?.isIndex,
                    keywords: metaDescription?.keywords,
                    metaDescription: metaDescription?.metaDescription,
                    metaTitle: metaDescription?.metaTitle,
                    ogImage: {
                        id: metaDescription?.ogImage?.id,
                        imageUrl: metaDescription?.ogImage?.url,
                        imageAlt: '',
                    },
                    ogType: metaDescription?.ogType,
                    canonical: metaDescription?.canonical,
                },
                createdAt: createdAt,
                mainTitle: mainTitle,
                mainContent: mainContent,
                banner: {
                    id: banner?.id,
                    imageUrl: banner?.url,
                    imageAlt: '',
                },
                mobileBanner: {
                    id: mobileBanner?.id,
                    imageUrl: mobileBanner?.url,
                    imageAlt: '',
                },
                publishedAt: publishedAt,
            }
        } catch (error) {
            if (error instanceof ApolloError) {
                logger(error?.networkError?.message, 'Error Fetching Resource')
                throw new HttpApolloException(error)
            }

            throw error
        }
    }
}
