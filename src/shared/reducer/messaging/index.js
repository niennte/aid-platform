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
    case 'APP/MESSAGE/INBOX/LIST':
      return Object.assign({}, state, {
        inbox: inbox(undefined, action),
      });
    case 'APP/MESSAGE/INBOX/DELETE':
      return Object.assign({}, state, {
        inbox: inbox(state.inbox, action),
      });
    case 'APP/MESSAGE/OUTBOX/LIST':
      return Object.assign({}, state, {
        outbox: outbox(undefined, action),
      });
    default:
      return state;
  }
};

export default messaging;
