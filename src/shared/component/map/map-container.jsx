// @flow

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  InfoWindow, GoogleApiWrapper, Map,
} from 'google-maps-react';
import { computeDistanceBetween } from 'spherical-geometry-js';
import LinesEllipsis from 'react-lines-ellipsis';

import Marker from './Marker';
import actionCreators, {
  fetchRequests as fetchRequestLocations, fetchRequestData, sendChatInvite,
} from '../../action/index';
import infoIconSrc from '../common/svg/info-icon-src';
import volunteerIconSrc from '../common/svg/volunteer-icon-src';
import chatIconSrc from '../common/svg/chat-icon-src';
import messageIconSrc from '../common/svg/message-icon-src';
import markerIconSrc from '../common/svg/marker-icon-src';
import makeMarker from '../common/color-code-markers';
import MapInfo from './info';
import { MAP_PAGE_ROUTE } from '../../routes';

const mapStyle = {
  width: '100%',
  height: '100%',
};

const iconStyle = {
  width: '28px',
  height: '28px',
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
  history: any,
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
      requests: [],
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
    this.setState({
      requests: nextProps.requests,
    });
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
    const { currentLocation } = this.state;
    this.setState({
      activeMarker: marker,
      showingInfoWindow: true,
      distance: null,
    });
    dispatch(actionCreators.app.request.data.success({
      lng: currentLocation.lng,
      address: '',
      type: 'own-location',
      country: '',
      lat: currentLocation.lat,
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

  /*
   InfoWindow renders into its own scope,
   for handlers to work, need to re-render
   */
  onInfoWindowOpen = () => {
    // create and render links pertaining to request
    const responseLinkContainer = document.getElementById('requestLinks');
    if (responseLinkContainer) {
      const responseLink = (
        <nav className="w-100 nav justify-content-center m-0">
          <button
            type="button"
            className="item nav-link btn btn-light btn-sm rounded-circle p-2"
            onClick={(e) => {
              e.preventDefault();
              this.viewRequestClickHandler();
            }}
          >
            <img
              src={infoIconSrc}
              alt="More info"
              style={iconStyle}
            />
          </button>
          <button
            type="button"
            className="item nav-link btn btn-light btn-sm rounded-circle p-2"
            onClick={(e) => {
              e.preventDefault();
              this.responseClickHandler();
            }}
          >
            <img
              src={volunteerIconSrc()}
              alt="Volunteer"
              style={{
                width: '28px',
                height: '28px',
                transform: 'rotate(0deg)',
              }}
            />
          </button>
        </nav>
      );
      ReactDOM.render(
        React.Children.only(responseLink),
        document.getElementById('requestLinks'),
      );
    }

    // create and render links pertaining to user
    const userLinkContainer = document.getElementById('userLinks');
    const { requestData, userName } = this.props;
    const disabled = !(requestData.isOnline && requestData.userName !== userName);
    if (userLinkContainer) {
      const responseLink = (
        <nav className="w-100 nav justify-content-center m-0">
          <button
            type="button"
            className="item nav-link btn btn-light btn-sm rounded-circle p-2"
            disabled={disabled}
            onClick={(e) => {
              e.preventDefault();
              this.chatLinkClickHandler();
            }}
          >
            <img
              src={chatIconSrc}
              alt="Chat"
              style={iconStyle}
            />
          </button>
          <button
            type="button"
            className="item nav-link btn btn-light btn-sm rounded-circle p-2"
            onClick={(e) => {
              e.preventDefault();
              this.messageClickHandler();
            }}
          >
            <img
              src={messageIconSrc}
              alt="message"
              style={iconStyle}
            />
          </button>
        </nav>
      );
      ReactDOM.render(
        React.Children.only(responseLink),
        document.getElementById('userLinks'),
      );
    }
    // truncate and render request title and description
    const descriptionContainer = document.getElementById('request');
    if (descriptionContainer) {
      const request = (
        <div>
          <LinesEllipsis
            text={requestData.title}
            maxLine="1"
            ellipsis="..."
            trimRight
            basedOn="letters"
            component="h4"
          />
          <LinesEllipsis
            text={requestData.description}
            maxLine="2"
            ellipsis="..."
            trimRight
            basedOn="letters"
          />
        </div>
      );
      ReactDOM.render(
        React.Children.only(request),
        document.getElementById('request'),
      );
    }
  };

  test = () => {
    const { requestData, userName } = this.props;
    const { distance } = this.state;
    // const disabled = !(requestData.isOnline && requestData.userName !== userName);
    // truncate and render request title and description
    const descriptionContainer = document.getElementById('infoBoxContent');
    if (descriptionContainer) {
      const request = (
        <MapInfo
          userName={userName}
          distance={distance}
          requestData={requestData}
          onViewRequest={this.viewRequestClickHandler}
          onResponseClick={this.responseClickHandler}
          onChatLinkClick={this.chatLinkClickHandler}
          onMessageClick={this.messageClickHandler}
        />
      );
      ReactDOM.render(
        React.Children.only(request),
        document.getElementById('infoBoxContent'),
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

  viewRequestClickHandler = () => {
    const { requestData, history } = this.props;
    const requestId = requestData.requestId
      ? requestData.requestId
      : requestData.id.split(':')[0];
    history.push(`${MAP_PAGE_ROUTE}/${requestId}`);
  };

  responseClickHandler = () => {
    const { dispatch, userName, requestData } = this.props;
    console.log(userName, requestData.id);
    dispatch(actionCreators.app.async.request());
    // dispatch(sendChatInvite({
    //   invitingUserName: userName,
    //   invitedUserName: requestData.userName,
    // }));
  };

  messageClickHandler = () => {
    const { dispatch, userName, requestData } = this.props;
    console.log(userName, requestData.userName);
    dispatch(actionCreators.app.async.request());
    // dispatch(sendChatInvite({
    //   invitingUserName: userName,
    //   invitedUserName: requestData.userName,
    // }));
  };

  colorCodeMarkers = (requestId) => {
    const requestType = requestId.split(':')[1];
    return makeMarker(requestType);
  };

  render() {
    const { google } = this.props;
    const {
      activeMarker, showingInfoWindow, currentLocation,
      requests,
    } = this.state;

    return (
      <Map
        centerAroundCurrentLocation
        initialCenter={{ lat: 43.646791, lng: -79.526704 }}
        google={google}
        style={mapStyle}
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
            url: markerIconSrc('orange'),
            anchor: new google.maps.Point(32, 32),
            scaledSize: new google.maps.Size(40, 40),
          }}
          shouldRender
        />

        <InfoWindow
          options={{ maxWidth: 200 }}
          marker={activeMarker}
          visible={showingInfoWindow}
          onOpen={(e) => {
            // els with handlers need to be rendered separately
            this.test(this.props, e);
          }}
        >
          <div
            id="infoBoxContent"
            style={{
              width: '200px',
              height: '170px',
            }}
          />
        </InfoWindow>
      </Map>
    );
  }
}

const ConnectMapContainer = withRouter(connect(mapStateToProps)(MapContainer));

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBUsD5cRgtghtWNE01dzWvn1NHdZD4Za_I'),
})(ConnectMapContainer);
