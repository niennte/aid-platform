// @flow

const lastError = (
  state: Array<string> = [],
  action: { type: string, payload: any },
) => {
  switch (action.type) {
    case 'APP/ASYNC/FAILURE':
      return [...action.payload];
    default:
      return state;
  }
};

export default lastError;
