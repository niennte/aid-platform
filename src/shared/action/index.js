// @flow

import { createActions } from 'redux-actions';
import 'isomorphic-fetch';

import {
  loginEndpointRoute,
  FETCH_REQUESTS_ENDPOINT_ROUTE,
  FETCH_REQUEST_DATA_ENDPOINT_ROUTE,
  FETCH_REQUEST_DISTANCE_ENDPOINT_ROUTE,
} from '../routes';
import { socket } from '../../client/socket';
import { IO_CLIENT_JOIN_ROOM } from '../config';

const actionCreators = createActions({
  APP: {
    ASYNC: {
      REQUEST: undefined,
      FAILURE: undefined,
    },
    CHAT: {
      CONNECT: undefined,
      USER: undefined,
      ADD_MESSAGE: undefined,
      INTERLOCUTOR_TYPING: undefined,
    },
    USER: {
      LOGIN: {
        SUCCESS: undefined,
      },
      LOGOUT: undefined,
    },
    USERS: {
      ONLINE: undefined,
      OFFLINE: undefined,
    },
    REQUEST: {
      NEARBY: {
        SUCCESS: undefined,
      },
      DISTANCE: {
        RESET: undefined,
        SUCCESS: undefined,
      },
      DATA: {
        RESET: undefined,
        SUCCESS: undefined,
      },
    },
  },
});

export const publishLogin = (login: Object) => () => {
  socket.emit('loggedIn', login);
  socket.emit(IO_CLIENT_JOIN_ROOM, login.userName);
};


export const logoutUser = (userName: string) => (dispatch: Function) => {
  socket.emit('loggedOut', userName);
  dispatch(actionCreators.app.user.logout());
};

export const publishDisconnect = (wsId: string) => () => {
  socket.emit('disconnected', wsId);
};

export const sendChatInvite = (chatInvite: {
  invitingUserName: string,
  invitedUserName: string
}) => () => {
  console.log('sendChatInvite');
  console.log(chatInvite);
  const chatRoom = `${chatInvite.invitingUserName}-${chatInvite.invitedUserName}`;
  socket.emit(IO_CLIENT_JOIN_ROOM, chatRoom);
  socket.emit('chat-invite', Object.assign(chatInvite, { chatRoom }));
};

export const loginUser = (userName: string) => (dispatch: Function) => {
  dispatch(actionCreators.app.async.request());
  return fetch(loginEndpointRoute(userName), {
    method: 'POST',
    headers: {
      // Check what headers the API needs. A couple of usuals right below
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userName,
      password: '',
    }),
  })
    .then((res) => {
      if (!res.ok) throw Error(res.statusText);
      return res.json();
    })
    .then((data) => {
      if (!data.login) throw Error('No message received');
      dispatch(actionCreators.app.user.login.success(data.login));
      dispatch(publishLogin(data.login));
    })
    .catch(() => {
      dispatch(actionCreators.app.async.failure());
    });
};

// redis
export const fetchRequests = (center: Object, radius: number) => (dispatch: Function) => {
  dispatch(actionCreators.app.async.request());
  return fetch(FETCH_REQUESTS_ENDPOINT_ROUTE, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      center,
      radius,
    }),
  })
    .then((res) => {
      if (!res.ok) throw Error(res.statusText);
      return res.json();
    })
    .then((data) => {
      if (!data) throw Error('fetchRequests received no response');
      // pass locations to the redux state
      dispatch(actionCreators.app.request.nearby.success(data));
    })
    .catch((e) => {
      dispatch(actionCreators.app.async.failure(e.message));
    });
};

export const fetchRequestDistance = (
  location1: {lat: string, lng: string},
  location2: {lat: string, lng: string},
) => (dispatch: Function) => {
  dispatch(actionCreators.app.async.request());
  return fetch(FETCH_REQUEST_DISTANCE_ENDPOINT_ROUTE, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      location1,
      location2,
    }),
  })
    .then((res) => {
      if (!res.ok) throw Error(res.statusText);
      return res.json();
    })
    .then((data) => {
      if (!data) throw Error('fetchRequests received no response');
      // pass result to the redux state
      dispatch(actionCreators.app.request.distance.success(data));
    })
    .catch((e) => {
      dispatch(actionCreators.app.async.failure(e.message));
    });
};


export const fetchRequestData = (requestId: string) => (dispatch: Function) => {
  dispatch(actionCreators.app.request.data.reset());
  dispatch(actionCreators.app.async.request());
  return fetch(FETCH_REQUEST_DATA_ENDPOINT_ROUTE, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ requestId }),
  })
    .then((res) => {
      if (!res.ok) throw Error(res.statusText);
      return res.json();
    })
    .then((data) => {
      if (!data) throw Error('fetchRequestData received no response');
      dispatch(actionCreators.app.request.data.success(data));
    })
    .catch((e) => {
      dispatch(actionCreators.app.async.failure(e.message));
    });
};

// web sockets
export const emitMessage = (message: Object, userName: string) => () => {
  socket.emit('chat message', message);
  socket.emit('is typing', { status: false, userName });
};

export const emitIsTyping = (isTyping: Object) => () => {
  socket.emit('is typing', isTyping);
};

export const checkOnlineStatus = (userName: string) => () => {
  socket.emit('isOnline?', userName);
};

export default actionCreators;
