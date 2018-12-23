// @flow

import axios from 'axios';

import actionCreators from './index';
import {
  ACCOUNT_ENDPOINT_ROUTE,
  remoteAuthUrl,
} from '../routes';


export const fetchAccount = (
  authorization: string,
) => (dispatch: Function) => {
  dispatch(actionCreators.app.async.request('account'));
  axios.post(ACCOUNT_ENDPOINT_ROUTE, {
    request: {
      authorization,
    },
  })
    .then((result) => {
      dispatch(actionCreators.app.account.success(result.data));
      dispatch(actionCreators.app.async.done());
    }).catch((error) => {
      const { data } = error.response;
      if (!data) {
      // unhandled API error
        dispatch(actionCreators.app.infos.account.unset());
        dispatch(actionCreators.app.errors.account.set({
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


export const verifyAccount = (
  data: object,
  authorization: string,
) => (dispatch: Function) => {
  dispatch(actionCreators.app.async.request('createAccount'));

  const authenticatedRequest = axios.create({
    baseURL: remoteAuthUrl(),
    timeout: 3000,
    headers: {
      authorization,
      'Content-Type': 'multipart/form-data',
    },
  });

  authenticatedRequest.post('account', data)
    .then(() => {
      dispatch(actionCreators.app.errors.account.unset());
      dispatch(actionCreators.app.infos.account.set({
        infoType: 'success',
        message: 'Success',
      }));
      dispatch(actionCreators.app.async.done());
    }).catch((error) => {
      const { data: errData } = error.response;
      if (!errData) {
      // unhandled API error
        dispatch(actionCreators.app.infos.account.unset());
        dispatch(actionCreators.app.errors.account.set({
          code: 'UNKNOWN',
          detail: {
            errors: {},
            UNKNOWN: 'Unexpected error. Please try again later.',
          },
        }));
      } else if (errData.errors[0].code === 'AUTHENTICATION') {
      // Authorization error: publish logout to UI and prompt user to log in
        dispatch(actionCreators.app.errors.login.set({
          error: errData.errors[0].detail[errData.errors[0].code],
        }));
        dispatch(actionCreators.app.user.logout());
      } else if (errData.errors[0].code === 'VALIDATION') {
      // Validation error: report problems
        dispatch(actionCreators.app.infos.account.unset());
        dispatch(actionCreators.app.errors.account.set(errData.errors[0]));
      }
      dispatch(actionCreators.app.async.done());
    });
};
