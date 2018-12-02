// @flow

const responseList = (
  state: Object = {
    list: [],
  },
  action: { type: string, payload: any },
) => {
  switch (action.type) {
    case 'APP/RESPONSE/OWN/LIST':
      return Object.assign({}, state, {
        list: action.payload,
      });
    default:
      return state;
  }
};

export default responseList;
