const { WebSocketServer } = require('ws');
const { v4: uuidv4 } = require('uuid');

function peerProxy(httpServer) {
  const wss = new WebSocketServer({ noServer: true });
  const clients = new Set();

  httpServer.on('upgrade', (req, socket, head) => {
    const pathname = new URL(req.url, `http://${req.headers.host}`).pathname;
    if (pathname === '/ws') {
      wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit('connection', ws, req);
      });
    } else {
      socket.destroy();
    }
  });

  wss.on('connection', (ws) => {
    console.log('WebSocket client connected');
    clients.add(ws);

    ws.on('message', (rawMessage) => {
      try {
        const payload = JSON.parse(rawMessage.toString());
        if (!payload || typeof payload !== 'object') {
          return;
        }

        const messageForPeers = {
          id: uuidv4(),
          user: payload.user,
          action: payload.action,
          task: payload.task,
          timestamp: 'just now',
        };

        const serialized = JSON.stringify(messageForPeers);
        clients.forEach((client) => {
          if (client !== ws && client.readyState === 1) {
            client.send(serialized);
          }
        });
      } catch {
        // Ignore so one bad message doesn't break the connection.
      }
    });

    ws.on('close', () => {
      console.log('WebSocket client disconnected');
      clients.delete(ws);
    });

    ws.on('error', (err) => {
      console.error('WebSocket error:', err);
      clients.delete(ws);
    });
  });

  return wss;
}

module.exports = { peerProxy };
