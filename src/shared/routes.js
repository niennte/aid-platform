// @flow

export const HOME_PAGE_ROUTE = '/';
export const CHAT_PAGE_ROUTE = '/chat';
export const MAP_PAGE_ROUTE = '/map';
export const FETCH_REQUESTS_ENDPOINT_ROUTE = '/ajax/requests/locations';
export const FETCH_REQUEST_DATA_ENDPOINT_ROUTE = '/ajax/requests/data';
export const FETCH_REQUEST_DISTANCE_ENDPOINT_ROUTE = '/ajax/requests/distance';

export const loginEndpointRoute = (userName: ?string) => `/ajax/login/${userName || ':userName'}`;
