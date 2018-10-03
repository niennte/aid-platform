// @flow

const requestData = (
  state: Object = {},
  action: { type: string, payload: any },
) => {
  switch (action.type) {
    case 'APP/REQUEST/DATA/SUCCESS':
      return action.payload;
    case 'APP/REQUEST/DATA/RESET':
      return {
        name: 'loading',
        description: 'loading',
        user: -1,
      };
    default:
      return state;
  }
};

export default requestData;
