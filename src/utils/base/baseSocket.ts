import { io, Socket } from 'socket.io-client'

import { logger } from '../logger'

// socket Connection
class SocketBase {
    private socket: Socket

    constructor(url: string) {
        this.socket = io(url)
    }

    public initialize(): this {
        this.socket.on('connect', () => {
            logger('Socket connection established')
        })

        this.socket.on('disconnect', () => {
            logger('Socket connection closed')
        })

        this.socket.on('connect_error', (error) => {
            logger('Socket connection error:', error)
        })

        return this
    }

    public on(event: string, callback: (data: any) => void) {
        this.socket.on(event, callback)
    }

    public off(event: string, callback?: (data: any) => void) {
        this.socket.off(event, callback)
    }

    public emit(event: string, data: any) {
        this.socket.emit(event, data)
    }

    public disconnect() {
        this.socket.disconnect()
    }

    public isConnected(): boolean {
        return this.socket.connected
    }
}

export default SocketBase
