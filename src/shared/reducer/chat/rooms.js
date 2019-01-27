// @flow

import chatRoom from './room';

const chatRooms = (
  state: Array<String, Object> = {},
  action: { type: string, payload: any },
) => {
  switch (action.type) {
    case 'APP/CHAT/ROOM/INITIATE':
      return Object.assign({}, state, {
        [action.payload.room]: chatRoom(undefined, action),
      });
    case 'APP/CHAT/ROOM/DESTROY':
      return Object.assign(
        {},
        Object.keys(state).reduce(
          (result, key) => {
            if (key !== action.payload.room) {
              // eslint-disable-next-line no-param-reassign
              result[key] = state[key];
            }
            return result;
          },
          {},
        ),
      );
    case 'APP/CHAT/ADD_MESSAGE':
      return Object.assign({}, state, {
        [action.payload.room]: chatRoom(state[action.payload.room], action),
      });
    case 'APP/CHAT/INTERLOCUTOR/IS_TYPING':
      return Object.assign({}, state, {
        [action.payload.room]: chatRoom(state[action.payload.room], action),
      });
    default:
      return state;
  }
};

export default chatRooms;
