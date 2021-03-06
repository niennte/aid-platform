// @flow

import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import LoginView from '../user/login/form';
import MapContainer from '../map/map-container';

const title = 'Map Page';

type Props = {
  loggedIn: boolean
};

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
});

const MapPage = ({ loggedIn }: Props) => (
  loggedIn ? (
    <div className="map">
      <Helmet
        title={title}
        meta={[
          { name: 'description', content: 'A page to say hello' },
          { property: 'og:title', content: title },
        ]}
      />
      <h2 className="d-none">{title}</h2>
      <MapContainer />
      <div id="respondUI" />
    </div>
  ) : (
    <Fragment>
      <LoginView />
    </Fragment>
  )
);

export default connect(mapStateToProps)(MapPage);
