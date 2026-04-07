const { WebSocketServer } = require('ws');

let wss;

const initWebSocket = (server) => {
  wss = new WebSocketServer({ server });

  wss.on('connection', (ws) => {
    console.log('New WebSocket connection');

    ws.on('close', () => {
      console.log('WebSocket connection closed');
    });
  });
};

const broadcast = (data) => {
  if (!wss) return;
  const message = JSON.stringify(data);
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(message);
    }
  });
};

module.exports = { initWebSocket, broadcast };