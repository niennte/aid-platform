import { combineReducers } from 'redux';

import chat from './chat';
import user from './user';
import interlocutor from './interlocutor';
import requests from './requests';
import requestData from './request-data';


const reducers = combineReducers({
  chat,
  user,
  interlocutor,
  requests,
  requestData,
});

export default reducers;
