// @flow

import chatRooms from './rooms';

const chats = (state: {
  activeRoom: string,
  pendingInvitation: {
    userName: string,
    room: string,
  },
  rooms: Object
} = {
  activeRoom: null,
  pendingInvitation: null,
  rooms: {},
}, action: any) => {
  switch (action.type) {
    case 'APP/CHAT/INVITATION':
      return Object.assign({}, state, {
        pendingInvitation: {
          userName: action.payload.userName,
          room: action.payload.room,
        },
      });
    case 'APP/CHAT/ROOM/INITIATE':
      return Object.assign({}, state, {
        rooms: chatRooms(state.rooms, action),
      });
    case 'APP/CHAT/ROOM/ACTIVATE':
      return Object.assign({}, state, {
        pendingInvitation: null,
        activeRoom: action.payload.room,
      });
    case 'APP/CHAT/ADD_MESSAGE':
      return Object.assign({}, state, {
        rooms: chatRooms(state.rooms, action),
      });
    case 'APP/CHAT/INTERLOCUTOR/IS_TYPING':
      return Object.assign({}, state, {
        rooms: chatRooms(state.rooms, action),
      });
    default: return state;
  }
};

export default chats;
