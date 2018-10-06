// @flow

/* eslint-disable max-len */
/*
 implement how our server should react
 when clients connect and send messages to it:

 - When the client connects, we log it in the server console,
 and get access to the socket object,
 which we can use to communicate back with that client.

 - When a client sends IO_CLIENT_JOIN_ROOM, we make it join the room it wants. Once it has joined a room, we send 3 demo messages: 1 message to every user, 1 message to users in that room, 1 message to that client only.

 - When the client sends IO_CLIENT_HELLO, we log its message in the server console.

 - When the client disconnects, we log it as well.
 */
/* eslint-enable max-len */

import {
  IO_CONNECT,
  IO_DISCONNECT,
  IO_CLIENT_JOIN_ROOM,
  IO_CLIENT_HELLO,
  IO_SERVER_HELLO,
} from '../shared/config';

class UsersOnline {
  constructor() {
    this.users = [];
  }

  registerUser = (login: {wsId: string, userName: string}) => {
    this.users[login.userName] = login.wsId;
  };

  userWsId = (userName: string) => (this.users[userName]);
}

const usersOnline = new UsersOnline();

/* eslint-disable no-console */
const setUpSocket = (io: Object) => {
  io.on(IO_CONNECT, (socket) => {
    console.log(`[socket.io] Client ${socket.id} connected.`);
    console.log(socket.adapter.sids);
    console.log(socket.adapter.rooms);

    // Error reporting
    socket.on('error', (err) => {
      console.log('Socket.IO Error');
      console.log(err.stack);
    });

    socket.on(IO_CLIENT_JOIN_ROOM, (room) => {
      socket.join(room);
      console.log(`[socket.io] Client ${socket.id} joined room ${room}.`);

      io.emit(IO_SERVER_HELLO, 'Hello everyone!');
      io.to(room).emit(IO_SERVER_HELLO, `Hello clients of room ${room}!`);
      socket.emit(IO_SERVER_HELLO, `Hello you! ${socket.id}`);
    });

    socket.on(IO_CLIENT_HELLO, (clientMessage) => {
      console.log(`[socket.io] Client ${socket.id}: ${clientMessage}`);
    });

    socket.on('chat message', (msg) => {
      const chatMessage = {
        user: socket.id,
        message: msg,
      };
      io.emit('chat message', chatMessage);
    });

    socket.on('loggedIn', (userName) => {
      const online = {
        wsId: socket.id,
        userName: userName.userName,
      };
      console.log(online);
      usersOnline.registerUser(online);
      io.emit('isOnline', online);
    });

    socket.on('isOnline?', (userName: string) => {
      const wsId = usersOnline.userWsId(userName);
      if (wsId) {
        io.emit('isOnline', { userName, wsId });
      }
    });

    socket.on('is typing', (msg) => {
      const chatMessage = {
        user: socket.id,
        status: msg.status,
        userName: msg.userName,
      };
      socket.broadcast.emit('is typing', chatMessage);
    });

    socket.on(IO_DISCONNECT, () => {
      console.log(`[socket.io] Client ${socket.id} disconnected.`);
    });
  });
};
/* eslint-enable no-console */

export default setUpSocket;
