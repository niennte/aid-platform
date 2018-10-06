// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  InfoWindow, Marker, GoogleApiWrapper, Map,
} from 'google-maps-react';
import { computeDistanceBetween } from 'spherical-geometry-js';

// import Map from './map';
import { users } from '../../data/data';
import { fetchRequests as fetchRequestLocations, fetchRequestData, checkOnlineStatus } from '../../action/index';

const style = {
  width: '100%',
  height: '100%',
};

type Props = {
  google: Object,
  dispatch: Function,
  requests: Array<Array>,
  requestData: {
    title: string,
    description: string,
    user: string,
    distance: string,
  },
  usersOnline: any,
};

const mapStateToProps = state => ({
  requests: state.requests,
  requestData: state.requestData,
  usersOnline: state.usersOnline,
});

class MapContainer extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
    };
  }

  componentWillMount() {
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

  componentWillReceiveProps(nextProps) {
    const { dispatch } = nextProps;
    // if user is not listed, publish a message to isOnline?
    // the listener will propagate props
    const user = users[nextProps.requestData.user];
    const userIsInList = user && nextProps.usersOnline[user.userName];
    if (user && !userIsInList) {
      dispatch(checkOnlineStatus(user.userName));
    }
  }


  onMarkerClick = (props, marker) => {
    const { dispatch } = this.props;
    const { currentLocation } = this.state;
    const distance = computeDistanceBetween(
      currentLocation,
      props.position,
    );
    this.setState({
      activeMarker: marker,
      showingInfoWindow: true,
      distance: Math.round(distance),
    });
    dispatch(fetchRequestData(props.requestId));
  };


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
    const { dispatch } = this.props;
    const bounds = this.map.map.getBounds();
    const radius = computeDistanceBetween(
      bounds.getSouthWest(),
      bounds.getNorthEast(),
    ) / 2;
    const center = this.map.map.getCenter();
    dispatch(fetchRequestLocations(center, radius));
  };

  render() {
    const {
      google, requests, usersOnline, requestData,
    } = this.props;
    const {
      activeMarker, showingInfoWindow, currentLocation, distance,
    } = this.state;
    const userName = users[requestData.user] ? users[requestData.user].userName : 'loading';
    const requestDataOnlineStatus = userName && usersOnline[userName];

    return (
      <Map
        centerAroundCurrentLocation
        initialCenter={{ lat: 43.646791, lng: -79.526704 }}
        google={google}
        style={style}
        scrollwheel={false}
        onClick={this.onMapClicked}
        ref={(e) => { this.map = e; }}
        onIdle={this.fetchRequests /* fired when after panning, zooming, first load */}
        zoom={16}
      >
        {
          requests.map(request => (
            <Marker
              key={request[0]}
              title="The marker`s title will appear as a tooltip."
              name={request[0]}
              requestId={request[0]}
              description={request[0]}
              position={{ lat: request[1][1], lng: request[1][0] }}
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
          options={{ maxWidth: 200 }}
          marker={activeMarker}
          visible={showingInfoWindow}
        >
          <div>
            <p className="badge badge-secondary">{`${distance} m away`}</p>
            <h4>{requestData.title}</h4>
            <p>{requestData.description}</p>
            <p>{`User: ${userName}`}</p>
            { requestDataOnlineStatus && (<p>online</p>) }
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

const wrapper = GoogleApiWrapper({
  apiKey: ('AIzaSyBUsD5cRgtghtWNE01dzWvn1NHdZD4Za_I'),
})(MapContainer);

export default connect(mapStateToProps)(wrapper);
