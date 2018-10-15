import { combineReducers } from 'redux';

import layout from './layout';
import chats from './chats';
import user from './user';
import usersOnline from './users-online';
import userStats from './user-stats';
import requests from './requests';
import requestData from './request-data';
import requestActiveCount from './request-count';
import requestGeoLastQuery from './request-last-query';
import lastError from './last-error';


const reducers = combineReducers({
  layout,
  chats,
  user,
  usersOnline,
  userStats,
  requests,
  requestData,
  requestActiveCount,
  requestGeoLastQuery,
  lastError,
});

export default reducers;
