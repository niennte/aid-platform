// @flow

const requests = (
  state: Array<Object> = [],
  action: { type: string, payload: any },
) => {
  switch (action.type) {
    case 'APP/REQUEST/NEARBY/SUCCESS':
      return action.payload;
    default:
      return state;
  }
};

export default requests;
