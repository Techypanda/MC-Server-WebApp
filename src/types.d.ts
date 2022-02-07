interface ServerStatusResponse {
    ip: string
    icon: string
    hostname: string
    debug: any
    motd: {
        raw: string[]
        html: string[]
        clean: string[]
    }
    online: boolean
    players: {
        online: number
        max: number
    }
    port: number
    protocol: number
    version: string
}