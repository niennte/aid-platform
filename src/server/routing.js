// @flow

// - deal with requests and responses.
// - calls to business logic externalized to the controller
// - using * as the route on the server leaves handling to React Router.

import {
  homePage,
  chatPage,
  loginEndpoint,
} from './controller';

import {
  HOME_PAGE_ROUTE,
  CHAT_PAGE_ROUTE,
  loginEndpointRoute,
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
    res.json(loginEndpoint(req.body.userName));
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
