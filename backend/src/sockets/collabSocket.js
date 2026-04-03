import { MindMap } from '../models/MindMap.js';

export function registerCollaborationSocket(io) {
  io.on('connection', (socket) => {
    socket.on('mindmap:join', ({ mapId, userId }) => {
      socket.join(mapId);
      socket.to(mapId).emit('presence:update', { userId, status: 'online' });
    });

    socket.on('mindmap:change', async ({ mapId, payload }) => {
      socket.to(mapId).emit('mindmap:change', payload);
      if (payload?.nodes && payload?.edges) {
        await MindMap.findByIdAndUpdate(mapId, {
          nodes: payload.nodes,
          edges: payload.edges,
          updatedAt: Date.now()
        });
      }
    });

    socket.on('disconnecting', () => {
      socket.rooms.forEach((room) => {
        socket.to(room).emit('presence:update', { status: 'offline' });
      });
    });
  });
}
