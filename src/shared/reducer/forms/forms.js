// @flow

const forms = (state: {
  login: Object,
  signup: Object,
  passwordRequest: Object,
  passwordReset: Object,
  message: Object,
  request: Object,
  response: Object,
  fulfillment: Object,
} = {
  login: {
    user: {
      email: '',
      password: '',
    },
  },
  signup: {
    user: {
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
  },
  passwordRequest: { user: {} },
  passwordReset: { user: {} },
  message: {},
  request: {},
  response: {},
  fulfillment: {},
}, action: any) => {
  switch (action.type) {
    case 'APP/ERRORS/LOGIN/SET':
      return Object.assign({}, state, {
        login: Object.assign(
          {},
          state.login,
          action.payload.resource,
        ),
      });
    case 'APP/ERRORS/LOGIN/UNSET':
      return Object.assign({}, state, {
        login: {
          user: {
            email: '',
            password: '',
          },
        },
      });
    case 'APP/ERRORS/SIGNUP/SET':
      return Object.assign({}, state, {
        signup: Object.assign(
          {},
          state.signup,
          action.payload.resource,
        ),
      });
    case 'APP/ERRORS/SIGNUP/UNSET':
      return Object.assign({}, state, {
        signup: {
          user: {
            username: '',
            email: '',
            password: '',
            password_confirmation: '',
          },
        },
      });
    default:
      return state;
  }
};

export default forms;
