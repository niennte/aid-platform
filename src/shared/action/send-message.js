// @flow
import 'isomorphic-fetch';
import axios from 'axios';

import actionCreators from './index';
import { remoteRestURL, CREATE_API_RESOURCE_ENDPOINT_ROUTE } from '../routes';

export const sendMessageFetch = (
  message: {
  recipient_id: string,
  subject: string,
  body: string,
},
  authorization: string,
) => (dispatch: Function) => {
  dispatch(actionCreators.app.async.request());
  return fetch(remoteRestURL('resources', 'inbox'), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization,
    },
    body: JSON.stringify({
      message,
    }),
  })
    .then((res) => {
      console.log(res);
      if (!res.ok) throw Error(res.statusText);
      return res.json();
    })
    .then((data) => {
      if (!data.login) throw Error('No response received');
      console.log(data);
      dispatch(actionCreators.app.errors.message.unset());
      dispatch(actionCreators.app.infos.message.set({ infoType: 'success', message: 'Success' }));
    })
    .catch((error) => {
      const { data } = error.response;
      console.log(error);
      dispatch(actionCreators.app.infos.message.unset());
      dispatch(actionCreators.app.errors.message.set(data[0]));
    });
};

export const sendMessage = (
  message: {
    recipient_id: string,
    subject: string,
    body: string,
  },
  authorization: string,
) => (dispatch: Function) => {
  dispatch(actionCreators.app.async.request());
  axios.post(CREATE_API_RESOURCE_ENDPOINT_ROUTE, {
    request: {
      model: message,
      modelName: 'message',
      service: 'inbox',
      authorization,
    },
  })
    .then((result) => {
      dispatch(actionCreators.app.errors.message.unset());
      dispatch(actionCreators.app.infos.message.set({
        infoType: 'success',
        message: 'Success',
        messageId: result.data.message,
      }));
    }).catch((error) => {
      const { data } = error.response;
      if (!data) {
        // unhandled API error
        dispatch(actionCreators.app.infos.message.unset());
        dispatch(actionCreators.app.errors.message.set({
          code: 'UNKNOWN',
          detail: {
            errors: {},
            UNKNOWN: 'Unexpected error. Please try again later.',
          },
        }));
      } else if (data[0].code === 'AUTHENTICATION') {
        // Authorization error: publish logout to UI and prompt user to log in
        dispatch(actionCreators.app.errors.login.set({
          error: data[0].detail[data[0].code],
        }));
        dispatch(actionCreators.app.user.logout());
      } else if (data[0].code === 'VALIDATION') {
        // Validation error: report problems
        dispatch(actionCreators.app.infos.message.unset());
        dispatch(actionCreators.app.errors.message.set(data[0]));
      }
    });
};

export default sendMessage;
