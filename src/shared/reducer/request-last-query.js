// @flow

/*
 center: {lat: 43.646791, lng: -79.526704}
 radius: 727.5501722165305
 */

const requestGeoLastQuery = (state: {
  center: {lat: number, lng: number},
  radius: number,
} = {
  center: null,
  radius: null,
}, action: any) => {
  switch (action.type) {
    case 'APP/REQUEST/NEARBY/LAST_QUERY':
      return action.payload;
    default:
      return state;
  }
};

export default requestGeoLastQuery;
