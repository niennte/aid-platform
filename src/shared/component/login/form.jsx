// @flow

import React from 'react';
import { connect } from 'react-redux';

import { loginUser } from '../../action/index';

type Props = {
  dispatch: Function,
};

const LoginForm = ({ dispatch }: Props) => {
  let input;
  return (
    <div>
      <input ref={(node) => { input = node; }} />
      <button
        type="button"
        onClick={() => {
          dispatch(loginUser(input.value));
          input.value = '';
        }}
      >
        Login
      </button>
    </div>
  );
};

export default connect()(LoginForm);
