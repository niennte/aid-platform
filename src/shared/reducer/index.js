import { combineReducers } from 'redux';

import chat from './chat';
import user from './user';
import interlocutor from './interlocutor';


const reducers = combineReducers({
  chat,
  user,
  interlocutor,
});

export default reducers;
