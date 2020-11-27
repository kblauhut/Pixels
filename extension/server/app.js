const { Statement } = require('sqlite3');
const WebSocket = require('ws')
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('db.sqlite');
const wss = new WebSocket.Server({ port: 8989 })

db.serialize(function () {
    db.run("CREATE TABLE IF NOT EXISTS pixels (pixel_id TEXT PRIMARY KEY, x INTEGER, y INTEGER, color TEXT, placed_date TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS users (user_id TEXT PRIMARY KEY, pixels_remaining INTEGER)");
});

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
            case 'SET_PIXEL':
                setPixel(data.payload.x + "x" + data.payload.y, data.payload.x, data.payload.y, data.payload.color)
                broadcast({
                    type: 'SET_PIXEL',
                    message: data.payload,
                }, ws)
                break
            default:
                break
        }
    })
    sendAllPixels(ws)
})
async function sendAllPixels(ws) {
    let message = await getAllPixels();
    ws.send(
        JSON.stringify({
            type: 'PIXEL_DOWNLOAD',
            message: message,
        })
    )
}


function getAllPixels() {
    return new Promise((resolve, reject) => {
        returnValue = [];
        db.each("SELECT pixel_id, x, y, color FROM pixels", function (err, row) {
            returnValue.push({ x: row.x, y: row.y, color: row.color })
        }, () => {
            resolve(returnValue);
        })
    })
}

function setPixel(pixel_id, x, y, color) {
    //Add auth check
    db.run("REPLACE INTO pixels (pixel_id,x,y,color) VALUES ('" + pixel_id + "'," + x + "," + y + ",'" + color + "')");
}

function authenticateUser() {

}