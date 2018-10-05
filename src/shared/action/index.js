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

export const loginUser = (loginData: {userName: string, wsId: string}) => (dispatch: Function) => {
  dispatch(actionCreators.app.async.request());
  return fetch(loginEndpointRoute(loginData.userName), {
    method: 'POST',
    headers: {
      // Check what headers the API needs. A couple of usuals right below
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userName: loginData.userName,
      wsId: loginData.wsId,
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
  location1: string,
  location2: string,
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

export default actionCreators;
