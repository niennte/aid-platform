// @flow

const loading = (state: string = '', action) => {
  switch (action.type) {
    case 'APP/ASYNC/DONE':
      return '';
    case 'APP/ASYNC/REQUEST':
      return action.payload ? action.payload : '';
    default:
      return state;
  }
};

export default loading;
