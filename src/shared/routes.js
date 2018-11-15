// @flow

// React Routes (some rendered server side)
export const HOME_PAGE_ROUTE = '/';
export const CHAT_PAGE_ROUTE = '/chat';
export const MAP_PAGE_ROUTE = '/map';
export const REQUEST_PAGE_ROUTE = '/request';
export const REQUEST_SHOW_PAGE_ROUTE = '/request/:id';
export const MESSAGE_PAGE_ROUTE = '/message';
export const MESSAGE_SHOW_PAGE_ROUTE = '/message/:id';
export const LOGIN_PAGE_ROUTE = '/login';
export const REGISTER_PAGE_ROUTE = '/register';
export const PASSWORD_REQUEST_PAGE_ROUTE = '/password/request';
export const PASSWORD_RESET_PAGE_ROUTE = '/password/edit';

// Node endpoints
export const FETCH_REQUESTS_ENDPOINT_ROUTE = '/ajax/requests/locations';
export const FETCH_REQUEST_DATA_ENDPOINT_ROUTE = '/ajax/requests/data';
export const FETCH_REQUEST_DISTANCE_ENDPOINT_ROUTE = '/ajax/requests/distance';
export const FETCH_REQUEST_ACTIVE_COUNT_ROUTE = '/ajax/requests/active-count';
export const FETCH_REQUEST_FULFILLED_COUNT_ROUTE = '/ajax/requests/fulfilled-count';
export const FETCH_MEMBER_COUNT_ROUTE = '/ajax/requests/member-count';

export const loginEndpointRoute = (userName: ?string) => `/ajax/login/${userName || ':userName'}`;
export const PASSWORD_REQUEST_ENDPONT_ROUTE = '/password-request';
export const PASSWORD_RESET_ENDPONT_ROUTE = '/password-reset';
export const CREATE_USER_ENDPONT_ROUTE = '/create-user';

// REST API
export const remoteRest = {
  protocol: 'https',
  host: 'peaceful-river-58348.herokuapp.com',
  services: {
    auth: {
      path: '/',
      login: 'login',
      signup: 'signup',
      password: 'password',
    },
  },
};

export const remoteRestURL = (service, resource) => (
  `${
    remoteRest.protocol
  }://${
    remoteRest.host
  }${
    remoteRest.services[service].path
  }${
    remoteRest.services[service][resource]
  }`
);
