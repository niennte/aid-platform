import DeepFreeze from 'deep-freeze';
import interlocutor, { initialState } from './chat-user';
// import { sampleState } from './rooms';

const sampleState = DeepFreeze({
  userName: 'thisUser',
  wsId: 'qwerty',
  isTyping: false,
});

const interestingStatusChange = DeepFreeze({
  userName: sampleState.userName,
  isTyping: true,
});

const notInterestingStatusChange = DeepFreeze({
  userName: 'someOtherUser',
  isTyping: true,
});

test('Should APP/CHAT/ROOM/INITIATE', () => {
  expect(
    interlocutor(undefined, {
      type: 'APP/CHAT/ROOM/INITIATE',
      payload: {
        interlocutor: {
          userName: 'someUser',
          wsId: 'qwerty',
        },
      },
    }),
  ).toEqual({
    userName: 'someUser',
    wsId: 'qwerty',
    isTyping: false,
  });
});

test('Should set APP/CHAT/INTERLOCUTOR/IS_TYPING', () => {
  expect(
    interlocutor(sampleState, {
      type: 'APP/CHAT/INTERLOCUTOR/IS_TYPING',
      payload: interestingStatusChange,
    }).isTyping,
  ).toEqual(interestingStatusChange.isTyping);
});

test('Should set APP/CHAT/INTERLOCUTOR/IS_TYPING for accurate user', () => {
  expect(
    interlocutor(sampleState, {
      type: 'APP/CHAT/INTERLOCUTOR/IS_TYPING',
      payload: notInterestingStatusChange,
    }),
  ).toEqual(sampleState);
});

test('Should handle unknown', () => {
  expect(
    interlocutor(sampleState, { type: 'UNKNOWN' }),
  ).toEqual(sampleState);
});

test('Should handle undefined', () => {
  expect(
    interlocutor(undefined, {}),
  ).toEqual(initialState);
});
