import DeepFreeze from 'deep-freeze';
import chatRooms from './rooms';

const initialState = DeepFreeze({});

const sampleState = DeepFreeze({
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

const sampleNewRoom = DeepFreeze({
  interlocutor: {
    userName: 'user5',
    wsId: 'qwerty5',
    isTyping: false,
  },
  messages: [],
});

test('Should APP/CHAT/ROOM/INITIATE', () => {
  expect(
    chatRooms(sampleState, {
      type: 'APP/CHAT/ROOM/INITIATE',
      payload: {
        room: sampleNewRoomName,
        interlocutor: {
          userName: 'user5',
          wsId: 'qwerty5',
          isTyping: false,
        },
      },
    })[sampleNewRoomName],
  ).toEqual(sampleNewRoom);
});

test('Should APP/CHAT/ROOM/DESTROY', () => {
  expect(
    Object.keys(
      chatRooms(sampleState, {
        type: 'APP/CHAT/ROOM/DESTROY',
        payload: {
          room: Object.keys(sampleState)[0],
        },
      }),
    ).length,
  ).toBe(Object.keys(sampleState).length - 1);
});

test('Should APP/CHAT/ROOM/DESTROY correct room', () => {
  expect(
    chatRooms(sampleState, {
      type: 'APP/CHAT/ROOM/DESTROY',
      payload: {
        room: Object.keys(sampleState)[0],
      },
    })[Object.keys(sampleState)[0]],
  ).toBe(undefined);
});

test('Should handle unknown', () => {
  expect(
    chatRooms(sampleState, { type: 'UNKNOWN' }),
  ).toEqual(sampleState);
});

test('Should handle undefined', () => {
  expect(
    chatRooms(undefined, {}),
  ).toEqual(initialState);
});
