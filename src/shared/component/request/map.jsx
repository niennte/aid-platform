// @flow

import React, { Component } from 'react';
import {
  GoogleApiWrapper, Map,
} from 'google-maps-react';
import Marker from '../map/Marker';
import colorCodeMarkers from '../common/color-code-markers';

const style = {
  width: '100%',
  height: '100%',
};

type Props = {
  request: object,
  google: any,
}

class RequestMap extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      request: props.request,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.state = {
      request: nextProps.request,
    };
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
    return (
      <Map
        centerAroundCurrentLocation={false}
        initialCenter={{ lat: request.location.lat, lng: request.location.lng }}
        center={{ lat: request.location.lat, lng: request.location.lng }}
        google={google}
        style={style}
        scrollwheel={false}
        onClick={this.onMapClicked}
        ref={(e) => { this.map = e; }}
        zoom={12}
      >
        <Marker
          name={request.title}
          description={request.description}
          position={{ lat: request.location.lat, lng: request.location.lng }}
          onClick={this.onOwnLocationClick}
          icon={{
            url: colorCodeMarkers(request.type),
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
