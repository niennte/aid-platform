// @flow
import emptyInfo from './empty-info';

const infos = (state: {
  login: Object,
  signup: Object,
  passwordRequest: Object,
  passwordReset: Object,
  message: Object,
  request: Object,
  response: Object,
  fulfillment: Object,
} = {
  login: Object.assign({}, emptyInfo),
  signup: Object.assign({}, emptyInfo),
  passwordRequest: Object.assign({}, emptyInfo),
  passwordReset: Object.assign({}, emptyInfo),
  message: Object.assign({}, emptyInfo),
  request: Object.assign({}, emptyInfo),
  response: Object.assign({}, emptyInfo),
  fulfillment: Object.assign({}, emptyInfo),
}, action: any) => {
  switch (action.type) {
    case 'APP/INFOS/LOGIN/SET':
      return Object.assign({}, state, {
        login: Object.assign({}, emptyInfo, action.payload, { hasInfos: true }),
      });
    case 'APP/INFOS/LOGIN/UNSET':
      return Object.assign({}, state, {
        login: Object.assign({}, emptyInfo),
      });
    case 'APP/INFOS/PASSWORD_REQUEST/SET':
      return Object.assign({}, state, {
        passwordRequest: Object.assign({}, emptyInfo, action.payload, { hasInfos: true }),
      });
    case 'APP/INFOS/PASSWORD_REQUEST/UNSET':
      return Object.assign({}, state, {
        passwordRequest: Object.assign({}, emptyInfo),
      });
    case 'APP/INFOS/PASSWORD_RESET/SET':
      return Object.assign({}, state, {
        passwordReset: Object.assign({}, emptyInfo, action.payload, { hasInfos: true }),
      });
    case 'APP/INFOS/PASSWORD_RESET/UNSET':
      return Object.assign({}, state, {
        passwordReset: Object.assign({}, emptyInfo),
      });
    case 'APP/INFOS/SIGNUP/SET':
      return Object.assign({}, state, {
        signup: Object.assign({}, emptyInfo, action.payload, { hasInfos: true }),
      });
    case 'APP/INFOS/SIGNUP/UNSET':
      return Object.assign({}, state, {
        signup: Object.assign({}, emptyInfo),
      });
    default:
      return state;
  }
};

export default infos;
