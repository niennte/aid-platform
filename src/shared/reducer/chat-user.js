// @flow

const interlocutor = (
  state: {
    userName: string,
    wsId: string,
    isTyping: boolean,
  } = {
    userName: '',
    wsId: '',
    isTyping: false,
  },
  action: { type: string, payload: any },
) => {
  switch (action.type) {
    case 'APP/CHAT/ROOM/INITIATE':
      return Object.assign({}, state, {
        userName: action.payload.interlocutor.userName,
        wsId: action.payload.interlocutor.wsId,
      });
    case 'APP/CHAT/INTERLOCUTOR/IS_TYPING':
      // make sure the user who is typing is interesting
      if (action.payload.userName === state.userName) {
        return Object.assign({}, state, {
          isTyping: action.payload.isTyping,
        });
      }
      return state; // no change; it's a user from another room
    default:
      return state;
  }
};

export default interlocutor;
