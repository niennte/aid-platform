// @flow

/* eslint-disable max-len */
/*
 ReactDOMServer.renderToString is where the magic happens. React will evaluate our entire shared App, and return a plain string of HTML elements. Provider works the same as on the client, but on the server, we wrap our app inside StaticRouter instead of BrowserRouter. In order to pass the Redux store from the server to the client, we pass it to window.__PRELOADED_STATE__ which is just some arbitrary variable name.
 */
/* eslint-enable max-len */


import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import Helmet from 'react-helmet';
import { SheetsRegistry, JssProvider } from 'react-jss';

import initStore from './init-store';
import App from '../shared/App';
import {
  APP_CONTAINER_CLASS, JSS_SSR_CLASS, STATIC_PATH, WDS_PORT,
} from '../shared/config';
import { isProd } from '../shared/util';

const renderApp = (
  location: string,
  plainPartialState: ?Object,
  routerContext: ?Object = {},
) => {
  const store = initStore(plainPartialState);
  const sheets = new SheetsRegistry();
  const appHtml = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={location} context={routerContext}>
        <JssProvider registry={sheets}>
          <App />
        </JssProvider>
      </StaticRouter>
    </Provider>,
  );

  /*
   pull out data from the <Helmet /> components
   - must come after ReactDOMServer.renderToString()
   */
  const head = Helmet.rewind();

  return `
  <!doctype html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        ${head.title}
        ${head.meta}
        <link rel="stylesheet" href="${STATIC_PATH}/css/main.css">
        <style class="${JSS_SSR_CLASS}" type="text/css">
          ${sheets.toString()}
        </style>
      </head>
      <body>
        <div class="${APP_CONTAINER_CLASS} base-bg">${appHtml}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState())}
        </script>
        <script src="${isProd ? STATIC_PATH : `http://localhost:${WDS_PORT}/dist`}/js/bundle.js"></script>
      </body>
    </html>
  `;
};

export default renderApp;
