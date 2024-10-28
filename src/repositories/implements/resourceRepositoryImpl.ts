import GET_RESOURCE from '@/graphql/queries/resource'
import { IResourceRequest, IResourceResponse } from '@/types/resource'
import { BaseApolloServer } from '@/utils/base/baseApollo'

import { IResourceRepository } from '../hygraphRepository'

export class ResourceRepositoryImpl
    extends BaseApolloServer
    implements IResourceRepository
{
    async getResource(req: IResourceRequest): Promise<IResourceResponse> {
        const { data, error } = await this.client.query<IResourceResponse>({
            query: GET_RESOURCE,
            variables: { id: req.id },
            context: {
                fetchOptions: {
                    next: { revalidate: 60 },
                },
            },
            fetchPolicy: 'network-only',
        })

        if (error) {
            throw error
        }

        return data
    }
}
