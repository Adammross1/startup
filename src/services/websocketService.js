export function connectToWebSocket(onMessage, onStatusChange) {
  void onMessage;

  const INITIAL_RETRY_DELAY_MS = 1000;
  const MAX_RETRY_DELAY_MS = 30000;
  const port = window.location.port;
  const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
  const host = window.location.hostname;
  const hostWithPort = port ? `${host}:${port}` : host;
  const socketUrl = `${protocol}://${hostWithPort}/ws`;

  let socket = null;
  let retryDelayMs = INITIAL_RETRY_DELAY_MS;
  let reconnectTimeoutId = null;
  let isManuallyClosed = false;

  function clearReconnectTimeout() {
    if (reconnectTimeoutId !== null) {
      clearTimeout(reconnectTimeoutId);
      reconnectTimeoutId = null;
    }
  }

  function scheduleReconnect() {
    if (isManuallyClosed || reconnectTimeoutId !== null) {
      return;
    }

    onStatusChange('disconnected');
    reconnectTimeoutId = setTimeout(() => {
      reconnectTimeoutId = null;
      connect();
      retryDelayMs = Math.min(retryDelayMs * 2, MAX_RETRY_DELAY_MS);
    }, retryDelayMs);
  }

  function connect() {
    socket = new WebSocket(socketUrl);

    socket.onopen = () => {
      retryDelayMs = INITIAL_RETRY_DELAY_MS;
      onStatusChange('connected');
    };

    socket.onclose = () => {
      if (isManuallyClosed) {
        return;
      }

      scheduleReconnect();
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
  }

  connect();

  function sendActivity(payload) {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      return;
    }

    socket.send(JSON.stringify(payload));
  }

  return {
    sendActivity,
    closeActivityFeedConnection: () => {
      isManuallyClosed = true;
      clearReconnectTimeout();

      if (!socket) {
        return;
      }

      socket.onopen = null;
      socket.onclose = null;
      socket.onmessage = null;
      socket.close();
    },
  };
}