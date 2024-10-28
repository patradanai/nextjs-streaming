import { logger } from '../logger'

// Websocket Connection
class WebSocketBase {
    url: string
    connection: WebSocket | null
    constructor(url: string) {
        this.url = url
        this.connection = null
    }

    connect() {
        this.connection = new WebSocket(this.url)

        this.connection.onopen = () => {
            logger(`Connected to ${this.url}`)
        }

        this.connection.onclose = () => {
            logger(`Disconnected from ${this.url}`)
        }

        this.connection.onerror = (error) => {
            console.error(`WebSocket error: ${error}`)
        }

        this.connection.onmessage = (message) => {
            logger(`Received message: ${message.data}`)
            this.onMessage(message.data)
        }
    }

    disconnect() {
        if (this.connection) {
            this.connection.close()
        }
    }

    sendMessage(message) {
        if (this.connection && this.connection.readyState === WebSocket.OPEN) {
            this.connection.send(message)
            logger(`Sent message: ${message}`)
        }
    }

    onMessage(message) {
        // Override this method in subclasses to handle incoming messages
        logger(`Message received: ${message}`)
    }
}

export default WebSocketBase
