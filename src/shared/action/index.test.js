import actionCreators from './index';

test('actionCreators.app.layout.aside.open', () => {
  expect(actionCreators.app.layout.aside.open()).toEqual({
    type: 'APP/LAYOUT/ASIDE/OPEN',
  });
});

test('actionCreators.app.chat.interlocutor.isTyping', () => {
  expect(actionCreators.app.chat.interlocutor.isTyping({
    isTyping: true,
    wsId: 'qwerty1',
    userName: 'user1',
    room: 'user1-user2',
  })).toEqual({
    type: 'APP/CHAT/INTERLOCUTOR/IS_TYPING',
    payload: {
      isTyping: true,
      wsId: 'qwerty1',
      userName: 'user1',
      room: 'user1-user2',
    },
  });
});
