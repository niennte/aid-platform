// @flow

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import LoginView from '../../user/login/form';
import ResponseShow from '../../response/show';

const title = 'Manage your requests';

type Props = {
  loggedIn: boolean
};

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
});

const ResponsePage = ({ loggedIn }: Props) => (
  loggedIn ? (
    <div className="requests">
      <Helmet
        title={title}
        meta={[
          { name: 'description', content: 'A page to say hello' },
          { property: 'og:title', content: title },
        ]}
      />
      <ResponseShow />
    </div>
  ) : (
    <Fragment>
      <LoginView />
    </Fragment>
  )
);

export default connect(mapStateToProps)(ResponsePage);
