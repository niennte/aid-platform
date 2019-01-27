// @flow

export const initialState = {
  message: '',
  userName: '',
  id: null,
  wsId: '',
};

const chatMessage = (
  state: {
    message: string,
    userName: string,
    id: number,
    wsId: string,
  } = initialState,
  action: { type: string, payload: any },
  id: number,
) => {
  switch (action.type) {
    case 'APP/CHAT/ADD_MESSAGE':
      return {
        message: action.payload.message,
        userName: action.payload.userName,
        id,
        wsId: action.payload.wsId,
      };
    default:
      return state;
  }
};

export default chatMessage;
