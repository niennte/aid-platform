// @flow
import emptyError from './empty-error';

const errors = (state: {
  login: Object,
  signup: Object,
  password: Object,
  message: Object,
  request: Object,
  response: Object,
  fulfillment: Object,
} = {
  login: Object.assign({}, emptyError),
  signup: Object.assign({}, emptyError),
  password: Object.assign({}, emptyError),
  message: Object.assign({}, emptyError),
  request: Object.assign({}, emptyError),
  response: Object.assign({}, emptyError),
  fulfillment: Object.assign({}, emptyError),
}, action: any) => {
  switch (action.type) {
    case 'APP/ERRORS/LOGIN/SET':
      return Object.assign({}, state, {
        login: Object.assign({}, emptyError, action.payload, { hasErrors: true }),
      });
    case 'APP/ERRORS/LOGIN/UNSET':
      return Object.assign({}, state, {
        login: Object.assign({}, emptyError),
      });
    default:
      return state;
  }
};

export default errors;
