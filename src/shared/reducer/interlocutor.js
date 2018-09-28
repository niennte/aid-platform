// @flow

const interlocutor = (
  state: string = {
    user: {
      userName: '',
      id: '',
      isTyping: false,
    },
  },
  action: { type: string, payload: any },
) => {
  switch (action.type) {
    case 'APP/CHAT/INTERLOCUTOR_TYPING':
      return {
        user: action.payload.user,
        userName: action.payload.userName,
        status: action.payload.status,
      };
    default:
      return state;
  }
};

export default interlocutor;
