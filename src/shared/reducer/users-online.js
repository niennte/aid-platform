// @flow

const usersOnline = (
  state: Array<String, String> = [],
  action: { type: string, payload: any },
) => {
  switch (action.type) {
    case 'APP/USERS/ONLINE':
      // whew - dynamically and immutably assign a key value pair
      return Object.assign({}, state, { [action.payload.userName]: action.payload });
    default:
      return state;
  }
};

export default usersOnline;
