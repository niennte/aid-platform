import { createAction } from 'redux-actions';

export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

const setVisibilityFilter = createAction(SET_VISIBILITY_FILTER);

export default setVisibilityFilter;
