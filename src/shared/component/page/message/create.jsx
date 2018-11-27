// @flow

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import MessageForm from '../../message/form';
import LoginView from '../../user/login/form';

const title = 'Send a message';

type Props = {
  loggedIn: boolean
};

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
});

const MessagePage = ({ loggedIn }: Props) => (
  loggedIn ? (
    <div className="messages">
      <Helmet
        title={title}
        meta={[
          { name: 'description', content: 'Sending a new message' },
          { property: 'og:title', content: title },
        ]}
      />
      <MessageForm />
    </div>
  ) : (
    <Fragment>
      <LoginView />
    </Fragment>
  )
);

export default connect(mapStateToProps)(MessagePage);
