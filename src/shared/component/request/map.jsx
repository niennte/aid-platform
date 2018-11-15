// @flow

/* eslint-disable */

import React, { Component } from 'react';
import {
  GoogleApiWrapper, Map,
} from 'google-maps-react';
import Marker from '../map/Marker';

import { requestOwn, requestOwnActive } from '../../data/requests';

const style = {
  width: '100%',
  height: '100%',
};

class RequestMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      request: requestOwnActive,
    }
  }

  onMapClicked = () => {
    console.log('map clicked');
  };

  onOwnLocationClick = () => {
    console.log('location clicked');
  };

  render() {
    const { google } = this.props;
    const { request } = this.state;
    const { location } = request;
    console.log(location);

    return (
      <Map
        centerAroundCurrentLocation={false}
        initialCenter={{ lat: location.lat, lng: location.lng }}
        google={google}
        style={style}
        scrollwheel={false}
        onClick={this.onMapClicked}
        ref={(e) => { this.map = e; }}
        zoom={16}
      >
        <Marker
          name="Your position"
          description="blah"
          position={{ lat: location.lat, lng: location.lng }}
          onClick={this.onOwnLocationClick}
          icon={{
            url: 'https://maps.google.com/mapfiles/kml/paddle/grn-circle.png',
            anchor: new google.maps.Point(32, 32),
            scaledSize: new google.maps.Size(40, 40),
          }}
          shouldRender
        />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBUsD5cRgtghtWNE01dzWvn1NHdZD4Za_I'),
})(RequestMap);