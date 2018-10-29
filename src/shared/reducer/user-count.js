// @flow

const userCount = (state: number = 0, action: any) => {
  switch (action.type) {
    case 'APP/USERS/COUNT':
      return action.payload.count;
    default:
      return state;
  }
};

export default userCount;
