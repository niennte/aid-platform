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
    case 'APP/RESPONSE/OWN/DELETE':
      return Object.assign({}, state, {
        list: state.list.filter(response => (
          parseInt(response.id, 10) !== parseInt(action.payload, 10)
        )),
      });
    default:
      return state;
  }
};

export default responseList;
