// @flow

import { createActions } from 'redux-actions';
import 'isomorphic-fetch';

import { loginEndpointRoute } from '../routes';
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
    },
  },
});

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
    })
    .catch(() => {
      dispatch(actionCreators.app.async.failure());
    });
};

export const emitMessage = (message: Object, userName: string) => () => {
  socket.emit('chat message', message);
  socket.emit('is typing', { status: false, userName });
};

export const emitIsTyping = (isTyping: Object) => () => {
  socket.emit('is typing', isTyping);
};

export default actionCreators;
