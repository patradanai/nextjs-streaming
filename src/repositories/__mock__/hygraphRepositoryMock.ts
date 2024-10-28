import { IResourceRequest, IResourceResponse } from '@/types/resource'

import { IResourceRepository } from '../hygraphRepository'

export class ResourceRepositoryImplMock implements IResourceRepository {
    getResource(_req: IResourceRequest): Promise<IResourceResponse> {
        throw new Error('Method not implemented.')
    }
}
