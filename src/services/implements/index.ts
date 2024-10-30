import { AuthServiceImpl } from './authServiceImpl'
import { SocketServiceImpl } from './socketServiceImpl'

export const authService = new AuthServiceImpl()
export const socketService = new SocketServiceImpl()
