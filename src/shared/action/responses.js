// @flow

import axios from 'axios';

import actionCreators from './index';
import {
  CREATE_API_RESOURCE_ENDPOINT_ROUTE,
  DELETE_API_RESOURCE_ENDPOINT_ROUTE,
  FETCH_API_RESOURCE_ENDPOINT_ROUTE,
} from '../routes';


export const fetchResponseList = (
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


export const createResponse = (
  model: {
    request_id: string,
    message: string,
  },
  authorization: string,
) => (dispatch: Function) => {
  dispatch(actionCreators.app.async.request('createResponse'));
  axios.post(CREATE_API_RESOURCE_ENDPOINT_ROUTE, {
    request: {
      model,
      modelName: 'response',
      service: 'response',
      authorization,
    },
  })
    .then((result) => {
    // load the list so that success mesage can navigate to the response
      dispatch(fetchResponseList(authorization));
      dispatch(actionCreators.app.errors.response.unset());
      dispatch(actionCreators.app.infos.response.set({
        infoType: 'success',
        message: 'Success',
        requestId: result.data.id,
      }));
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
      } else if (data[0].code === 'VALIDATION') {
      // Validation error: report problems
        dispatch(actionCreators.app.infos.response.unset());
        dispatch(actionCreators.app.errors.response.set(data[0]));
      }
      dispatch(actionCreators.app.async.done());
    });
};

export const deleteResponse = (
  model: {
    id: string,
  },
  authorization: string,
) => (dispatch: Function) => {
  dispatch(actionCreators.app.async.request('deleteResponse'));
  axios.post(DELETE_API_RESOURCE_ENDPOINT_ROUTE, {
    request: {
      modelId: model.id,
      service: 'response',
      authorization,
    },
  })
    .then(() => {
      dispatch(actionCreators.app.response.own.delete(model.id));
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
      } else if (data[0].code === 'VALIDATION') {
      // Validation error: report problems
        dispatch(actionCreators.app.infos.response.unset());
        dispatch(actionCreators.app.errors.response.set(data[0]));
      }
      dispatch(actionCreators.app.async.done());
    });
};
