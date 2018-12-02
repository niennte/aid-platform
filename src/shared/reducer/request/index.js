// @flow
import ownList from './own-list';

const ownRequests = (
  state: Object = {
    list: [],
    active: {},
  },
  action: { type: string, payload: any },
) => {
  switch (action.type) {
    case 'APP/REQUEST/OWN/LIST':
      return Object.assign({}, state, {
        list: ownList(undefined, action),
      });
    case 'APP/REQUEST/OWN/DATA':
      return Object.assign({}, state, {
        active: action.payload,
      });
    default:
      return state;
  }
};

export default ownRequests;
