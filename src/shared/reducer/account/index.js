// @flow

const account = (
  state: {
    fist_name: string,
    last_name: string,
    pic: any,
  } = {
    fist_name: '',
    last_name: '',
    pic: null,
  },
  action: { type: string, payload: any },
) => {
  switch (action.type) {
    case 'APP/ACCOUNT/SUCCESS':
      return action.payload;
    default:
      return state;
  }
};

export default account;
