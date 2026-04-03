import { createServer } from 'node:http';
import { Server } from 'socket.io';
import app from './app.js';
import { connectDb } from './config/db.js';
import { registerCollaborationSocket } from './sockets/collabSocket.js';

const port = process.env.PORT || 5000;

await connectDb(process.env.MONGODB_URI);

const server = createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_ORIGIN }
});

registerCollaborationSocket(io);

server.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
