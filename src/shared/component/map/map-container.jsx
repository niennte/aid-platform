// @flow

import React from 'react';
import {
  InfoWindow, Marker, GoogleApiWrapper, Map,
} from 'google-maps-react';

// import Map from './map';
import { requests3, users } from '../../data/data';

const style = {
  width: '100%',
  height: '100%',
};

type Props = {
  google: object,
};

class MapContainer extends React.Component<Props> {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    requests: [],
  };

  componentDidMount() {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { coords } = pos;
        this.setState({
          currentLocation: {
            lat: coords.latitude,
            lng: coords.longitude,
          },
        });
      });
    }
  }

  onMarkerClick = (props, marker) => this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true,
  });

  onMapClicked = () => {
    const { showingInfoWindow } = this.state;
    if (showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  fetchRequests = () => {
    const bounds = this.map.map.getBounds();
    console.log(bounds);
    const requests = requests3.filter(request => (
      request.position.lat < bounds.f.f
      && request.position.lat > bounds.f.b
      && request.position.lng < bounds.b.f
      && request.position.lng > bounds.b.b
    ));
    // eslint-disable-next-line no-console
    console.log(requests);
    this.setState({
      requests,
    });
  };

  render() {
    const { google } = this.props;
    const {
      activeMarker, showingInfoWindow, selectedPlace, currentLocation, requests,
    } = this.state;
    const user = users[selectedPlace.user];
    // eslint-disable-next-line no-console
    console.log(selectedPlace);
    return (
      <Map
        centerAroundCurrentLocation
        google={google}
        style={style}
        scrollwheel={false}
        onClick={this.onMapClicked}
        ref={(e) => { this.map = e; }}
        onTilesloaded={this.fetchRequests}
        zoom={16}
      >
        {
          requests.map(request => (
            <Marker
              key={request.id}
              title="The marker`s title will appear as a tooltip."
              name={request.name}
              description={request.description}
              position={request.position}
              user={request.user}
              onClick={this.onMarkerClick}
            />
          ))
        }

        <Marker
          name="Your position"
          description="blah"
          position={currentLocation}
          onClick={this.onMarkerClick}
          icon={{
            url: 'http://maps.google.com/mapfiles/kml/paddle/grn-circle.png',
            anchor: new google.maps.Point(32, 32),
            scaledSize: new google.maps.Size(40, 40),
          }}
        />

        <InfoWindow
          marker={activeMarker}
          visible={showingInfoWindow}
        >
          <div>
            <h1>{selectedPlace.name}</h1>
            <p>{selectedPlace.description}</p>
            <p>{user && `User: ${user.userName}`}</p>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBUsD5cRgtghtWNE01dzWvn1NHdZD4Za_I'),
})(MapContainer);
