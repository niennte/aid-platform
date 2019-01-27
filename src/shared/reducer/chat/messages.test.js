import DeepFreeze from 'deep-freeze';
import chatMessages from './messages';

const initialState = DeepFreeze([]);

const sampleState = DeepFreeze([
  {
    message: 'hello',
    userName: 'user1',
    id: 0,
    wsId: 'qwerty',
  },
]);

const sampleMessage = DeepFreeze({
  message: 'hi',
  userName: 'user2',
  id: 1,
  wsId: '][poiu',
});

test('Should APP/CHAT/ADD_MESSAGE', () => {
  expect(
    chatMessages(sampleState, {
      type: 'APP/CHAT/ADD_MESSAGE',
      payload: sampleMessage,
    }, sampleMessage.id)[sampleState.length],
  ).toEqual(sampleMessage);
});

test('Should handle unknown', () => {
  expect(
    chatMessages(sampleState, { type: 'UNKNOWN' }),
  ).toEqual(sampleState);
});

test('Should handle undefined', () => {
  expect(
    chatMessages(undefined, {}),
  ).toEqual(initialState);
});
