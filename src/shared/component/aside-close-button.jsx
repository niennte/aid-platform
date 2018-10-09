// @flow

import React from 'react';
import { connect } from 'react-redux';

import actionCreators from '../action/index';

type Props = {
  dispatch: Function,
};

const AsideCloseButton = ({ dispatch }: Props) => (
  <button
    type="button"
    onClick={() => { dispatch(actionCreators.app.layout.aside.closed()); }}
  >
    X!
  </button>
);

export default connect()(AsideCloseButton);
