// @flow

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import LoginForm from '../login/form';
import MessageView from '../message/view';

const title = 'Manage messages';

type Props = {
  loggedIn: boolean
};

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
});

const MessagePage = ({ loggedIn }: Props) => (
  loggedIn ? (
    <div>
      <Helmet
        title={title}
        meta={[
          { name: 'description', content: 'A page to say hello' },
          { property: 'og:title', content: title },
        ]}
      />
      <MessageView />
    </div>
  ) : (
    <Fragment>
      <LoginForm />
    </Fragment>
  )
);

export default connect(mapStateToProps)(MessagePage);
