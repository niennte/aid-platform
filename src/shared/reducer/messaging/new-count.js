// @flow

const countNew = (messages: Array) => (
  messages.filter(msg => (!msg.isRead)).length
);

const messageNewCount = (
  state: number = 0,
  action: { type: string, payload: any },
) => {
  switch (action.type) {
    case 'APP/MESSAGE/INBOX/LIST':
      return countNew(action.payload);
    default:
      return state;
  }
};

export default messageNewCount;
