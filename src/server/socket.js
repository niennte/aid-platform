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
  IO_SERVER_HELLO,
} from '../shared/config';
import { sub } from '../shared/config-redis';

class UsersOnline {
  constructor() {
    this.users = [];
    this.visitors = [];
  }

  registerVisitor = (wsId: string) => {
    this.visitors.push(wsId);
  };

  registerUser = (login: { wsId: string, userName: string }) => {
    this.users[login.userName] = login.wsId;
  };

  userWsId = (userName: string) => (this.users[userName]);

  userName = (wsId: string) => {
    let userNameForWsId = null;
    Object.entries(this.users).forEach(([userName, userWsId]) => {
      if (userWsId === wsId) {
        userNameForWsId = userName;
      }
    });
    return userNameForWsId;
  };

  deregisterWsId = (wsId: string) => {
    Object.entries(this.users).forEach(([userName, userWsId]) => {
      if (userWsId === wsId) {
        delete this.users[userName];
      }
    });
  };

  deregisterUserName = (userName: string) => {
    delete this.users[userName];
  };

  deregisterVisitor = (wsId: string) => {
    this.visitors = this.visitors.filter(registeredWsId => (registeredWsId !== wsId));
  };

  numUsers = () => (Object.keys(this.users).length);

  numVisitors = () => (this.visitors.length);
}

const usersOnline = new UsersOnline();

/* eslint-disable no-console */
const setUpSocket = (io: Object) => {
  io.on(IO_CONNECT, (socket) => {
    // console.log(`[socket.io] Client ${socket.id} connected.`);
    console.log(Object.keys(socket.adapter.sids).length);
    console.log(Object.keys(socket.adapter.rooms).length);

    // prevent messages sent multiple time when reconnecting
    socket.removeAllListeners();

    // Error reporting
    socket.on('error', (err) => {
      console.log('Socket.IO Error');
      console.log(err.stack);
    });

    usersOnline.registerVisitor(socket.id);

    io.emit('user stats', {
      usersOnline: usersOnline.numUsers(),
      visitorsOnline: usersOnline.numVisitors(),
    });

    socket.on(IO_CLIENT_JOIN_ROOM, (room) => {
      socket.join(room);
      console.log(`[socket.io] Client ${socket.id} joined room ${room}.`);

      io.emit(IO_SERVER_HELLO, 'Hello everyone!');
      io.to(room).emit(IO_SERVER_HELLO, `Hello clients of room ${room}!`);
      socket.emit(IO_SERVER_HELLO, `Hello you! ${socket.id}`);
    });

    // Private chat - invite
    socket.on('chat-invite', (content) => {
      io.to(content.invitedUserName).emit('chat-invitation', {
        invitingUser: content.invitingUserName,
        joinRoom: content.chatRoom,
      });
    });

    // Private chat - message
    socket.on('chat message', (content) => {
      const chatMessage = {
        wsId: socket.id,
        message: content.message,
        userName: content.userName,
        room: content.room,
      };
      io.to(content.room).emit('chat message', chatMessage);
    });

    // Online presence
    socket.on('loggedIn', (userName) => {
      const online = {
        wsId: socket.id,
        userName: userName.userName,
      };
      console.log(online);
      usersOnline.registerUser(online);
      io.emit('isOnline', online);
      io.emit('user stats', {
        usersOnline: usersOnline.numUsers(),
        visitorsOnline: usersOnline.numVisitors(),
      });
    });

    socket.on('is typing', (content) => {
      const statusUpdate = {
        user: socket.id,
        status: content.status,
        userName: content.userName,
        room: content.room,
      };
      io.to(content.room).emit('typing status', statusUpdate);
    });

    socket.on('loggedOut', (userName) => {
      console.log('listening to loggedOut %s', userName);
      usersOnline.deregisterUserName(userName);
      io.emit('deregistered', userName);
      io.emit('user stats', {
        usersOnline: usersOnline.numUsers(),
        visitorsOnline: usersOnline.numVisitors(),
      });
    });

    socket.on('isOnline?', (userName: string) => {
      const wsId = usersOnline.userWsId(userName);
      if (wsId) {
        io.emit('isOnline', { userName, wsId });
      }
    });

    socket.on(IO_DISCONNECT, () => {
      console.log(`[socket.io] Client ${socket.id} disconnected.`);
      console.log('calling deregister on %s', socket.id);
      const userName = usersOnline.userName(socket.id);
      if (userName) {
        usersOnline.deregisterWsId(socket.id);
        console.log('publishing username %s', userName);
        io.emit('deregistered', userName);
      }
      usersOnline.deregisterVisitor(socket.id);

      io.emit('user stats', {
        usersOnline: usersOnline.numUsers(),
        visitorsOnline: usersOnline.numVisitors(),
      });
    });
  });

  // redis notifications
  sub.on('pmessage', (ch, keyspace, action) => {
    console.log('pmessage');
    console.log(`sub channel ${ch}: ${keyspace} ${action}`);
    io.emit('active request count changed', { ch, keyspace, action });
  });
};
/* eslint-enable no-console */

export default setUpSocket;
