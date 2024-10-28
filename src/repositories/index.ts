import { AuthRepositoryImplMock } from './__mock__/authRepositoryMock'
import { ExampleRepositoryImplMock } from './__mock__/exmapleRepositoryMock'
import { ResourceRepositoryImplMock } from './__mock__/hygraphRepositoryMock'
import { IAuthRepository } from './authRepository'
import { ExampleRepository } from './exampleRepository'
import { IResourceRepository } from './hygraphRepository'
import { AuthRepositoryImpl } from './implements/authRepositoryImpl'
import { ExampleRepositoryImpl } from './implements/exampleRepositoryImpl'
import { ResourceRepositoryImpl } from './implements/resourceRepositoryImpl'

/**
 * Repositories
 *
 * Support Mock Response for Development Mode or Stub Mode
 */

interface IReposities {
    exampleRepository: ExampleRepository
    authRepository: IAuthRepository
    resourceRepository: IResourceRepository
}

class BaseRepostiory {
    exampleRepository: ExampleRepository
    authRepository: IAuthRepository
    resourceRepository: IResourceRepository

    constructor(
        options: IReposities,
        // Override can have enironment specific override
        override: {
            [key: string]: IReposities
        }
    ) {
        // 1. Declear Repositories
        this.exampleRepository = options.exampleRepository
        this.authRepository = options.authRepository
        this.resourceRepository = options.resourceRepository

        const envonment = process.env.NODE_ENV ?? 'development'

        const overrideEnvronment = override[envonment]
        if (overrideEnvronment) {
            const overrideReposities = overrideEnvronment

            // 2. Declear Override Repositories
            this.exampleRepository = overrideReposities.exampleRepository
            this.authRepository = overrideReposities.authRepository
            this.resourceRepository = overrideReposities.resourceRepository
        }
    }
}

export const reposities = new BaseRepostiory(
    {
        exampleRepository: new ExampleRepositoryImpl(),
        authRepository: new AuthRepositoryImpl(),
        resourceRepository: new ResourceRepositoryImpl(),
    },
    {
        stub: {
            exampleRepository: new ExampleRepositoryImplMock(),
            authRepository: new AuthRepositoryImplMock(),
            resourceRepository: new ResourceRepositoryImplMock(),
        },
        development: {
            exampleRepository: new ExampleRepositoryImplMock(),
            authRepository: new AuthRepositoryImplMock(),
            resourceRepository: new ResourceRepositoryImplMock(),
        },
    }
)
