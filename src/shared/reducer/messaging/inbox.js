// @flow

const messageInbox = (
  state: Array<Object> = [],
  action: { type: string, payload: any },
) => {
  switch (action.type) {
    case 'APP/MESSAGE/INBOX':
      return action.payload;
    default:
      return state;
  }
};

export default messageInbox;
