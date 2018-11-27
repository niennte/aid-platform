// @flow
import inbox from './inbox';
import outbox from './outbox';

const messaging = (
  state: Object = {
    inbox: [],
    outbox: [],
  },
  action: { type: string, payload: any },
) => {
  switch (action.type) {
    case 'APP/MESSAGE/INBOX':
      return Object.assign({}, state, {
        inbox: inbox(undefined, action),
      });
    case 'APP/MESSAGE/OUTBOX':
      return Object.assign({}, state, {
        outbox: outbox(undefined, action),
      });
    default:
      return state;
  }
};

export default messaging;
