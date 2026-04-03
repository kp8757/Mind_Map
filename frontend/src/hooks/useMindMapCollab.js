import { useEffect, useRef } from 'react';
import { createSocket } from '../services/socket.js';

export function useMindMapCollab({ mapId, userId, onRemoteChange }) {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!mapId || !userId) return;

    socketRef.current = createSocket();
    socketRef.current.emit('mindmap:join', { mapId, userId });
    socketRef.current.on('mindmap:change', onRemoteChange);

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [mapId, userId, onRemoteChange]);

  const broadcastChange = (payload) => {
    socketRef.current?.emit('mindmap:change', { mapId, payload });
  };

  return { broadcastChange };
}
