// @flow

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import RequestForm from '../../request/form';
import LoginView from '../../user/login/form';

const title = 'Create a request';

type Props = {
  loggedIn: boolean
};

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
});

const RequestPage = ({ loggedIn }: Props) => (
  loggedIn ? (
    <div className="requests">
      <Helmet
        title={title}
        meta={[
          { name: 'description', content: 'Creating a new request' },
          { property: 'og:title', content: title },
        ]}
      />
      <RequestForm />
    </div>
  ) : (
    <Fragment>
      <LoginView />
    </Fragment>
  )
);

export default connect(mapStateToProps)(RequestPage);
