// @flow

export const HOME_PAGE_ROUTE = '/';
export const CHAT_PAGE_ROUTE = '/chat';

export const loginEndpointRoute = (userName: ?string) => `/ajax/login/${userName || ':userName'}`;
