import DeepFreeze from 'deep-freeze';
import chatMessage, { initialState } from './message';

const sampleState = DeepFreeze({
  message: 'hello',
  userName: 'user1',
  id: 1,
  wsId: 'qwerty',
});

const sampleMessage = DeepFreeze({
  message: 'hi',
  userName: 'user2',
  id: 2,
  wsId: '][poiu',
});

test('Should APP/CHAT/ADD_MESSAGE', () => {
  expect(
    chatMessage(DeepFreeze({}), {
      type: 'APP/CHAT/ADD_MESSAGE',
      payload: sampleMessage,
    }, sampleMessage.id),
  ).toEqual(sampleMessage);
});

test('Should handle unknown', () => {
  expect(
    chatMessage(sampleState, { type: 'UNKNOWN' }),
  ).toEqual(sampleState);
});

test('Should handle undefined', () => {
  expect(
    chatMessage(undefined, {}),
  ).toEqual(initialState);
});
