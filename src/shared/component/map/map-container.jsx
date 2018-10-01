// @flow

import React from 'react';
import {
  InfoWindow, Marker, GoogleApiWrapper,
} from 'google-maps-react';

import Map from './map';
import { requests1, requests2, requests3 } from '../../data/data';

const style = {
  width: '100%',
  height: '100%',
};

type Props = {
  google: object,
  zoom: ?number,
  initialCenter: ?object,
  centerAroundCurrentLocation: ?boolean,
};

class MapContainer extends React.Component<Props> {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    requests: requests1,
  };

  componentDidMount() {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords = pos.coords;
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
    // this.setState({
    //   requests: requests3,
    // });
    const bounds = this.map.map.getBounds();
    console.log(bounds.b);
    console.log(bounds.f);
    console.log(bounds.f.f);
    const requests = requests3.filter(request => (
      request.position.lat < bounds.f.f
      && request.position.lat > bounds.f.b
      && request.position.lng < bounds.b.f
      && request.position.lng > bounds.b.b
    ));
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
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBUsD5cRgtghtWNE01dzWvn1NHdZD4Za_I'),
})(MapContainer);
