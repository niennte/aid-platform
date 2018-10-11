// @flow

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import Chat from '../chat/chat';
import LoginForm from '../login/form';

const title = 'Chat Page';

type Props = {
  loggedIn: boolean
};

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
});

const ChatPage = ({ loggedIn }: Props) => (
  loggedIn ? (
    <div>
      <Helmet
        title={title}
        meta={[
          { name: 'description', content: 'A page to say hello' },
          { property: 'og:title', content: title },
        ]}
      />
      <h2>{title}</h2>
      <Chat />
    </div>
  ) : (
    <Fragment>
      <LoginForm />
    </Fragment>
  )
);

export default connect(mapStateToProps)(ChatPage);
