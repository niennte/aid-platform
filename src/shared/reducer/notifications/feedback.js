// @flow

const flash = (state: string = '', action: any) => {
  switch (action.type) {
    case 'APP/FLASH/SET':
      return action.payload;
    default: return state;
  }
};

export default flash;
