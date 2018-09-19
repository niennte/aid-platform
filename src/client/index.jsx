/* eslint-disable global-require */
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore, combineReducers} from 'redux';

import App from './App';
import helloReducer from './reducer/hello';
import { APP_CONTAINER_SELECTOR } from '../shared/config';
import { isProd } from '../shared/util';

const store = createStore(
  combineReducers({ hello: helloReducer }),
  // eslint-disable-next-line no-underscore-dangle
  isProd ? undefined : window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const rootEl = document.querySelector(APP_CONTAINER_SELECTOR);

const wrapApp = (AppComponent, reduxStore) => (
  <Provider store={reduxStore}>
    <AppContainer>
      <AppComponent />
    </AppContainer>
  </Provider>
);

ReactDOM.render(wrapApp(App, store), rootEl);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    ReactDOM.render(wrapApp(NextApp), rootEl);
  });
}
