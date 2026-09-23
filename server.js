const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

io.on('connection', (socket) => {
  console.log('یاریزان پەیوەندی کرد:', socket.id);

  socket.on('join_room', (room) => {
    socket.join(room);
    console.log(`یاریزان چووە ژوورەی: ${room}`);
  });

  socket.on('make_move', (data) => {
    socket.to(data.room).inbound('move_made', data);
  });

  socket.on('disconnect', () => {
    console.log('یاریزان دەرچووە:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`سێرڤەر کار دەکات لەسەر هێڵی: ${PORT}`);
});
