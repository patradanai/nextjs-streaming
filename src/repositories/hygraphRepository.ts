import { IResourceRequest, IResourceResponse } from '@/types/resource'

export abstract class IResourceRepository {
    abstract getResource(req: IResourceRequest): Promise<IResourceResponse>
}
