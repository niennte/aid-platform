// @flow

const requestData = (
  state: Object = {
    title: '',
    description: '',
    user: '',
    distance: '',
  },
  action: { type: string, payload: any },
) => {
  switch (action.type) {
    case 'APP/REQUEST/DATA/SUCCESS':
      return Object.assign({}, state, action.payload);
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
