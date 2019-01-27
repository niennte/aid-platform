import DeepFreeze from 'deep-freeze';
import layout, { initialState } from './layout';

const sampleState = DeepFreeze({
  asideOpen: false,
});

test('Should APP/LAYOUT/ASIDE/OPEN', () => {
  expect(
    layout(DeepFreeze({}), {
      type: 'APP/LAYOUT/ASIDE/OPEN',
    }),
  ).toEqual({
    asideOpen: true,
  });
});

test('Should APP/LAYOUT/ASIDE/CLOSED', () => {
  expect(
    layout(DeepFreeze({}), {
      type: 'APP/LAYOUT/ASIDE/CLOSED',
    }),
  ).toEqual({
    asideOpen: false,
  });
});

test('Should handle unknown', () => {
  expect(
    layout(sampleState, { type: 'UNKNOWN' }),
  ).toEqual(sampleState);
});

test('Should handle undefined', () => {
  expect(
    layout(undefined, {}),
  ).toEqual(initialState);
});
