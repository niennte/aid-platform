// @flow

export const HOME_PAGE_ROUTE = '/';
export const CHAT_PAGE_ROUTE = '/chat';
export const MAP_PAGE_ROUTE = '/map';
export const REQUEST_PAGE_ROUTE = '/request';
export const MESSAGE_PAGE_ROUTE = '/message';
export const LOGIN_PAGE_ROUTE = '/login';
export const REGISTER_PAGE_ROUTE = '/register';
export const FETCH_REQUESTS_ENDPOINT_ROUTE = '/ajax/requests/locations';
export const FETCH_REQUEST_DATA_ENDPOINT_ROUTE = '/ajax/requests/data';
export const FETCH_REQUEST_DISTANCE_ENDPOINT_ROUTE = '/ajax/requests/distance';
export const FETCH_REQUEST_ACTIVE_COUNT_ROUTE = '/ajax/requests/active-count';

export const loginEndpointRoute = (userName: ?string) => `/ajax/login/${userName || ':userName'}`;
