import { createStore } from 'redux';

import reducers from './index';

import layout from './layout';
import chats from './chat/chats';
import user from './user';
import usersOnline from './users-online';
import userCount from './user-count';
import userStats from './user-stats';
import requests from './requests';
import requestData from './request-data';
import requestActiveCount from './request-count';
import requestFulfilledCount from './request-fulfilled-count';
import responseCount from './response-count';
import requestGeoLastQuery from './request-last-query';
import requestsOwn from './request/index';
import responsesOwn from './response/index';
import lastError from './last-error';
import errors from './errors/errors';
import forms from './forms/forms';
import infos from './infos/infos';
import notifications from './notifications/feedback';
import messaging from './messaging/index';
import account from './account/index';
import loading from './loading';


const store = createStore(reducers);

// check that initial state of the root reducer matches
// what child reducers return given an empty action
test('Should match initial state', () => {
  expect(store.getState().layout).toEqual(layout(undefined, {}));
  expect(store.getState().chats).toEqual(chats(undefined, {}));
  expect(store.getState().user).toEqual(user(undefined, {}));
  expect(store.getState().usersOnline).toEqual(usersOnline(undefined, {}));
  expect(store.getState().userCount).toEqual(userCount(undefined, {}));
  expect(store.getState().userStats).toEqual(userStats(undefined, {}));
  expect(store.getState().requests).toEqual(requests(undefined, {}));
  expect(store.getState().requestData).toEqual(requestData(undefined, {}));
  expect(store.getState().requestActiveCount).toEqual(requestActiveCount(undefined, {}));
  expect(store.getState().requestFulfilledCount).toEqual(requestFulfilledCount(undefined, {}));
  expect(store.getState().responseCount).toEqual(responseCount(undefined, {}));
  expect(store.getState().requestGeoLastQuery).toEqual(requestGeoLastQuery(undefined, {}));
  expect(store.getState().requestsOwn).toEqual(requestsOwn(undefined, {}));
  expect(store.getState().responsesOwn).toEqual(responsesOwn(undefined, {}));
  expect(store.getState().lastError).toEqual(lastError(undefined, {}));
  expect(store.getState().errors).toEqual(errors(undefined, {}));
  expect(store.getState().forms).toEqual(forms(undefined, {}));
  expect(store.getState().infos).toEqual(infos(undefined, {}));
  expect(store.getState().notifications).toEqual(notifications(undefined, {}));
  expect(store.getState().messaging).toEqual(messaging(undefined, {}));
  expect(store.getState().account).toEqual(account(undefined, {}));
  expect(store.getState().loading).toEqual(loading(undefined, {}));
});

// check that child reducers handle an action
test('Should delegate an action', () => {
  const action = { type: 'TEST' };
  store.dispatch(action);
  expect(store.getState().layout).toEqual(layout(undefined, action));
  expect(store.getState().chats).toEqual(chats(undefined, action));
  expect(store.getState().user).toEqual(user(undefined, action));
  expect(store.getState().usersOnline).toEqual(usersOnline(undefined, action));
  expect(store.getState().userCount).toEqual(userCount(undefined, action));
  expect(store.getState().userStats).toEqual(userStats(undefined, action));
  expect(store.getState().requests).toEqual(requests(undefined, action));
  expect(store.getState().requestData).toEqual(requestData(undefined, action));
  expect(store.getState().requestActiveCount).toEqual(requestActiveCount(undefined, action));
  expect(store.getState().requestFulfilledCount).toEqual(requestFulfilledCount(undefined, action));
  expect(store.getState().responseCount).toEqual(responseCount(undefined, action));
  expect(store.getState().requestGeoLastQuery).toEqual(requestGeoLastQuery(undefined, action));
  expect(store.getState().requestsOwn).toEqual(requestsOwn(undefined, action));
  expect(store.getState().responsesOwn).toEqual(responsesOwn(undefined, action));
  expect(store.getState().lastError).toEqual(lastError(undefined, action));
  expect(store.getState().errors).toEqual(errors(undefined, action));
  expect(store.getState().forms).toEqual(forms(undefined, action));
  expect(store.getState().infos).toEqual(infos(undefined, action));
  expect(store.getState().notifications).toEqual(notifications(undefined, action));
  expect(store.getState().messaging).toEqual(messaging(undefined, action));
  expect(store.getState().account).toEqual(account(undefined, action));
  expect(store.getState().loading).toEqual(loading(undefined, action));
});
