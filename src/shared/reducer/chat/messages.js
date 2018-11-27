// @flow

import chatMessage from './message';

const chatMessages = (
  state: Array<Object> = [],
  action: { type: string, payload: any },
) => {
  switch (action.type) {
    case 'APP/CHAT/ADD_MESSAGE':
      return [...state, chatMessage(undefined, action, state.length)];
    default:
      return state;
  }
};

export default chatMessages;
