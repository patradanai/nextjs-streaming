import createMiddleware from 'next-intl/middleware'



import { MiddlewareFactory } from './stackMiddleware'
import { routing } from '@/i18n/routing'

export const i18nMiddleware: MiddlewareFactory = () => {
    const i18nMiddleware = createMiddleware(routing)

    return i18nMiddleware
}
