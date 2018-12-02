import { combineReducers } from 'redux';

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
import requestGeoLastQuery from './request-last-query';
import requestsOwn from './request/index';
import responsesOwn from './response/index';
import lastError from './last-error';
import errors from './errors/errors';
import forms from './forms/forms';
import infos from './infos/infos';
import notifications from './notifications/feedback';
import messaging from './messaging/index';
import loading from './loading';


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
  requestsOwn,
  responsesOwn,
  lastError,
  errors,
  forms,
  infos,
  notifications,
  messaging,
  loading,
});

export default reducers;
