// @flow

import { createActions } from 'redux-actions';
import 'isomorphic-fetch';

import {
  loginEndpointRoute,
  FETCH_REQUESTS_ENDPOINT_ROUTE,
  FETCH_REQUEST_DATA_ENDPOINT_ROUTE,
  FETCH_REQUEST_DISTANCE_ENDPOINT_ROUTE,
  FETCH_REQUEST_ACTIVE_COUNT_ROUTE,
  FETCH_REQUEST_FULFILLED_COUNT_ROUTE,
  FETCH_MEMBER_COUNT_ROUTE,
} from '../routes';
import { socket } from '../../client/socket';
import { IO_CLIENT_JOIN_ROOM } from '../config';

const actionCreators = createActions({
  APP: {
    LAYOUT: {
      ASIDE: {
        OPEN: undefined,
        CLOSED: undefined,
      },
    },
    ASYNC: {
      REQUEST: undefined,
      FAILURE: undefined,
    },
    CHAT: {
      INVITATION: undefined,
      ROOM: {
        INITIATE: undefined,
        ACTIVATE: undefined,
      },
      CONNECT: undefined,
      USER: undefined,
      ADD_MESSAGE: undefined,
      INTERLOCUTOR_TYPING: undefined,
      INTERLOCUTOR: {
        IS_TYPING: undefined,
      },
    },
    USER: {
      LOGIN: {
        SUCCESS: undefined,
      },
      LOGOUT: undefined,
    },
    USERS: {
      COUNT: undefined,
      ONLINE: undefined,
      OFFLINE: undefined,
      STATS: undefined,
    },
    REQUEST: {
      NEARBY: {
        LAST_QUERY: undefined,
        SUCCESS: undefined,
      },
      DISTANCE: {
        RESET: undefined,
        SUCCESS: undefined,
      },
      DATA: {
        RESET: undefined,
        SUCCESS: undefined,
        ONLINE: { // this is a changelist
          TRUE: undefined,
          FALSE: undefined,
        },
      },
      COUNT: {
        ACTIVE: {
          FETCH: undefined,
          LISTENER: undefined,
        },
        FULFILLED: {
          FETCH: undefined,
        },
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
}) => (dispatch: Function) => {
  const chatRoom = `${chatInvite.invitingUserName}-${chatInvite.invitedUserName}`;
  // create the room
  dispatch(actionCreators.app.chat.room.initiate({
    room: chatRoom, interlocutor: { userName: chatInvite.invitedUserName, wsId: 'blah' },
  }));
  // load the room
  dispatch(actionCreators.app.chat.room.activate({
    room: chatRoom,
  }));
  // and open the UI for it
  dispatch(actionCreators.app.layout.aside.open());
  socket.emit(IO_CLIENT_JOIN_ROOM, chatRoom);
  socket.emit('chat-invite', Object.assign(chatInvite, { chatRoom }));
};

export const loginUser = (userName: string) => (dispatch: Function) => {
  dispatch(actionCreators.app.async.request());
  return fetch(loginEndpointRoute(userName), {
    method: 'POST',
    headers: {
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
      dispatch(actionCreators.app.request.nearby.success(data.locations));
      // update last query (so that real tim update can use these)
      dispatch(actionCreators.app.request.nearby.lastQuery(data.lastQuery));
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


export const checkOnlineStatus = (userName: string) => () => {
  socket.emit('isOnline?', userName);
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
      dispatch(checkOnlineStatus(data.userName));
      dispatch(actionCreators.app.request.data.success(data));
    })
    .catch((e) => {
      dispatch(actionCreators.app.async.failure(e.message));
    });
};

export const fetchRequestCount = () => (dispatch: Function) => {
  dispatch(actionCreators.app.async.request());
  return fetch(FETCH_REQUEST_ACTIVE_COUNT_ROUTE, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (!res.ok) throw Error(res.statusText);
      return res.json();
    })
    .then((data) => {
      if (!data) throw Error('fetchRequestCount received no response');
      dispatch(actionCreators.app.request.count.active.fetch(data));
    })
    .catch((e) => {
      dispatch(actionCreators.app.async.failure(e.message));
    });
};

export const fetchFulfilledRequestCount = () => (dispatch: Function) => {
  dispatch(actionCreators.app.async.request());
  return fetch(FETCH_REQUEST_FULFILLED_COUNT_ROUTE, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (!res.ok) throw Error(res.statusText);
      return res.json();
    })
    .then((data) => {
      if (!data) throw Error('fetchFulfilledRequestCount received no response');
      dispatch(actionCreators.app.request.count.fulfilled.fetch(data));
    })
    .catch((e) => {
      dispatch(actionCreators.app.async.failure(e.message));
    });
};

export const fetchMemberCount = () => (dispatch: Function) => {
  dispatch(actionCreators.app.async.request());
  return fetch(FETCH_MEMBER_COUNT_ROUTE, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (!res.ok) throw Error(res.statusText);
      return res.json();
    })
    .then((data) => {
      if (!data) throw Error('fetchMemberCount received no response');
      dispatch(actionCreators.app.users.count(data));
    })
    .catch((e) => {
      dispatch(actionCreators.app.async.failure(e.message));
    });
};

// web sockets
export const emitMessage = (content: { message: string, userName: string, room: string }) => () => {
  socket.emit('chat message', { message: content.message, userName: content.userName, room: content.room });
  socket.emit('is typing', { status: false, userName: content.userName, room: content.room });
};

export const emitIsTyping = (content: Object) => () => {
  socket.emit('is typing', content);
};

export default actionCreators;
