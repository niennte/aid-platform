import { combineReducers } from 'redux';

import layout from './layout';
import chat from './chat';
import chats from './chats';
import user from './user';
import usersOnline from './users-online';
import interlocutor from './interlocutor';
import requests from './requests';
import requestData from './request-data';
import lastError from './last-error';


const reducers = combineReducers({
  layout,
  chat,
  chats,
  user,
  usersOnline,
  interlocutor,
  requests,
  requestData,
  lastError,
});

export default reducers;
