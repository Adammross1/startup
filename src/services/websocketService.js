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

  return {
    closeActivityFeedConnection: () => {
      socket.onopen = null;
      socket.onclose = null;
      socket.close();
    },
  };
}