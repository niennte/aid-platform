// @flow

import axios from 'axios';

import actionCreators from './index';
import { fetchResponseList } from './responses';
import {
  CREATE_API_RESOURCE_ENDPOINT_ROUTE,
} from '../routes';

// eslint-disable-next-line
export const createFulfillment = (
  model: {
    response_id: string,
    message: string,
  },
  authorization: string,
) => (dispatch: Function) => {
  dispatch(actionCreators.app.async.request('markDoneResponse'));
  console.log(authorization);
  axios.post(CREATE_API_RESOURCE_ENDPOINT_ROUTE, {
    request: {
      model,
      modelName: 'fulfillment',
      service: 'fulfillment',
      authorization,
    },
  })
    .then(() => {
    // load the list so that success message can navigate to the response
      dispatch(fetchResponseList(authorization));
      dispatch(actionCreators.app.errors.fulfillment.unset());
      dispatch(actionCreators.app.infos.fulfillment.set({
        infoType: 'success',
        message: 'Success',
      }));
      dispatch(actionCreators.app.fulfillment.create.success());
      dispatch(actionCreators.app.async.done());
    }).catch((error) => {
      const { data } = error.response;
      if (!data) {
      // unhandled API error
        dispatch(actionCreators.app.infos.fulfillment.unset());
        dispatch(actionCreators.app.errors.fulfillment.set({
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
        dispatch(actionCreators.app.infos.fulfillment.unset());
        dispatch(actionCreators.app.errors.fulfillment.set(data[0]));
      }
      dispatch(actionCreators.app.async.done());
    });
};
