// @flow

const messageOutbox = (
  state: Array<Object> = [],
  action: { type: string, payload: any },
) => {
  switch (action.type) {
    case 'APP/MESSAGE/OUTBOX/LIST':
      return action.payload;
    default:
      return state;
  }
};

export default messageOutbox;
