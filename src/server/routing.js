// @flow

// - deal with requests and responses.
// - calls to business logic externalized to the controller
// - using * as the route on the server leaves handling to React Router.

import {
  homePage,
  chatPage,
  loginEndpoint,
  passwordRequestEndpoint,
  passwordResetEndpoint,
  createUserEndpoint,
  requestsEndpoint,
  requestDataEndpoint,
  requestDistanceEndpoint,
  requestActiveCountEndpoint,
  requestFulfilledCountEndpoint,
  memberCountEndpoint,
  sendMessageEndpoint,
  FetchInboxEndpoint,
  DeleteMessageEndpoint,
  MarkReadMessageEndpoint,
} from './controller';

import {
  HOME_PAGE_ROUTE,
  CHAT_PAGE_ROUTE,
  FETCH_REQUESTS_ENDPOINT_ROUTE,
  FETCH_REQUEST_DATA_ENDPOINT_ROUTE,
  FETCH_REQUEST_DISTANCE_ENDPOINT_ROUTE,
  FETCH_REQUEST_ACTIVE_COUNT_ROUTE,
  FETCH_REQUEST_FULFILLED_COUNT_ROUTE,
  FETCH_MEMBER_COUNT_ROUTE,
  loginEndpointRoute,
  PASSWORD_REQUEST_ENDPONT_ROUTE,
  PASSWORD_RESET_ENDPONT_ROUTE,
  CREATE_USER_ENDPONT_ROUTE,
  SEND_MESSAGE_ENDPONT_ROUTE,
  FETCH_INBOX_ENDPOINT_ROUTE,
  DELETE_MESSAGE_ENDPOINT_ROUTE,
  MESSAGE_MARK_READ_ENDPOINT_ROUTE,
} from '../shared/routes';

import renderApp from './render-app';

export default (app: Object) => {
  app.get(HOME_PAGE_ROUTE, (req, res) => {
    res.send(renderApp(req.url, homePage()));
  });

  app.get(CHAT_PAGE_ROUTE, (req, res) => {
    res.send(renderApp(req.url, chatPage()));
  });

  app.post(loginEndpointRoute(), (req, res) => {
    loginEndpoint(req.body.data.user, res);
  });

  app.post(PASSWORD_REQUEST_ENDPONT_ROUTE, (req, res) => {
    passwordRequestEndpoint(req.body.user, res);
  });

  app.post(PASSWORD_RESET_ENDPONT_ROUTE, (req, res) => {
    passwordResetEndpoint(req.body.user, res);
  });

  app.post(CREATE_USER_ENDPONT_ROUTE, (req, res) => {
    createUserEndpoint(req.body.user, res);
  });

  app.post(FETCH_REQUESTS_ENDPOINT_ROUTE, (req, res) => {
    // async redis call, result needs to be sent from the callback
    requestsEndpoint(req.body.center, req.body.radius, res);
  });

  app.post(FETCH_REQUEST_DATA_ENDPOINT_ROUTE, (req, res) => {
    // async redis call, result needs to be sent from the callback
    requestDataEndpoint(req.body.requestId, res);
  });

  app.post(FETCH_REQUEST_DISTANCE_ENDPOINT_ROUTE, (req, res) => {
    // async redis call, result needs to be sent from the callback
    requestDistanceEndpoint(req.body.location1, req.body.location2, res);
  });

  app.post(FETCH_REQUEST_ACTIVE_COUNT_ROUTE, (req, res) => {
    // async redis call, result needs to be sent from the callback
    requestActiveCountEndpoint(res);
  });

  app.post(FETCH_REQUEST_FULFILLED_COUNT_ROUTE, (req, res) => {
    // async redis call, result needs to be sent from the callback
    requestFulfilledCountEndpoint(res);
  });

  app.post(FETCH_MEMBER_COUNT_ROUTE, (req, res) => {
    // async redis call, result needs to be sent from the callback
    memberCountEndpoint(res);
  });

  app.post(SEND_MESSAGE_ENDPONT_ROUTE, (req, res) => {
    sendMessageEndpoint(req.body.request, res);
  });

  app.post(FETCH_INBOX_ENDPOINT_ROUTE, (req, res) => {
    FetchInboxEndpoint(req.body.request, res);
  });

  app.post(DELETE_MESSAGE_ENDPOINT_ROUTE, (req, res) => {
    DeleteMessageEndpoint(req.body.request, res);
  });

  app.post(MESSAGE_MARK_READ_ENDPOINT_ROUTE, (req, res) => {
    MarkReadMessageEndpoint(req.body.request, res);
  });

  app.get('/500', () => {
    throw Error('Fake Internal Server Error');
  });

  app.get('*', (req, res) => {
    res.status(404).send(renderApp(req.url));
  });

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    // eslint-disable-next-line no-console
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });
};
