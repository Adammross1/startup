export function connectToWebSocket(onMessage, onStatusChange) {
  void onMessage;
  const port = window.location.port;
  const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
  const host = window.location.hostname;
  const hostWithPort = port ? `${host}:${port}` : host;
  const socket = new WebSocket(`${protocol}://${hostWithPort}/ws`);

  socket.onopen = () => {
    onStatusChange('connected');
  };

  socket.onclose = () => {
    onStatusChange('disconnected');
  };

  socket.onmessage = async (msg) => {
    try {
      const raw = typeof msg.data === 'string' ? msg.data : await msg.data.text();
      const parsed = JSON.parse(raw);
      onMessage(parsed);
    } catch {
      // Ignore so one bad message does not break updates.
    }
  };

  function sendActivity(payload) {
    if (socket.readyState !== WebSocket.OPEN) {
      return;
    }

    socket.send(JSON.stringify(payload));
  }

  return {
    sendActivity,
    closeActivityFeedConnection: () => {
      socket.onopen = null;
      socket.onclose = null;
      socket.onmessage = null;
      socket.close();
    },
  };
}