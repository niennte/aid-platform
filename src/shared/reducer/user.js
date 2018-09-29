// @flow

const user = (
  state: {
    loggedIn: boolean,
    id: string,
    userName: string,
  } = {
    loggedIn: false,
    id: '',
    userName: '',
  },
  action: { type: string, payload: any },
) => {
  switch (action.type) {
    case 'APP/CHAT/USER':
      return Object.assign({}, state, {
        id: action.payload.id,
      });
    case 'APP/USER/LOGIN/SUCCESS':
      return Object.assign({}, state, action.payload);
    case 'APP/USER/LOGOUT':
      return Object.assign({}, state, {
        loggedIn: false,
        userName: '',
      });
    default:
      return state;
  }
};

export default user;
