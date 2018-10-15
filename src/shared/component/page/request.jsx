// @flow

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import LoginForm from '../login/form';

const title = 'Manage your requests';

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
      <p>Requests go here</p>
    </div>
  ) : (
    <Fragment>
      <LoginForm />
    </Fragment>
  )
);

export default connect(mapStateToProps)(ChatPage);