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
    default:
      return state;
  }
};

export default errors;
