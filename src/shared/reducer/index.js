import { combineReducers } from 'redux';

import layout from './layout';
import chats from './chats';
import user from './user';
import usersOnline from './users-online';
import userCount from './user-count';
import userStats from './user-stats';
import requests from './requests';
import requestData from './request-data';
import requestActiveCount from './request-count';
import requestFulfilledCount from './request-fulfilled-count';
import requestGeoLastQuery from './request-last-query';
import lastError from './last-error';


const reducers = combineReducers({
  layout,
  chats,
  user,
  usersOnline,
  userCount,
  userStats,
  requests,
  requestData,
  requestActiveCount,
  requestFulfilledCount,
  requestGeoLastQuery,
  lastError,
});

export default reducers;
