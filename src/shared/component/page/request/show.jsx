// @flow

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import LoginView from '../../login/view';
import RequestShow from '../../request/show';

const title = 'Manage your requests';

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
          { name: 'description', content: 'A page to say hello' },
          { property: 'og:title', content: title },
        ]}
      />
      <RequestShow />
    </div>
  ) : (
    <Fragment>
      <LoginView />
    </Fragment>
  )
);

export default connect(mapStateToProps)(RequestPage);
