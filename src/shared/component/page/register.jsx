// @flow

import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

// import LoginForm from '../login/form';
import RegisterView from '../register/view';
import { MAP_PAGE_ROUTE } from '../../routes';

const title = 'User login';

type Props = {
  loggedIn: boolean,
};

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
});

const RegisterPage = ({ loggedIn }: Props) => (
  loggedIn ? (
    <Redirect to={MAP_PAGE_ROUTE} />
  ) : (
    <Fragment>
      <Helmet
        title={title}
        meta={[
          { name: 'description', content: 'A page to say hello' },
          { property: 'og:title', content: title },
        ]}
      />
      <RegisterView />
    </Fragment>
  )
);

export default (connect(mapStateToProps)(RegisterPage));
