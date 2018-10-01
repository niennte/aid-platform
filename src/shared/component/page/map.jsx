// @flow

import React from 'react';
import Helmet from 'react-helmet';

import MapContainer from '../map/map-container';

const title = 'Map Page';

const MapPage = () => (
  <div>
    <Helmet
      title={title}
      meta={[
        { name: 'description', content: 'A page to say hello' },
        { property: 'og:title', content: title },
      ]}
    />
    <h2>{title}</h2>
    <MapContainer />
  </div>
);

export default MapPage;
