// @flow

const requestActiveCount = (state: number = 0, action: any) => {
  switch (action.type) {
    case 'APP/REQUEST/COUNT/ACTIVE/FETCH':
      return action.payload.count;
    case 'APP/REQUEST/COUNT/ACTIVE/LISTENER':
      return action.payload.count;
    default:
      return state;
  }
};

export default requestActiveCount;
