// @flow

import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import PasswordRequestView from '../../user/password/request-form';
import { MAP_PAGE_ROUTE } from '../../../routes';

const title = 'User login';

type Props = {
  loggedIn: boolean,
};

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
});

const PasswordRequestPage = ({ loggedIn }: Props) => (
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
      <PasswordRequestView />
    </Fragment>
  )
);

export default (connect(mapStateToProps)(PasswordRequestPage));
