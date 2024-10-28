import { IResourceRequest, IResourceData } from '@/types/resource'

export abstract class IResourceService {
    abstract getResource(req: IResourceRequest): Promise<IResourceData>
}
