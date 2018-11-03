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
import errors from './errors/errors';


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
  errors,
});

export default reducers;
