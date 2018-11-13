// @flow

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import MessageShow from '../../message/show';
import LoginView from '../../login/view';

const title = 'Manage messages';

type Props = {
  loggedIn: boolean
};

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
});

const MessagePage = ({ loggedIn }: Props) => (
  loggedIn ? (
    <Fragment>
      <Helmet
        title={title}
        meta={[
          { name: 'description', content: 'A page to say hello' },
          { property: 'og:title', content: title },
        ]}
      />
      <MessageShow />
    </Fragment>
  ) : (
    <Fragment>
      <LoginView />
    </Fragment>
  )
);

export default connect(mapStateToProps)(MessagePage);
