import { createStore } from 'redux';

import reducers from './index';
import user from './user';
import interlocutor from './interlocutor';
import chat from './chat';

const store = createStore(reducers);

// check that initial state of the root reducer matches
// what child reducers return given an empty action
test('match initial state', () => {
  expect(store.getState().user).toEqual(user(undefined, {}));
  expect(store.getState().interlocutor).toEqual(interlocutor(undefined, {}));
  expect(store.getState().chat).toEqual(chat(undefined, {}));
});

// now you can do a similar “smoke test” to check
// that child reducers handle an action
test('delegate an action', () => {
  const action = { type: 'TEST' };
  store.dispatch(action);
  expect(store.getState().user).toEqual(user(undefined, action));
  expect(store.getState().interlocutor).toEqual(interlocutor(undefined, action));
  expect(store.getState().chat).toEqual(chat(undefined, action));
});
