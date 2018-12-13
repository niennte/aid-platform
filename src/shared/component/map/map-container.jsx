// @flow

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  InfoWindow, GoogleApiWrapper, Map,
} from 'google-maps-react';
import { computeDistanceBetween } from 'spherical-geometry-js';

import Marker from './Marker';
import actionCreators, {
  fetchRequests as fetchRequestLocations, fetchRequestData, sendChatInvite,
} from '../../action/index';
import markerIconSrc from '../common/svg/marker-icon-src';
import makeMarker from '../common/color-code-markers';
import MapInfo from './info';
import { MAP_PAGE_ROUTE, MESSAGE_CREATE_PAGE_ROUTE } from '../../routes';

import Modal from '../ui-elements/modal';
import ResponseForm from '../response/create';

const mapStyle = {
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
      respondUiIsOpen: false,
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

  toggleRespond = () => {
    const { dispatch } = this.props;
    dispatch(actionCreators.app.infos.response.unset());
    dispatch(actionCreators.app.errors.response.unset());
    this.setState((prevState) => {
      const { respondUiIsOpen: isOpen } = prevState;
      return { respondUiIsOpen: !isOpen };
    });
  };

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
    const { requestData, userName } = this.props;
    const { distance } = this.state;
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
      re: `Your request "${requestData.title}"`,
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
    const { requestData } = this.props;
    this.setState(() => {
      const requestId = requestData.requestId
        ? requestData.requestId : requestData.id.split(':')[0];
      return {
        requestData: Object.assign(requestData, { id: requestId }),
      };
    });
    this.toggleRespond();
  };

  messageClickHandler = () => {
    const {
      dispatch, requestData, history,
    } = this.props;
    dispatch(actionCreators.app.infos.message.unset());
    dispatch(actionCreators.app.errors.message.unset());
    // set the recipient and the subject
    dispatch(actionCreators.app.values.message.set({
      resource: {
        recipient: requestData.userName,
        recipient_id: requestData.userId,
        subject: `Request '${requestData.title}'`,
        body: '',
      },
    }));
    history.push(MESSAGE_CREATE_PAGE_ROUTE);
  };

  colorCodeMarkers = (requestId) => {
    const requestType = requestId.split(':')[1];
    return makeMarker(requestType);
  };

  render() {
    const { google } = this.props;
    const {
      activeMarker, showingInfoWindow, currentLocation,
      requests, requestData, respondUiIsOpen,
    } = this.state;

    return (
      <div>
        <Map
          centerAroundCurrentLocation
          initialCenter={{ lat: 43.646791, lng: -79.526704 }}
          google={google}
          style={mapStyle}
          scrollwheel
          onClick={this.onMapClicked}
          ref={(e) => { this.map = e; }}
          onIdle={this.fetchRequests /* fired after panning, zooming, first load */}
          zoom={10}
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
              this.onInfoWindowOpen(this.props, e);
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
        <Modal
          isOpen={respondUiIsOpen}
          toggle={this.toggleRespond}
        >
          <ResponseForm
            request={requestData}
            chatClickHandler={this.toggleRespond}
          />
        </Modal>
      </div>
    );
  }
}

const ConnectMapContainer = withRouter(connect(mapStateToProps)(MapContainer));

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBUsD5cRgtghtWNE01dzWvn1NHdZD4Za_I'),
})(ConnectMapContainer);
