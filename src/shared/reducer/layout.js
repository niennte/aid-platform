// @flow

export const initialState = {
  asideOpen: false,
};

const Layout = (state: {
  asideOpen: boolean,
} = initialState, action: any) => {
  switch (action.type) {
    case 'APP/LAYOUT/ASIDE/OPEN':
      return Object.assign({}, state, {
        asideOpen: true,
      });
    case 'APP/LAYOUT/ASIDE/CLOSED':
      return Object.assign({}, state, {
        asideOpen: false,
      });
    default: return state;
  }
};

export default Layout;
