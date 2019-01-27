// import fetchMock from 'fetch-mock';
// import configureMockStore from 'redux-mock-store';
// import thunkMiddleware from 'redux-thunk';
//
// import actionCreators, { loginUser } from './index';
//
// import { loginEndpointRoute } from '../routes';
//
// const mockStore = configureMockStore([thunkMiddleware]);
//
// afterEach(() => {
//   fetchMock.restore();
// });
//
// test('Login success', () => {
//   fetchMock.get(loginEndpointRoute(666), { serverMessage: 'Login success' });
//   const store = mockStore();
//   return store.dispatch(loginUser(666))
//     .then(() => {
//       expect(store.getActions()).toEqual([
//         actionCreators.app.async.request(),
//         actionCreators.app.user.login.success({ messageAsync: 'Login success' }),
//       ]);
//     });
// });
//
// test('Login 404', () => {
//   fetchMock.get(loginEndpointRoute(666), 404);
//   const store = mockStore();
//   return store.dispatch(loginUser(666))
//     .then(() => {
//       expect(store.getActions()).toEqual([
//         actionCreators.app.async.request(),
//         actionCreators.app.async.failure(),
//       ]);
//     });
// });
//
// test('Login data error', () => {
//   fetchMock.get(loginEndpointRoute(666), {});
//   const store = mockStore();
//   return store.dispatch(loginUser(666))
//     .then(() => {
//       expect(store.getActions()).toEqual([
//         actionCreators.app.async.request(),
//         actionCreators.app.async.failure(),
//       ]);
//     });
// });
