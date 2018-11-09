// @flow

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {
  InfoWindow, Marker, GoogleApiWrapper, Map,
} from 'google-maps-react';
import { computeDistanceBetween } from 'spherical-geometry-js';

import actionCreators, {
  fetchRequests as fetchRequestLocations, fetchRequestData, sendChatInvite,
} from '../../action/index';


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
    userName: string,
  },
  userName: string,
};

const mapStateToProps = state => ({
  requests: state.requests,
  requestData: state.requestData,
  userName: state.user.userName,
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

  onMarkerClick = (props, marker) => {
    const { dispatch } = this.props;
    const { currentLocation } = this.state;
    const distance = currentLocation && props && props.position ? computeDistanceBetween(
      currentLocation,
      props.position,
    ) : 'calculating';
    this.setState({
      activeMarker: marker,
      showingInfoWindow: true,
      distance: Math.round(distance),
    });
    dispatch(fetchRequestData(props.requestId));
  };

  onOwnLocationClick = (props, marker) => {
    const { dispatch, userName } = this.props;
    this.setState({
      activeMarker: marker,
      showingInfoWindow: true,
      distance: null,
    });
    dispatch(actionCreators.app.request.data.success({
      lng: '-79.529914',
      address: '',
      type: 'own-location',
      country: '',
      lat: '43.646853',
      userName,
      title: 'That\'s where we think you are',
      userId: '',
      city: '',
      postalCode: '',
      description: `
        Your location is not visible to other users.\n
        It is used to calculate relative distances and offer directions.\n
        [Change location]
    `,
      isOnline: true,
    }));
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

  onInfoWindowOpen = () => {
    const target = document.getElementById('iwc');
    if (target) {
      const chatLink = (
        <button
          type="button"
          onClick={() => {
            this.chatLinkClickHandler();
          }}
        >
          Chat
        </button>
      );
      // InfoWindow renders into its own scope,
      // for handlers to work, need to re-render
      ReactDOM.render(
        React.Children.only(chatLink),
        document.getElementById('iwc'),
      );
    }
  };

  chatLinkClickHandler = () => {
    const { dispatch, userName, requestData } = this.props;
    dispatch(sendChatInvite({
      invitingUserName: userName,
      invitedUserName: requestData.userName,
    }));
  };

  colorCodeMarkers = (requestId) => {
    const requestType = requestId.split(':')[1];
    const oneTimeTaskIcon = `
data:image/svg+xml;utf-8, 
<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
<circle fill="#FFFFFF" stroke="#327c69" stroke-miterlimit="10" cx="16" cy="16" r="15"/>
<g>
<path fill="#327c69" d="M11.678,9.5c0.844-0.502,2.505-1.219,4.271-0.484c2.419,1.006,3.279,2.998,6.945,0.363c0.315-0.226,0.56-0.108,0.56,0.28v6.862c0,0.388-0.214,0.933-0.506,1.187c-0.638,0.551-1.806,1.371-3.056,1.334c-1.879-0.062-3.694-2.053-5.396-2.053c-1.084,0-2.169,0.524-2.813,0.905c-0.333,0.195-0.586,0.066-0.586-0.317v-6.98C11.099,10.208,11.345,9.697,11.678,9.5z"/>
<path fill="#327c69" d="M9.577,7.664c-0.569,0-1.029,0.46-1.029,1.029c0,0.145,0.03,0.284,0.086,0.408c0.093,0.212,0.242,0.656,0.242,1.042v15.171c0,0.388,0.314,0.701,0.702,0.701c0.386,0,0.699-0.313,0.699-0.701V10.143c0-0.386,0.149-0.829,0.244-1.042c0.055-0.125,0.086-0.263,0.086-0.408C10.604,8.125,10.144,7.664,9.577,7.664z"/>
</g>
</svg>
`;
    const materialNeedIcon = `
data:image/svg+xml;utf-8,
<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
<circle fill="#FFFFFF" stroke="#f98237" stroke-miterlimit="10" cx="16" cy="16" r="15"/>
<g>
<path fill="#f98237" d="M11.678,9.5c0.844-0.502,2.505-1.219,4.271-0.484c2.419,1.006,3.279,2.998,6.945,0.363c0.315-0.226,0.56-0.108,0.56,0.28v6.862c0,0.388-0.214,0.933-0.506,1.187c-0.638,0.551-1.806,1.371-3.056,1.334c-1.879-0.062-3.694-2.053-5.396-2.053c-1.084,0-2.169,0.524-2.813,0.905c-0.333,0.195-0.586,0.066-0.586-0.317v-6.98C11.099,10.208,11.345,9.697,11.678,9.5z"/>
<path fill="#f98237" d="M9.577,7.664c-0.569,0-1.029,0.46-1.029,1.029c0,0.145,0.03,0.284,0.086,0.408c0.093,0.212,0.242,0.656,0.242,1.042v15.171c0,0.388,0.314,0.701,0.702,0.701c0.386,0,0.699-0.313,0.699-0.701V10.143c0-0.386,0.149-0.829,0.244-1.042c0.055-0.125,0.086-0.263,0.086-0.408C10.604,8.125,10.144,7.664,9.577,7.664z"/>
</g>
</svg>
</svg>
`;
    const catchAllIcon = 'https://maps.google.com/mapfiles/kml/paddle/grn-circle.png';
    switch (requestType) {
      case 'material-need':
      case 'material_need':
        return materialNeedIcon;
      case 'one-time-task':
      case 'one_time_task':
        return oneTimeTaskIcon;
      default:
        return catchAllIcon;
    }
  };

  parseRequestType = requestType => (
    requestType.toLowerCase()
      .split('-')
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ')
  );

  colorCodeBadges = (requestType) => {
    switch (requestType) {
      case 'one-time-task':
        return 'badge-success';
      case 'material-need':
        return 'badge-warning';
      default:
        return 'badge-info';
    }
  };

  render() {
    const {
      google, requests, requestData, userName,
    } = this.props;
    const {
      activeMarker, showingInfoWindow, currentLocation, distance,
    } = this.state;

    return (
      <Map
        centerAroundCurrentLocation
        initialCenter={{ lat: 43.646791, lng: -79.526704 }}
        google={google}
        style={style}
        scrollwheel
        onClick={this.onMapClicked}
        ref={(e) => { this.map = e; }}
        onIdle={this.fetchRequests /* fired after panning, zooming, first load */}
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
              icon={{
                url: this.colorCodeMarkers(request[0]),
                anchor: new google.maps.Point(32, 32),
                scaledSize: new google.maps.Size(55, 55),
              }}
            />
          ))
        }

        <Marker
          name="Your position"
          description="blah"
          position={currentLocation}
          onClick={this.onOwnLocationClick}
          icon={{
            url: 'https://maps.google.com/mapfiles/kml/paddle/grn-circle.png',
            anchor: new google.maps.Point(32, 32),
            scaledSize: new google.maps.Size(40, 40),
          }}
        />

        <InfoWindow
          options={{ maxWidth: 200 }}
          marker={activeMarker}
          visible={showingInfoWindow}
          onOpen={(e) => {
            // els with handlers need to be rendered separately
            this.onInfoWindowOpen(this.props, e);
          }}
        >
          <div>
            <p className="text-center">
              { requestData.type
              && (
              <i
                className={`badge ${this.colorCodeBadges(requestData.type)} d-inline-block mr-1`}
              >
                {this.parseRequestType(requestData.type)}
              </i>
              )
              }
              { typeof distance === 'number'
              && distance > 0
              && <i className="badge badge-light">{`${distance} m away`}</i>
              }
            </p>
            <h4>{requestData.title}</h4>
            <p>{requestData.description}</p>
            { requestData.type === 'own-location'
            || <p>{`Posted by: ${requestData.userName !== userName ? requestData.userName : 'you'}`}</p>
            }
            { requestData.isOnline && requestData.userName !== userName && (
              <div id="iwc">
                <button type="button">
                  Chat
                </button>
              </div>
            ) }
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

const ConnectMapContainer = connect(mapStateToProps)(MapContainer);

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBUsD5cRgtghtWNE01dzWvn1NHdZD4Za_I'),
})(ConnectMapContainer);
