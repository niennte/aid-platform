// @flow

const usersOnline = (
  state: Array<String, String> = {},
  action: { type: string, payload: any },
) => {
  switch (action.type) {
    case 'APP/USERS/ONLINE':
      // whew - dynamically and immutably assign a key value pair
      return Object.assign({}, state, { [action.payload.userName]: action.payload });
    case 'APP/USERS/OFFLINE':
      // immutably remove an object key
      return Object.assign(
        {},
        Object.keys(state).reduce(
          (result, key) => {
            if (key !== action.payload) {
              // eslint-disable-next-line no-param-reassign
              result[key] = state[key];
            }
            return result;
          },
          {},
        ),
      );
    default:
      return state;
  }
};

export default usersOnline;
