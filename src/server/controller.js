// @flow

// make business logic and database calls
// passed back results to the routing module to init server-side Redux store

export const homePage = () => null;

export const chatPage = () => ({});

export const loginEndpoint = (userName: string) => ({
  login: {
    userName,
    loggedIn: true,
  },
});
