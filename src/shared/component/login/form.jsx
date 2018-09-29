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
    <form onSubmit={(e) => {
      e.preventDefault();
      dispatch(loginUser(input.value));
      input.value = '';
    }}
    >
      <input ref={(node) => { input = node; }} />
      <button
        type="submit"
      >
        Login
      </button>
    </form>
  );
};

export default connect()(LoginForm);
