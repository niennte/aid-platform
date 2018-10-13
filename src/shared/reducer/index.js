import { combineReducers } from 'redux';

import layout from './layout';
import chats from './chats';
import user from './user';
import usersOnline from './users-online';
import requests from './requests';
import requestData from './request-data';
import lastError from './last-error';


const reducers = combineReducers({
  layout,
  chats,
  user,
  usersOnline,
  requests,
  requestData,
  lastError,
});

export default reducers;
