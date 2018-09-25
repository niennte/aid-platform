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

const socket = socketIOClient('http://localhost:8000');

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
    socket.emit(IO_CLIENT_HELLO, `Hello! from ${socket.id}`);
    store.dispatch(actionCreators.app.chat.user({
      id: socket.id,
    }));
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
};
/* eslint-enable no-console */

export default setUpSocket;
export { socket };
