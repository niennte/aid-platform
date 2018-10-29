// @flow

const requestFulfilledCount = (state: number = 0, action: any) => {
  switch (action.type) {
    case 'APP/REQUEST/COUNT/FULFILLED/FETCH':
      return action.payload.count;
    default:
      return state;
  }
};

export default requestFulfilledCount;
