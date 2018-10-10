// @flow

const chats = (state: {
  activeRoom: string,
  pendingInvitation: {
    userName: string,
    room: string,
  },
  rooms: Array<Object>
} = {
  activeRoom: null,
  pendingInvitation: null,
  rooms: [],
}, action: any) => {
  switch (action.type) {
    case 'APP/CHAT/INVITATION':
      return Object.assign({}, state, {
        rooms: [...{
          [action.payload.room]: {
            interlocutor: action.payload.userName,
            messages: [],
          },
        }],
        pendingInvitation: {
          userName: action.payload.userName,
          room: action.payload.room,
        },
      });
    case 'APP/CHAT/ROOM/ACTIVATE':
      return Object.assign({}, state, {
        pendingInvitation: null,
        activeRoom: action.payload.room,
      });
    default: return state;
  }
};

export default chats;
