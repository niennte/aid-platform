// @flow

const messageInbox = (
  state: Array<Object> = [],
  action: { type: string, payload: any },
) => {
  switch (action.type) {
    case 'APP/MESSAGE/INBOX/LIST':
      return action.payload;
    case 'APP/MESSAGE/INBOX/DELETE':
      return state.filter(message => (
        message.id !== action.payload
      ));
    default:
      return state;
  }
};

export default messageInbox;
