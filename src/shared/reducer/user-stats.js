// @flow

const userStats = (state: {
  usersOnline: number,
  visitorsOnline: number,
} = {
  usersOnline: 0,
  visitorsOnline: 0,
}, action) => {
  switch (action.type) {
    case 'APP/USERS/STATS':
      return action.payload;
    default:
      return state;
  }
};

export default userStats;
