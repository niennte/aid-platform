// @flow

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import LoginView from '../../user/login/form';
import AccountForm from '../../account/create';

const title = 'Manage your account';

type Props = {
  loggedIn: boolean
};

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
});

const AccountCreatePage = ({ loggedIn }: Props) => (
  loggedIn ? (
    <div className="requests">
      <Helmet
        title={title}
        meta={[
          { name: 'description', content: 'View and manage your account' },
          { property: 'og:title', content: title },
        ]}
      />
      <AccountForm />
    </div>
  ) : (
    <Fragment>
      <LoginView />
    </Fragment>
  )
);

export default connect(mapStateToProps)(AccountCreatePage);
