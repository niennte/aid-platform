// @flow
import axios from 'axios';

import actionCreators from './index';
import {
  FETCH_API_RESOURCE_ENDPOINT_ROUTE,
  DELETE_MESSAGE_ENDPOINT_ROUTE,
  MESSAGE_MARK_READ_ENDPOINT_ROUTE,
} from '../routes';

export const fetchInboxList = (
  authorization: string,
) => (dispatch: Function) => {
  dispatch(actionCreators.app.async.request('inbox'));
  axios.post(FETCH_API_RESOURCE_ENDPOINT_ROUTE, {
    request: {
      authorization,
      service: 'inbox',
    },
  })
    .then((result) => {
      dispatch(actionCreators.app.message.inbox.list(result.data));
      dispatch(actionCreators.app.async.done());
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
      }
      dispatch(actionCreators.app.async.done());
    });
};

export const fetchOutboxList = (
  authorization: string,
) => (dispatch: Function) => {
  dispatch(actionCreators.app.async.request('outbox'));
  axios.post(FETCH_API_RESOURCE_ENDPOINT_ROUTE, {
    request: {
      authorization,
      service: 'outbox',
    },
  })
    .then((result) => {
      dispatch(actionCreators.app.message.outbox.list(result.data));
      dispatch(actionCreators.app.async.done());
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
      }
      dispatch(actionCreators.app.async.done());
    });
};

export const deleteInboxMessage = (
  messageId: string,
  authorization: string,
) => (dispatch: Function) => {
  dispatch(actionCreators.app.async.request('inboxMessage'));
  axios.post(DELETE_MESSAGE_ENDPOINT_ROUTE, {
    request: {
      authorization,
      messageId,
    },
  })
    .then(() => {
      dispatch(actionCreators.app.message.inbox.delete(messageId));
      dispatch(actionCreators.app.async.done());
    }).catch((error) => {
      const { data } = error.response;
      if (data && data[0].code === 'AUTHENTICATION') {
        // Authorization error: publish logout to UI and prompt user to log in
        dispatch(actionCreators.app.errors.login.set({
          error: data[0].detail[data[0].code],
        }));
        dispatch(actionCreators.app.user.logout());
      }
      dispatch(actionCreators.app.async.done());
    });
};

// mark Message as read
export const markMessageAsRead = (
  messageId: string,
  authorization: string,
) => (dispatch: Function) => {
  dispatch(actionCreators.app.async.request('inboxMessage'));
  axios.post(MESSAGE_MARK_READ_ENDPOINT_ROUTE, {
    request: {
      authorization,
      messageId,
    },
  })
    .then(() => {
      dispatch(actionCreators.app.message.inbox.read(messageId));
      dispatch(actionCreators.app.async.done());
    }).catch((error) => {
      const { data } = error.response;
      if (data && data[0].code === 'AUTHENTICATION') {
        // Authorization error: publish logout to UI and prompt user to log in
        dispatch(actionCreators.app.errors.login.set({
          error: data[0].detail[data[0].code],
        }));
        dispatch(actionCreators.app.user.logout());
      }
      dispatch(actionCreators.app.async.done());
    });
};

export default fetchInboxList;
