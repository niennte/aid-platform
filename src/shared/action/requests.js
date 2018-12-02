// @flow
import axios from 'axios';

import actionCreators from './index';
import {
  FETCH_API_RESOURCE_ENDPOINT_ROUTE,
} from '../routes';

export const fetchRequestList = (
  authorization: string,
) => (dispatch: Function) => {
  dispatch(actionCreators.app.async.request('requestsOwnList'));
  axios.post(FETCH_API_RESOURCE_ENDPOINT_ROUTE, {
    request: {
      authorization,
      service: 'request-own',
    },
  })
    .then((result) => {
      dispatch(actionCreators.app.request.own.list(result.data));
      dispatch(actionCreators.app.async.done());
    }).catch((error) => {
      const { data } = error.response;
      if (!data) {
        // unhandled API error
        dispatch(actionCreators.app.infos.request.unset());
        dispatch(actionCreators.app.errors.request.set({
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


export const fetchRequest = (
  authorization: string,
  requestId: string,
) => (dispatch: Function) => {
  dispatch(actionCreators.app.async.request('ownRequest'));
  axios.post(FETCH_API_RESOURCE_ENDPOINT_ROUTE, {
    request: {
      authorization,
      service: `request/${requestId}`,
    },
  })
    .then((result) => {
      dispatch(actionCreators.app.request.own.data(result.data));
      dispatch(actionCreators.app.async.done());
    }).catch((error) => {
      const { data } = error.response;
      if (!data) {
      // unhandled API error
        dispatch(actionCreators.app.infos.request.unset());
        dispatch(actionCreators.app.errors.request.set({
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
