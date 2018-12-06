// @flow

import socketIOClient from 'socket.io-client';

import {
  IO_CONNECT,
  IO_DISCONNECT,
  IO_CLIENT_JOIN_ROOM,
  IO_SERVER_HELLO,
} from '../shared/config';
import actionCreators, {
  fetchRequestCount,
  fetchRequests,
  fetchFulfilledRequestCount,
  fetchMemberCount,
} from '../shared/action/index';
import fetchInbox from '../shared/action/fetch-inbox';

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
    store.dispatch(actionCreators.app.chat.user({
      wsId: socket.id,
    }));
    // reconnections:
    if (store.getState().user.userName) {
      socket.emit('loggedIn', { userName: store.getState().user.userName });
      socket.emit(IO_CLIENT_JOIN_ROOM, store.getState().user.userName);
    }
  });

  socket.on(IO_SERVER_HELLO, (serverMessage) => {
    console.log(`[socket.io] Server: ${serverMessage}`);
  });

  socket.on(IO_DISCONNECT, () => {
    console.log('[socket.io] Disconnected.');
  });

  socket.on('chat-invitation', (content) => {
    // join room
    socket.emit(IO_CLIENT_JOIN_ROOM, content.joinRoom);
    // initiate chat room in redux state (REMOVE FROM ACCEPT LOGIC)
    store.dispatch(actionCreators.app.chat.room.initiate({
      room: content.joinRoom,
      interlocutor: {
        userName: content.invitingUser,
      },
    }));
    // add invitation to redux state
    store.dispatch(actionCreators.app.chat.invitation({
      userName: content.invitingUser,
      room: content.joinRoom,
    }));
  });

  socket.on('chat message', (serverMessage) => {
    store.dispatch(actionCreators.app.chat.addMessage({
      message: serverMessage.message,
      userName: serverMessage.userName,
      wsId: serverMessage.wsId,
      room: serverMessage.room,
    }));
  });

  socket.on('typing status', (serverMessage) => {
    store.dispatch(actionCreators.app.chat.interlocutor.isTyping({
      isTyping: serverMessage.status,
      wsId: serverMessage.user,
      userName: serverMessage.userName,
      room: serverMessage.room,
    }));
  });

  socket.on('isOnline', (user: { userName: string, wsId: string }) => {
    store.dispatch(actionCreators.app.users.online(user));
    store.dispatch(actionCreators.app.request.data.online.true(user));
  });

  socket.on('deregistered', (userName: string) => {
    store.dispatch(actionCreators.app.users.offline(userName));
    store.dispatch(actionCreators.app.request.data.online.false(userName));
  });

  // TODO: rename this channel - when refactoring to constants
  // redis notifications re-published by Node's socket
  socket.on('active request count changed', (change: { channel: string, message: string, somethingElse: string}) => {
    // Counters
    if (change.action === 'incrby') {
      if (change.keyspace === '__keyspace@0__:members') {
        store.dispatch(fetchMemberCount());
      }
      if (change.keyspace === '__keyspace@0__:fulfilled') {
        store.dispatch(fetchFulfilledRequestCount());
      }
      if (change.keyspace === `__keyspace@0__:messages:user:${store.getState().user.userId}`) {
        store.dispatch(fetchInbox(store.getState().user.authorization));
      }
    } else { // TODO: add a more specific filter for requests
      console.log('request count and geo update block');
      store.dispatch(fetchRequestCount());
      // update map results
      const lastGeoQuery = store.getState().requestGeoLastQuery;
      console.log(lastGeoQuery);
      if (lastGeoQuery.center && lastGeoQuery.radius) {
        console.log('dispatching geo update');
        store.dispatch(fetchRequests(lastGeoQuery.center, lastGeoQuery.radius));
      }
    }
  });

  // user stats updates
  socket.on('user stats', (stats: { usersOnline: number, visitorsOnline: number }) => {
    console.log(stats);
    // filter
    store.dispatch(actionCreators.app.users.stats(stats));
    // update map results
    const lastGeoQuery = store.getState().requestGeoLastQuery;
    console.log(lastGeoQuery);
    if (lastGeoQuery.center && lastGeoQuery.radius) {
      console.log('dispatching');
      store.dispatch(fetchRequests(lastGeoQuery.center, lastGeoQuery.radius));
    }
  });
};
/* eslint-enable no-console */

export default setUpSocket;
export { socket };
