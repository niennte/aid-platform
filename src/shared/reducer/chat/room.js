// @flow

import chatMessages from './messages';
import interlocutor from './chat-user';

export const initialState = {
  interlocutor: {},
  messages: [],
};

const chatRoom = (
  state: {
    interlocutor: Object,
    messages: Array<Object>,
  } = initialState,
  action: { type: string, payload: any },
) => {
  switch (action.type) {
    case 'APP/CHAT/ROOM/INITIATE':
      return {
        messages: [],
        interlocutor: interlocutor(undefined, action),
      };
    case 'APP/CHAT/ADD_MESSAGE':
      return Object.assign({}, state, {
        messages: chatMessages(state.messages, action),
      });
    case 'APP/CHAT/INTERLOCUTOR/IS_TYPING':
      return Object.assign({}, state, {
        interlocutor: interlocutor(state.interlocutor, action),
      });
    default:
      return state;
  }
};

export default chatRoom;
