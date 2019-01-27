// @flow
import axios from 'axios';

import actionCreators from './index';
import {
  FETCH_API_RESOURCE_ENDPOINT_ROUTE,
  CREATE_API_RESOURCE_ENDPOINT_ROUTE,
  EDIT_API_RESOURCE_ENDPOINT_ROUTE,
  DELETE_API_RESOURCE_ENDPOINT_ROUTE,
  ACTIVATE_REQUEST_ENDPOINT_ROUTE,
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

export const createRequest = (
  model: {
    title: string,
    description: string,
    address: string,
    category: string,
  },
  authorization: string,
) => (dispatch: Function) => {
  dispatch(actionCreators.app.async.request('createRequest'));
  axios.post(CREATE_API_RESOURCE_ENDPOINT_ROUTE, {
    request: {
      model,
      modelName: 'request',
      service: 'request',
      authorization,
    },
  })
    .then((result) => {
      dispatch(actionCreators.app.errors.request.unset());
      dispatch(actionCreators.app.infos.request.set({
        infoType: 'success',
        message: 'Success',
        requestId: result.data.id,
      }));
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
      } else if (data[0].code === 'VALIDATION') {
        // Validation error: report problems
        dispatch(actionCreators.app.infos.request.unset());
        dispatch(actionCreators.app.errors.request.set(data[0]));
      }
      dispatch(actionCreators.app.async.done());
    });
};


export const activateRequest = (
  model: {
    id: string,
  },
  authorization: string,
) => (dispatch: Function) => {
  dispatch(actionCreators.app.async.request('editRequest'));
  axios.post(ACTIVATE_REQUEST_ENDPOINT_ROUTE, {
    request: {
      requestId: model.id,
      authorization,
    },
  })
    .then((result) => {
      dispatch(actionCreators.app.errors.request.unset());
      dispatch(actionCreators.app.infos.request.set({
        infoType: 'success',
        message: 'Success.',
        requestId: result.data.id,
      }));
      dispatch(fetchRequest(authorization, result.data.id));
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
      } else if (data[0].code === 'VALIDATION') {
        // Validation error: report problems
        dispatch(actionCreators.app.infos.request.unset());
        dispatch(actionCreators.app.errors.request.set(data[0]));
      }
      dispatch(actionCreators.app.async.done());
    });
};

export const editRequest = (
  model: {
    id: string,
    title: string,
    description: string,
    address: string,
    category: string,
  },
  authorization: string,
) => (dispatch: Function) => {
  dispatch(actionCreators.app.async.request('editRequest'));
  axios.post(EDIT_API_RESOURCE_ENDPOINT_ROUTE, {
    request: {
      model,
      modelName: 'request',
      service: 'request',
      authorization,
    },
  })
    .then((result) => {
      dispatch(actionCreators.app.errors.request.unset());
      dispatch(actionCreators.app.infos.request.set({
        infoType: 'success',
        message: 'Success.',
        requestId: result.data.id,
      }));
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
      } else if (data[0].code === 'VALIDATION') {
        // Validation error: report problems
        dispatch(actionCreators.app.infos.request.unset());
        dispatch(actionCreators.app.errors.request.set(data[0]));
      }
      dispatch(actionCreators.app.async.done());
    });
};

export const deleteRequest = (
  model: {
    id: string,
  },
  authorization: string,
) => (dispatch: Function) => {
  dispatch(actionCreators.app.async.request('deleteRequest'));
  axios.post(DELETE_API_RESOURCE_ENDPOINT_ROUTE, {
    request: {
      modelId: model.id,
      service: 'request',
      authorization,
    },
  })
    .then(() => {
      dispatch(actionCreators.app.request.own.delete());
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
      } else if (data[0].code === 'VALIDATION') {
        // Validation error: report problems
        dispatch(actionCreators.app.infos.request.unset());
        dispatch(actionCreators.app.errors.request.set(data[0]));
      }
      dispatch(actionCreators.app.async.done());
    });
};
