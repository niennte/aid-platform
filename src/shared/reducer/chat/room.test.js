import DeepFreeze from 'deep-freeze';
import chatRoom, { initialState } from './room';

const sampleState = DeepFreeze({
  interlocutor: {
    userName: 'user1',
    wsId: 'qwerty',
    isTyping: false,
  },
  messages: [
    {
      message: 'hello',
      userName: 'user1',
      id: 0,
      wsId: 'qwerty1',
    },
  ],
});

const sampleInterlocutor = DeepFreeze({
  userName: 'user1',
  wsId: 'qwerty1',
  isTyping: false,
});

const sampleMessage = DeepFreeze({
  message: 'hi',
  userName: 'user2',
  id: 1,
  wsId: '][poiu',
});

const interlocutorStatusChange = DeepFreeze({
  userName: sampleState.interlocutor.userName,
  isTyping: true,
});

test('Should APP/CHAT/ROOM/INITIATE', () => {
  expect(
    chatRoom(undefined, {
      type: 'APP/CHAT/ROOM/INITIATE',
      payload: { interlocutor: sampleInterlocutor },
    }),
  ).toEqual({
    messages: [],
    interlocutor: sampleInterlocutor,
  });
});

test('Should APP/CHAT/ADD_MESSAGE', () => {
  expect(
    chatRoom(sampleState, {
      type: 'APP/CHAT/ADD_MESSAGE',
      payload: sampleMessage,
    }).messages[sampleState.messages.length],
  ).toEqual(sampleMessage);
});

test('Should APP/CHAT/INTERLOCUTOR/IS_TYPING', () => {
  expect(
    chatRoom(sampleState, {
      type: 'APP/CHAT/INTERLOCUTOR/IS_TYPING',
      payload: interlocutorStatusChange,
    }).interlocutor.isTyping,
  ).toBe(interlocutorStatusChange.isTyping);
});

test('Should handle unknown', () => {
  expect(
    chatRoom(sampleState, { type: 'UNKNOWN' }),
  ).toEqual(sampleState);
});

test('Should handle undefined', () => {
  expect(
    chatRoom(undefined, {}),
  ).toEqual(initialState);
});
