// @flow

const responseCount = (state: number = 0, action: any) => {
  switch (action.type) {
    case 'APP/RESPONSE/COUNT/FETCH':
      return action.payload.count;
    default:
      return state;
  }
};

export default responseCount;
