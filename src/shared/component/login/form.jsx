// @flow

import React from 'react';
import { connect } from 'react-redux';

import { loginUser } from '../../action/index';

type Props = {
  dispatch: Function,
  wsId: string,
};

const mapStateToProps = state => ({
  wsId: state.user.id,
});

const LoginForm = ({ dispatch, wsId }: Props) => {
  let input;
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      dispatch(loginUser({ userName: input.value, wsId }));
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

export default connect(mapStateToProps)(LoginForm);
