// @flow

// React Routes (some rendered server side)
export const HOME_PAGE_ROUTE = '/';
export const CHAT_PAGE_ROUTE = '/chat';
export const MAP_PAGE_ROUTE = '/listings';
export const MAP_LISTING_PAGE_ROUTE = '/listings/:id';
export const REQUEST_PAGE_ROUTE = '/request';
export const REQUEST_SHOW_PAGE_ROUTE = '/request/:id';
export const REQUEST_CREATE_PAGE_ROUTE = '/new-request';
export const REQUEST_EDIT_PAGE_ROUTE = '/edit-request';
export const RESPONSE_PAGE_ROUTE = '/response';
export const RESPONSE_SHOW_PAGE_ROUTE = '/response/:id';
export const MESSAGE_PAGE_ROUTE = '/inbox';
export const MESSAGE_SHOW_PAGE_ROUTE = '/inbox/:id';
export const MESSAGE_OUTBOX_PAGE_ROUTE = '/outbox';
export const MESSAGE_CREATE_PAGE_ROUTE = '/new-message';
export const MESSAGE_OUTBOX_SHOW_PAGE_ROUTE = '/outbox/:id';
export const LOGIN_PAGE_ROUTE = '/login';
export const REGISTER_PAGE_ROUTE = '/register';
export const PASSWORD_REQUEST_PAGE_ROUTE = '/password/request';
export const PASSWORD_RESET_PAGE_ROUTE = '/password/edit';

// Node endpoints
// Counters
export const FETCH_REQUESTS_ENDPOINT_ROUTE = '/ajax/requests/locations';
export const FETCH_REQUEST_DATA_ENDPOINT_ROUTE = '/ajax/requests/data';
export const FETCH_REQUEST_DISTANCE_ENDPOINT_ROUTE = '/ajax/requests/distance';
export const FETCH_REQUEST_ACTIVE_COUNT_ROUTE = '/ajax/requests/active-count';
export const FETCH_REQUEST_FULFILLED_COUNT_ROUTE = '/ajax/requests/fulfilled-count';
export const FETCH_RESPONSE_COUNT_ROUTE = '/ajax/response-count';
export const FETCH_MEMBER_COUNT_ROUTE = '/ajax/member-count';
// REST services
export const loginEndpointRoute = (userName: ?string) => `/ajax/login/${userName || ':userName'}`;
export const PASSWORD_REQUEST_ENDPONT_ROUTE = '/password-request';
export const PASSWORD_RESET_ENDPONT_ROUTE = '/password-reset';
export const CREATE_USER_ENDPONT_ROUTE = '/create-user';
export const CREATE_API_RESOURCE_ENDPOINT_ROUTE = '/create-api-resource';
export const EDIT_API_RESOURCE_ENDPOINT_ROUTE = '/edit-api-resource';
export const DELETE_API_RESOURCE_ENDPOINT_ROUTE = '/delete-api-resource';
export const FETCH_API_RESOURCE_ENDPOINT_ROUTE = '/fetch-api-resource';
export const DELETE_MESSAGE_ENDPOINT_ROUTE = '/delete-message';
export const MESSAGE_MARK_READ_ENDPOINT_ROUTE = '/mark-read-message';

// REST API helpers
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
    resources: {
      path: '/api/v1/',
      inbox: 'inbox',
      outbox: 'outbox',
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

export const remoteRestURLBase = () => (
  `${
    remoteRest.protocol
  }://${
    remoteRest.host
  }${
    remoteRest.services.resources.path
  }`
);
