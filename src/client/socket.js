// @flow

import socketIOClient from 'socket.io-client';

import {
  IO_CONNECT,
  IO_DISCONNECT,
  IO_CLIENT_HELLO,
  IO_CLIENT_JOIN_ROOM,
  IO_SERVER_HELLO,
} from '../shared/config';
import actionCreators from '../shared/action/index';

const host = typeof window === 'undefined' ? 'http://localhost:8000' : window.location.host;
const socket = socketIOClient(host);

/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
const setUpSocket = (store: Object) => {
  // Error reporting
  socket.on('error', (err) => {
    console.log('Socket.IO Error');
    console.log(err.stack);
  });

  socket.on(IO_CONNECT, () => {
    // console.log('[socket.io] Connected.');
    socket.emit(IO_CLIENT_JOIN_ROOM, 'hello-1234');
    // reconnections - dispatch an action
    socket.emit(IO_CLIENT_HELLO, `Hello! from ${socket.id}`);
    store.dispatch(actionCreators.app.chat.user({
      id: socket.id,
    }));

    console.log(socket);
  });

  socket.on(IO_SERVER_HELLO, (serverMessage) => {
    console.log(`[socket.io] Server: ${serverMessage}`);
  });

  socket.on(IO_DISCONNECT, () => {
    console.log('[socket.io] Disconnected.');
  });

  socket.on('chat message', (serverMessage) => {
    store.dispatch(actionCreators.app.chat.addMessage({
      message: serverMessage.message,
      user: serverMessage.user,
    }));
  });

  socket.on('is typing', (serverMessage) => {
    store.dispatch(actionCreators.app.chat.interlocutorTyping({
      status: serverMessage.status,
      user: serverMessage.user,
      userName: serverMessage.userName,
    }));
  });

  socket.on('isOnline', (user: { userName: string, wsId: string }) => {
    store.dispatch(actionCreators.app.users.online(user));
  });
};
/* eslint-enable no-console */

export default setUpSocket;
export { socket };
