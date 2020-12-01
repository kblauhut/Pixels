const CANVAS_X = 300;
const CANVAS_Y = 450;

const WebSocket = require('ws');
const db = require('better-sqlite3')('db.sqlite');

const wss = new WebSocket.Server({ port: 8989 });

const canvas = new Uint8Array(CANVAS_X * CANVAS_Y);

db.prepare('CREATE TABLE IF NOT EXISTS pixels (x INTEGER NOT NULL, y INTEGER NOT NULL, color INT, PRIMARY KEY(x,y))').run();
db.prepare('CREATE TABLE IF NOT EXISTS users (user_id TEXT NOT NULL PRIMARY KEY, pixels_remaining INTEGER)').run();
db.prepare('CREATE TABLE IF NOT EXISTS pixels_users (x INTEGER NOT NULL, y INTEGER NOT NULL, user_id TEXT NOT NULL, FOREIGN KEY (x,y) REFERENCES pixels(x,y), FOREIGN KEY (user_id) REFERENCES users(user_id))').run();

loadCanvasFromDB();

const broadcast = (data, ws) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN && client !== ws) {
      client.send(JSON.stringify(data));
    }
  });
};

wss.on('connection', (ws) => {
  ws.send(JSON.stringify({
    type: 'LOAD_CANVAS',
    message: { x: CANVAS_X, y: CANVAS_Y, canvas: Array.from(canvas) },
  }));
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    switch (data.type) {
      case 'SET_PIXEL':
        setPixel(data.payload.x, data.payload.y, data.payload.color);
        broadcast({
          type: 'SET_PIXEL',
          message: data.payload,
        }, ws);
        break;
      default:
        break;
    }
  });
});

function setPixel(x, y, color) {
  // Add auth check
  const stmt = db.prepare('REPLACE INTO pixels (x,y,color) VALUES (?,?,?)');
  stmt.run(x, y, color);

  const value = (CANVAS_Y * x) - CANVAS_Y + y - 1;
  canvas[value] = color;
}

function authenticateUser() {

}

function loadCanvasFromDB() {
  const rows = db.prepare('SELECT * FROM pixels').all();
  rows.forEach((row) => {
    const value = (CANVAS_Y * row.x) - CANVAS_Y + row.y - 1;
    canvas[value] = row.color;
  });
}

function fillDB() {
  const insert = db.prepare('REPLACE INTO pixels (x,y,color) VALUES (@x,@y,@color)');

  const values = [];
  for (let x = 1; x <= 350; x += 1) {
    for (let y = 1; y <= 450; y += 1) {
      values.push({ x, y, color: 11 });
    }
  }
  const transaction = db.transaction((values) => {
    for (const value of values) {
      insert.run(value);
    }
  });
  transaction(values);
}
