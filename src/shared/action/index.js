// @flow

import { createActions } from 'redux-actions';
import 'isomorphic-fetch';
import axios from 'axios';

import {
  loginEndpointRoute,
  PASSWORD_REQUEST_ENDPONT_ROUTE,
  PASSWORD_RESET_ENDPONT_ROUTE,
  CREATE_USER_ENDPONT_ROUTE,
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
    FLASH: {
      SET: undefined,
    },
    LAYOUT: {
      ASIDE: {
        OPEN: undefined,
        CLOSED: undefined,
      },
    },
    ASYNC: {
      REQUEST: undefined,
      FAILURE: undefined,
      LOADING: undefined,
      DONE: undefined,
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
    MESSAGE: {
      INBOX: {
        LIST: undefined,
        ADD: undefined,
        READ: undefined,
        DELETE: undefined,
      },
      OUTBOX: {
        LIST: undefined,
        MESSAGE: undefined,
      },
    },
    ERRORS: {
      LOGIN: {
        SET: undefined,
        UNSET: undefined,
        DELETE: undefined,
      },
      PASSWORD_REQUEST: {
        SET: undefined,
        UNSET: undefined,
      },
      PASSWORD_RESET: {
        SET: undefined,
        UNSET: undefined,
      },
      SIGNUP: {
        SET: undefined,
        UNSET: undefined,
      },
      MESSAGE: {
        SET: undefined,
        UNSET: undefined,
      },
    },
    INFOS: {
      LOGIN: {
        SET: undefined,
        UNSET: undefined,
      },
      PASSWORD_REQUEST: {
        SET: undefined,
        UNSET: undefined,
      },
      PASSWORD_RESET: {
        SET: undefined,
        UNSET: undefined,
      },
      SIGNUP: {
        SET: undefined,
        UNSET: undefined,
      },
      MESSAGE: {
        SET: undefined,
        UNSET: undefined,
      },
    },
    VALUES: {
      MESSAGE: {
        SET: undefined,
      },
    },
  },
});

export const publishLogin = (userName: string) => () => {
  socket.emit('loggedIn', userName);
  socket.emit(IO_CLIENT_JOIN_ROOM, userName);
};

export const requestPassword = (user: {
  email: String
}) => (dispatch: Function) => {
  dispatch(actionCreators.app.async.request());
  axios.post(PASSWORD_REQUEST_ENDPONT_ROUTE, { user })
    .then(() => {
      dispatch(actionCreators.app.errors.passwordRequest.unset());
      dispatch(actionCreators.app.infos.passwordRequest.set({ infoType: 'success', message: 'Success' }));
    }).catch((error) => {
      const { data } = error.response;
      dispatch(actionCreators.app.infos.passwordRequest.unset());
      dispatch(actionCreators.app.errors.passwordRequest.set(data[0]));
    });
};

export const resetPassword = (user: {
  password: String,
  password_confirmation: String,
  password_reset_token: String,
}) => (dispatch: Function) => {
  dispatch(actionCreators.app.async.request());
  axios.post(PASSWORD_RESET_ENDPONT_ROUTE, { user })
    .then(() => {
      dispatch(actionCreators.app.errors.passwordReset.unset());
      dispatch(actionCreators.app.infos.passwordReset.set({ infoType: 'success', message: 'Success' }));
    }).catch((error) => {
      const { data } = error.response;
      dispatch(actionCreators.app.infos.passwordReset.unset());
      dispatch(actionCreators.app.errors.passwordReset.set(data[0]));
    });
};

export const createUser = (user: {
  username: string,
  email: string,
  password: string,
  password_confirmation: string,
}) => (dispatch: Function) => {
  dispatch(actionCreators.app.async.request());
  axios.post(CREATE_USER_ENDPONT_ROUTE, { user })
    .then(() => {
      dispatch(actionCreators.app.errors.signup.unset());
      dispatch(actionCreators.app.infos.signup.set({ infoType: 'success', message: 'Success' }));
    }).catch((error) => {
      const { data } = error.response;
      dispatch(actionCreators.app.infos.signup.unset());
      dispatch(actionCreators.app.errors.signup.set(data[0]));
    });
};

export const loginUser = (user: {
  email: String,
  password: String,
}) => (dispatch: Function) => {
  dispatch(actionCreators.app.async.request('login'));
  axios.post(loginEndpointRoute(), {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: { user },
  })
    .then((response) => {
      const { login } = response.data;
      dispatch(actionCreators.app.errors.login.unset());
      dispatch(actionCreators.app.user.login.success(login));
      dispatch(publishLogin(login.userName));
      dispatch(actionCreators.app.async.done());
    }).catch((error) => {
      const { data } = error.response;
      dispatch(actionCreators.app.errors.login.set(data));
      dispatch(actionCreators.app.async.done());
    });
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

export const loginUserOld = (userName: string) => (dispatch: Function) => {
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
      dispatch(actionCreators.app.request.data.success(Object.assign(data, { id: requestId })));
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
