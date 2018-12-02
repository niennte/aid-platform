// @flow
import axios from 'axios';

import actionCreators from './index';
import {
  FETCH_API_RESOURCE_ENDPOINT_ROUTE,
} from '../routes';

const fetchResponseList = (
  authorization: string,
) => (dispatch: Function) => {
  dispatch(actionCreators.app.async.request('responseList'));
  axios.post(FETCH_API_RESOURCE_ENDPOINT_ROUTE, {
    request: {
      authorization,
      service: 'response',
    },
  })
    .then((result) => {
      dispatch(actionCreators.app.response.own.list(result.data));
      dispatch(actionCreators.app.async.done());
    }).catch((error) => {
      const { data } = error.response;
      if (!data) {
      // unhandled API error
        dispatch(actionCreators.app.infos.response.unset());
        dispatch(actionCreators.app.errors.response.set({
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

export default fetchResponseList;
