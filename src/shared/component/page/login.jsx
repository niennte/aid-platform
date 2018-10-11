// @flow

import React, { Fragment } from 'react';
import Helmet from 'react-helmet';

import LoginForm from '../login/form';

const title = 'User login';

const LoginPage = () => (
  <Fragment>
    <Helmet
      title={title}
      meta={[
        { name: 'description', content: 'A page to say hello' },
        { property: 'og:title', content: title },
      ]}
    />
    <h2>{title}</h2>
    <LoginForm />
  </Fragment>
);

export default LoginPage;
