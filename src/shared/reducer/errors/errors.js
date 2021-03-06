// @flow
import emptyError from './empty-error';

const errors = (state: {
  login: Object,
  signup: Object,
  passwordRequest: Object,
  passwordReset: Object,
  message: Object,
  request: Object,
  response: Object,
  fulfillment: Object,
} = {
  login: Object.assign({}, emptyError),
  signup: Object.assign({}, emptyError),
  passwordRequest: Object.assign({}, emptyError),
  passwordReset: Object.assign({}, emptyError),
  message: Object.assign({}, emptyError),
  request: Object.assign({}, emptyError),
  response: Object.assign({}, emptyError),
  fulfillment: Object.assign({}, emptyError),
  account: Object.assign({}, emptyError),
}, action: any) => {
  switch (action.type) {
    case 'APP/ERRORS/LOGIN/SET':
      return Object.assign({}, state, {
        login: Object.assign(
          {},
          emptyError,
          { hasErrors: true },
          { errorMessage: action.payload.error },
        ),
      });
    case 'APP/ERRORS/LOGIN/UNSET':
      return Object.assign({}, state, {
        login: Object.assign({}, emptyError),
      });
    case 'APP/ERRORS/PASSWORD_REQUEST/SET':
      return Object.assign({}, state, {
        passwordRequest: Object.assign(
          {},
          emptyError,
          { hasErrors: true },
          { errorType: action.payload.code },
          { errors: action.payload.detail.errors },
          { errorMessage: action.payload.detail[action.payload.code] },
        ),
      });
    case 'APP/ERRORS/PASSWORD_REQUEST/UNSET':
      return Object.assign({}, state, {
        passwordRequest: Object.assign({}, emptyError),
      });
    case 'APP/ERRORS/PASSWORD_RESET/SET':
      return Object.assign({}, state, {
        passwordReset: Object.assign(
          {},
          emptyError,
          { hasErrors: true },
          { errorType: action.payload.code },
          { errors: action.payload.detail.errors },
          { errorMessage: action.payload.detail[action.payload.code] },
        ),
      });
    case 'APP/ERRORS/PASSWORD_RESET/UNSET':
      return Object.assign({}, state, {
        passwordReset: Object.assign({}, emptyError),
      });
    case 'APP/ERRORS/SIGNUP/SET':
      return Object.assign({}, state, {
        signup: Object.assign(
          {},
          emptyError,
          { hasErrors: true },
          { errorType: action.payload.code },
          { errors: action.payload.detail.errors },
          { errorMessage: action.payload.detail[action.payload.code] },
        ),
      });
    case 'APP/ERRORS/SIGNUP/UNSET':
      return Object.assign({}, state, {
        signup: Object.assign({}, emptyError),
      });
    case 'APP/ERRORS/MESSAGE/SET':
      return Object.assign({}, state, {
        message: Object.assign(
          {},
          emptyError,
          { hasErrors: true },
          { errorType: action.payload.code },
          { errors: action.payload.detail.errors },
          { errorMessage: action.payload.detail[action.payload.code] },
        ),
      });
    case 'APP/ERRORS/MESSAGE/UNSET':
      return Object.assign({}, state, {
        message: Object.assign({}, emptyError),
      });
    case 'APP/ERRORS/REQUEST/SET':
      return Object.assign({}, state, {
        request: Object.assign(
          {},
          emptyError,
          { hasErrors: true },
          { errorType: action.payload.code },
          { errors: action.payload.detail.errors },
          { errorMessage: action.payload.detail[action.payload.code] },
        ),
      });
    case 'APP/ERRORS/REQUEST/UNSET':
      return Object.assign({}, state, {
        request: Object.assign({}, emptyError),
      });
    case 'APP/ERRORS/RESPONSE/SET':
      return Object.assign({}, state, {
        response: Object.assign(
          {},
          emptyError,
          { hasErrors: true },
          { errorType: action.payload.code },
          { errors: action.payload.detail.errors },
          { errorMessage: action.payload.detail[action.payload.code] },
        ),
      });
    case 'APP/ERRORS/RESPONSE/UNSET':
      return Object.assign({}, state, {
        response: Object.assign({}, emptyError),
      });
    case 'APP/ERRORS/FULFILLMENT/SET':
      return Object.assign({}, state, {
        fulfillment: Object.assign(
          {},
          emptyError,
          { hasErrors: true },
          { errorType: action.payload.code },
          { errors: action.payload.detail.errors },
          { errorMessage: action.payload.detail[action.payload.code] },
        ),
      });
    case 'APP/ERRORS/FULFILLMENT/UNSET':
      return Object.assign({}, state, {
        fulfillment: Object.assign({}, emptyError),
      });
    case 'APP/ERRORS/ACCOUNT/SET':
      return Object.assign({}, state, {
        account: Object.assign(
          {},
          emptyError,
          { hasErrors: true },
          { errorType: action.payload.code },
          { errors: action.payload.detail.errors },
          { errorMessage: action.payload.detail[action.payload.code] },
        ),
      });
    case 'APP/ERRORS/ACCOUNT/UNSET':
      return Object.assign({}, state, {
        account: Object.assign({}, emptyError),
      });
    default:
      return state;
  }
};

export default errors;
