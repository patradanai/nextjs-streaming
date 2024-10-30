import { AuthRepositoryImplMock } from './__mock__/authRepositoryMock'
import { ExampleRepositoryImplMock } from './__mock__/exmapleRepositoryMock'
import { AuthRepository } from './authRepository'
import { ExampleRepository } from './exampleRepository'
import { AuthRepositoryImpl } from './implements/authRepositoryImpl'
import { ExampleRepositoryImpl } from './implements/exampleRepositoryImpl'
import { SocketRepositoryImpl } from './implements/socketRepositoryImpl'
import { SocketRepository } from './socketRepository'

/**
 * Repositories
 *
 * Support Mock Response for Development Mode or Stub Mode
 */

interface IReposities {
    exampleRepository: ExampleRepository
    authRepository: AuthRepository
    socketRepository: SocketRepository
}

class BaseRepostiory {
    exampleRepository: ExampleRepository
    authRepository: AuthRepository
    socketRepository: SocketRepository

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
        this.socketRepository = options.socketRepository

        const envonment = process.env.NODE_ENV ?? 'development'

        const overrideEnvronment = override[envonment]
        if (overrideEnvronment) {
            const overrideReposities = overrideEnvronment

            // 2. Declear Override Repositories
            this.exampleRepository = overrideReposities.exampleRepository
            this.authRepository = overrideReposities.authRepository
            this.socketRepository = overrideReposities.socketRepository
        }
    }
}

export const reposities = new BaseRepostiory(
    {
        exampleRepository: new ExampleRepositoryImpl(),
        authRepository: new AuthRepositoryImpl(),
        socketRepository: new SocketRepositoryImpl(),
    },
    {
        stub: {
            exampleRepository: new ExampleRepositoryImplMock(),
            authRepository: new AuthRepositoryImplMock(),
            socketRepository: new SocketRepositoryImpl(),
        },
        development: {
            exampleRepository: new ExampleRepositoryImplMock(),
            authRepository: new AuthRepositoryImplMock(),
            socketRepository: new SocketRepositoryImpl(),
        },
    }
)
