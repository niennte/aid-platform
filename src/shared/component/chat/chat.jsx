// @flow

import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import ChatMessages from './messages';
import ChatForm from './form';
import LoginForm from '../login/form';

type Props = {
  loggedIn: boolean
};

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
});

const Chat = ({ loggedIn }: Props) => (
  <Fragment>
    { loggedIn ? (
      <Fragment>
        <ChatMessages />
        <ChatForm />
      </Fragment>
    ) : (
      <Fragment>
        <LoginForm />
      </Fragment>
    ) }
  </Fragment>
);

export default connect(mapStateToProps)(Chat);
