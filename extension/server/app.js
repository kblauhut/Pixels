const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8989 })

const broadcast = (data, ws) => {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN && client !== ws) {
            client.send(JSON.stringify(data))
        }
    })
}

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const data = JSON.parse(message)
        switch (data.type) {
            case 'ADD_PIXEL':
                broadcast({
                    type: 'ADD_PIXEL',
                    message: data,
                }, ws)
                break
            default:
                break
        }
    })

})