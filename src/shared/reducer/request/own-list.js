// @flow

const requestOwnList = (
  state: Array<Object> = [],
  action: { type: string, payload: any },
) => {
  switch (action.type) {
    case 'APP/REQUEST/OWN/LIST':
      return action.payload;
    default:
      return state;
  }
};

export default requestOwnList;
