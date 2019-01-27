import DeepFreeze from 'deep-freeze';
import chats, { initialState } from './chats';

const chatRooms = DeepFreeze({
  'user1-user2': {
    interlocutor: {
      userName: 'user2',
      wsId: 'qwerty2',
      isTyping: false,
    },
    messages: [
      {
        message: 'hello',
        userName: 'user1',
        id: 1,
      },
      {
        message: 'hello',
        userName: 'user1',
        id: 2,
      },
    ],
  },
  'user1-user3': {
    interlocutor: {
      userName: 'user3',
      wsId: 'qwerty3',
      isTyping: false,
    },
    messages: [
      {
        message: 'hello',
        userName: 'user3',
        id: 1,
      },
      {
        message: 'hello',
        userName: 'user3',
        id: 2,
      },
    ],
  },
});

const sampleNewRoomName = 'user1-user5';

const sampleInterlocutor = DeepFreeze({
  userName: 'user1',
  wsId: 'qwerty1',
  isTyping: false,
});

const sampleState = DeepFreeze({
  activeRoom: Object.keys(chatRooms)[0],
  pendingInvitation: {
    userName: 'test',
    room: Object.keys(chatRooms)[Object.keys(chatRooms).length],
  },
  rooms: chatRooms,
});


test('Should dispatch APP/CHAT/INVITATION', () => {
  const sampleInvite = {
    userName: 'testUser',
    room: 'user1-user2',
    re: 'some test subject',
  };
  expect(
    chats(DeepFreeze({}), {
      type: 'APP/CHAT/INVITATION',
      payload: sampleInvite,
    }),
  ).toEqual({
    pendingInvitation: sampleInvite,
  });
});

test('Should delegate APP/CHAT/ROOM/INITIATE', () => {
  expect(
    Object.keys(chats(sampleState, {
      type: 'APP/CHAT/ROOM/INITIATE',
      payload: {
        room: sampleNewRoomName,
        interlocutor: sampleInterlocutor,
      },
    }).rooms).length,
  ).toBe(Object.keys(sampleState.rooms).length + 1);
});

test('Should delegate APP/CHAT/ROOM/DESTROY', () => {
  expect(
    Object.keys(chats(sampleState, {
      type: 'APP/CHAT/ROOM/DESTROY',
      payload: { room: Object.keys(sampleState.rooms)[0] },
    }).rooms).length,
  ).toBe(Object.keys(sampleState.rooms).length - 1);
});

test('Should reset pending invitation when APP/CHAT/ROOM/DESTROY', () => {
  expect(
    chats(sampleState, {
      type: 'APP/CHAT/ROOM/DESTROY',
      payload: { room: Object.keys(sampleState.rooms)[0] },
    }).pendingInvitation,
  ).toBe(null);
});

test('Should deactivate when APP/CHAT/ROOM/DESTROY', () => {
  expect(
    chats(sampleState, {
      type: 'APP/CHAT/ROOM/DESTROY',
      payload: { room: Object.keys(sampleState.rooms)[0] },
    }).activeRoom,
  ).toBe('');
});

test('Should APP/CHAT/ROOM/ACTIVATE', () => {
  expect(
    chats(sampleState, {
      type: 'APP/CHAT/ROOM/ACTIVATE',
      payload: { room: 'testRoom' },
    }).activeRoom,
  ).toBe('testRoom');
});

test('Should reset pending invitation when APP/CHAT/ROOM/ACTIVATE', () => {
  expect(
    chats(sampleState, {
      type: 'APP/CHAT/ROOM/ACTIVATE',
      payload: { room: 'testRoom' },
    }).pendingInvitation,
  ).toBe(null);
});

test('Should delegate APP/CHAT/ADD_MESSAGE', () => {
  expect(
    chats(sampleState, {
      type: 'APP/CHAT/ADD_MESSAGE',
      payload: {
        room: Object.keys(sampleState.rooms)[0],
        message: 'hi',
        userName: 'test',
        wsId: 'qwerty',
      },
    }).rooms[Object.keys(sampleState.rooms)[0]].messages.length,
  ).toBe(sampleState.rooms[Object.keys(sampleState.rooms)[0]].messages.length + 1);
});

test('Should handle unknown', () => {
  expect(
    chats(sampleState, { type: 'UNKNOWN' }),
  ).toEqual(sampleState);
});

test('Should handle undefined', () => {
  expect(
    chats(undefined, {}),
  ).toEqual(initialState);
});
