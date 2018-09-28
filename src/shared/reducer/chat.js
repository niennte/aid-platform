// @flow

const chatMessage = (
  state: Array<Object> = [],
  action: { type: string, payload: any },
) => {
  switch (action.type) {
    case 'APP/CHAT/CONNECT':
      return [...state, {
        message: 'Connecting...',
        id: state.length,
        user: 'connection',
      }];
    case 'APP/CHAT/ADD_MESSAGE':
      return [...state, {
        message: action.payload.message.message,
        userName: action.payload.message.userName,
        id: state.length,
        user: action.payload.user,
      }];
    default:
      return state;
  }
};

export default chatMessage;
