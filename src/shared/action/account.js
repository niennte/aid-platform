// @flow

import axios from 'axios';

import actionCreators from './index';
import {
  ACCOUNT_CREATE_ENDPOINT_ROUTE,
  ACCOUNT_ENDPOINT_ROUTE,
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


export const createAccount = (
  data: object,
  authorization: string,
) => (dispatch: Function) => {
  dispatch(actionCreators.app.async.request('createAccount'));

  console.log(data);
  const authenticatedRequest = axios.create({
    headers: {
      authorization,
      'Content-Type': 'multipart/form-data',
    },
  });


  const Url = 'https://peaceful-river-58348.herokuapp.com/account';

  authenticatedRequest.post(Url, data)
    .then(() => {
      dispatch(actionCreators.app.errors.account.unset());
      dispatch(actionCreators.app.infos.account.set({
        infoType: 'success',
        message: 'Success',
      }));
      dispatch(actionCreators.app.async.done());
    }).catch((error) => {
    alert('here');
      const { data } = error.response;
      console.dir(data);
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
      } else if (data.errors[0].code === 'AUTHENTICATION') {
      // Authorization error: publish logout to UI and prompt user to log in
        dispatch(actionCreators.app.errors.login.set({
          error: data.errors[0].detail[data.errors[0].code],
        }));
        dispatch(actionCreators.app.user.logout());
      } else if (data.errors[0].code === 'VALIDATION') {
      // Validation error: report problems
        dispatch(actionCreators.app.infos.account.unset());
        dispatch(actionCreators.app.errors.account.set(data.errors[0]));
      }
      dispatch(actionCreators.app.async.done());
    });
};
