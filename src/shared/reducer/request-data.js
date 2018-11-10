// @flow

const requestData = (
  state: Object = {
    id: '',
    title: '',
    description: '',
    userId: '',
    userName: '',
    isOnline: false,
    distance: '',
  },
  action: { type: string, payload: any },
) => {
  switch (action.type) {
    case 'APP/REQUEST/DATA/SUCCESS':
      return Object.assign({}, action.payload);
    case 'APP/REQUEST/DATA/ONLINE/TRUE':
      if (action.payload.userName === state.userName) {
        return Object.assign({}, state, { isOnline: true });
      }
      return state;
    case 'APP/REQUEST/DATA/ONLINE/FALSE':
      if (action.payload === state.userName) {
        return Object.assign({}, state, { isOnline: false });
      }
      return state;
    case 'APP/REQUEST/DATA/RESET':
      return Object.assign({}, state, {
        title: 'loading',
        description: 'loading',
        user: 'loading',
      });
    case 'APP/REQUEST/DISTANCE/RESET':
      return Object.assign({}, state, {
        distance: 'loading',
      });
    case 'APP/REQUEST/DISTANCE/SUCCESS':
      return Object.assign({}, state, {
        distance: action.payload,
      });
    default:
      return state;
  }
};

export default requestData;
