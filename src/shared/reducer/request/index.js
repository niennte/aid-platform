// @flow
import ownList from './own-list';

const ownRequests = (
  state: Object = {
    list: [],
  },
  action: { type: string, payload: any },
) => {
  switch (action.type) {
    case 'APP/REQUEST/OWN/LIST':
      return Object.assign({}, state, {
        list: ownList(undefined, action),
      });
    default:
      return state;
  }
};

export default ownRequests;
