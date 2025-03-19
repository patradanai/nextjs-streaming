import { AuthRepositoryImplMock } from './__mock__/authRepositoryMock'
import { ExampleRepositoryImplMock } from './__mock__/exmapleRepositoryMock'
import { ResourceRepositoryImplMock } from './__mock__/resourceRepositoryMock'
import { AuthRepository } from './authRepository'
import { ExampleRepository } from './exampleRepository'
import { AuthRepositoryImpl } from './implements/authRepositoryImpl'
import { ExampleRepositoryImpl } from './implements/exampleRepositoryImpl'
import { ResourceRepositoryImpl } from './implements/resourceRepositoryImpl'
import { ResourceRepository } from './resourceRepository'

/**
 * Repositories
 *
 * Support Mock Response for Development Mode or Stub Mode
 */

// TODO: Need to initial SOcket when call

interface IReposities {
    exampleRepository: ExampleRepository
    authRepository: AuthRepository
    resourcesRepository: ResourceRepository
}

class BaseRepostiory {
    exampleRepository: ExampleRepository
    authRepository: AuthRepository
    resourcesRepository: ResourceRepository

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
        this.resourcesRepository = options.resourcesRepository

        const envonment = process.env.APP_ENV ?? 'development'

        const overrideEnvronment = override[envonment]
        if (overrideEnvronment) {
            const overrideReposities = overrideEnvronment

            // 2. Declear Override Repositories
            this.exampleRepository = overrideReposities.exampleRepository
            this.authRepository = overrideReposities.authRepository
            this.resourcesRepository = overrideReposities.resourcesRepository
        }
    }
}

export const reposities = new BaseRepostiory(
    {
        exampleRepository: new ExampleRepositoryImpl(),
        authRepository: new AuthRepositoryImpl(),
        resourcesRepository: new ResourceRepositoryImpl(),
    },
    {
        stub: {
            exampleRepository: new ExampleRepositoryImplMock(),
            authRepository: new AuthRepositoryImplMock(),
            resourcesRepository: new ResourceRepositoryImplMock(),
        },
        development: {
            exampleRepository: new ExampleRepositoryImplMock(),
            authRepository: new AuthRepositoryImplMock(),
            resourcesRepository: new ResourceRepositoryImplMock(),
        },
    }
)
