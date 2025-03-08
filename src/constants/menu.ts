import { faPiedPiper, faSlideshare } from '@fortawesome/free-brands-svg-icons'
import {
    faBox,
    faCaravan,
    faCartPlus,
    faHandshake,
    faScroll,
    faUserFriends,
} from '@fortawesome/free-solid-svg-icons'

export const menu = [
    {
        groupName: 'MAIN',
        groupRoutes: [
            {
                name: 'DigitalOcean Management',
                roles: [],
                permissions: [],
                route: '/suppliers',
                icon: faCaravan,
                sub_menu: [
                    {
                        name: '',
                        roles: [],
                        permissions: [],
                        route: '',
                    },
                ],
            },
        ],
    },
]
