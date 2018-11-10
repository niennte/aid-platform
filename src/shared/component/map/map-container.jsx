// @flow

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {
  InfoWindow, GoogleApiWrapper, Map,
} from 'google-maps-react';
import { computeDistanceBetween } from 'spherical-geometry-js';

import Marker from './Marker';
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
    // InfoWindow renders into its own scope;
    // for handlers to work, need to re-render
    // after the info window is open

    // render chat link
    const chatLinkContainer = document.getElementById('chatLink');
    if (chatLinkContainer) {
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
      ReactDOM.render(
        React.Children.only(chatLink),
        document.getElementById('chatLink'),
      );
    }
    // render message link
    const messageLinkContainer = document.getElementById('messageLink');
    if (messageLinkContainer) {
      const messageLink = (
        <button
          type="button"
          onClick={() => {
            console.log('message link clicked');
          }}
        >
          Message
        </button>
      );
      // InfoWindow renders into its own scope,
      // for handlers to work, need to re-render
      ReactDOM.render(
        React.Children.only(messageLink),
        document.getElementById('messageLink'),
      );
    }

    // render view all link
    const viewAllLinkContainer = document.getElementById('viewAllLink');
    if (viewAllLinkContainer) {
      const viewAllLink = (
        <button
          className="item nav-link border-right"
          type="button"
          onClick={() => {
            console.log('view all link clicked');
          }}
        >
          View all
        </button>
      );
      // InfoWindow renders into its own scope,
      // for handlers to work, need to re-render
      ReactDOM.render(
        React.Children.only(viewAllLink),
        document.getElementById('viewAllLink'),
      );
    }

    // render response link
    const responseLinkContainer = document.getElementById('requestLinks');
    if (responseLinkContainer) {
      // item nav-link border-right
      const responseLink = (
        <nav className="w-100 nav justify-content-center m-0">
          <button
            type="button"
            className="item nav-link btn btn-light btn-sm rounded-circle p-2"
            onClick={(e) => {
              e.preventDefault();
              console.log('view all link clicked');
              this.viewRequestClickHandler();
            }}
          >
            <img
              src={`
data:image/svg+xml;utf-8,
            <svg aria-hidden="true" data-prefix="fas" data-icon="info" class="svg-inline--fa fa-info fa-w-6" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path fill="currentColor" d="M20 424.229h20V279.771H20c-11.046 0-20-8.954-20-20V212c0-11.046 8.954-20 20-20h112c11.046 0 20 8.954 20 20v212.229h20c11.046 0 20 8.954 20 20V492c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20v-47.771c0-11.046 8.954-20 20-20zM96 0C56.235 0 24 32.235 24 72s32.235 72 72 72 72-32.235 72-72S135.764 0 96 0z"></path></svg>
            `}
              alt="More info"
              style={{
                width: '28px',
                height: '28px',
              }}
            />
          </button>
          <button
            type="button"
            className="item nav-link btn btn-light btn-sm rounded-circle p-2"
            onClick={(e) => {
              e.preventDefault();
              console.log('response link clicked');
              this.responseClickHandler();
            }}
          >
            <img
              src={`
data:image/svg+xml;utf-8,
<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 297 297" style="enable-background:new 0 0 297 297;" xml:space="preserve">
<path d="M47.156,188.376c0,2.861,1.109,14.855,9.212,29.09c6.86,12.052,19.88,26.147,43.843,29.262v40.243c0,.538,4.49,10.029,10.029,10.029c5.538,0,10.028-4.491,10.028-10.029v-49.644c0-5.538-4.49-10.029-10.028-10.029
c-16.487,0-28.643-6.465-36.128-19.216c-5.521-9.402-6.922-17.345-6.922-20.844c0-21.168,0-82.294,0-82.294
c0-1.782,0-6.519,8.237-6.519c8.235,0,8.235,4.736,8.235,6.519v34.548c0,2.736,1.117,5.354,3.095,7.246
c1.977,1.891,4.639,2.905,7.374,2.773c0.024-0.011,5.862,0.022,13.244,4.191c11.333,6.402,20.478,19.249,26.445,37.151c1.752,5.255,7.432,8.097,12.686,6.344c5.255-1.752,8.095-7.432,6.343-12.686c-12.976-38.932-35.79-50.37-49.128-53.701V38.037c0-2.17,0-5.803,8.236-5.803c8.235,0,8.235,3.633,8.235,5.803v54.73c0,5.539,4.491,10.029,10.029,10.029s10.028-4.49,10.028-10.029
V25.86c0-2.17,0-5.803,8.236-5.803c8.235,0,8.235,3.633,8.235,5.803v66.907c0,5.539,4.491,10.029,10.029,10.029
s10.029-4.49,10.029-10.029v-54.73c0-2.17,0-5.803,8.235-5.803c8.236,0,8.236,3.633,8.236,5.803v71.278
c0,5.538,4.491,10.029,10.029,10.029c5.539,0,10.029-4.491,10.029-10.029V71.849c0-1.782,0-6.519,8.236-6.519
c8.236,0,8.244,4.736,8.244,6.519v116.402c0.011,0.177,0.717,18.087-9.919,29.341c-6.086,6.441-15.135,9.706-26.894,9.706c-5.539,0-10.029,4.491-10.029,10.029v49.644c0,5.538,4.49,10.029,10.029,10.029c5.538,0,10.028-4.491,10.028-10.029v-40.253
c12.868-1.712,23.415-6.855,31.443-15.35c15.825-16.745,15.516-40.586,15.391-43.899V71.849c0-15.647-11.636-26.577-28.294-26.577c-2.912,0-5.667,0.342-8.236,0.977v-8.211c0-15.469-11.371-25.86-28.295-25.86c-3.986,0-7.66,0.583-10.954,1.667C169.732,5.253,160.514,0,148.487,0c-12.028,0-21.245,5.253-25.575,13.844c-3.294-1.084-6.968-1.667-10.954-1.667c-16.924,0-28.295,10.392-28.295,25.86v41.307c-2.569-0.635-5.324-0.976-8.235-0.976c-16.66,0-28.295,10.93-28.295,26.577C47.132,104.944,47.156,166.737,47.156,188.376z"/>
</svg>
            `}
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
      // InfoWindow renders into its own scope,
      // for handlers to work, need to re-render
      ReactDOM.render(
        React.Children.only(responseLink),
        document.getElementById('requestLinks'),
      );
    }

    // render user link
    const userLinkContainer = document.getElementById('userLinks');
    const { requestData, userName } = this.props;
    const disabled = !(requestData.isOnline && requestData.userName !== userName);
    if (userLinkContainer) {
      // item nav-link border-right
      const responseLink = (
        <nav className="w-100 nav justify-content-center m-0">
          <button
            type="button"
            className="item nav-link btn btn-light btn-sm rounded-circle p-2"
            disabled={disabled}
            onClick={(e) => {
              e.preventDefault();
              console.log('chat link clicked');
              this.chatLinkClickHandler();
            }}
          >
            <img
              src={`
data:image/svg+xml;utf-8,
            <svg aria-hidden="true" data-prefix="fab" data-icon="rocketchat" class="svg-inline--fa fa-rocketchat fa-w-19" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 582 512"><path fill="black" d="M491.9 105.9c-77.8-51.4-181.2-63.1-267.1-47.6C128.7-34.4 21 8.2 0 20.5c0 0 73.9 62.8 61.9 117.8-87.5 89.2-45.9 188.5 0 235.4C73.9 428.7 0 491.5 0 491.5c20.8 12.3 128.2 54.8 224.8-37.4 85.7 15.4 189.1 3.8 267.1-47.7 120.6-77 121-223.1 0-300.5zm-194.4 300c-30.1.1-60-3.8-89.1-11.5l-20 19.3c-11.1 10.8-23.6 20.1-37 27.7-16.3 8.2-34.1 13.3-52.3 14.9 1-1.8 1.9-3.6 2.8-5.3 20-37.1 25.4-70.3 16.2-99.8-32.9-25.9-52.6-59-52.6-95.2 0-82.9 103.9-150.1 232-150.1s232 67.2 232 150.1c0 82.9-103.9 149.9-232 149.9zM186.2 291.7c-19.1.3-34.9-15-35.2-34.1-.7-45.9 68.6-46.9 69.3-1.1v.5c.2 19.3-15.5 34.7-34.1 34.7zm74.6-34.1c-.8-45.9 68.5-47 69.3-1.2v.6c.4 45.6-68.5 46.1-69.3.6zm145 34.1c-19.1.3-34.9-15-35.2-34.1-.7-45.9 68.6-46.9 69.3-1.1v.5c.2 19-15 34.6-34.1 34.7z"></path></svg>
            `}
              alt="Chat"
              style={{
                width: '28px',
                height: '28px',
              }}
            />
          </button>
          <button
            type="button"
            className="item nav-link btn btn-light btn-sm rounded-circle p-2"
            onClick={(e) => {
              e.preventDefault();
              console.log('message link clicked');
              this.messageClickHandler();
            }}
          >
            <img
              src={`
data:image/svg+xml;utf-8,
            <svg aria-hidden="true" data-prefix="far" data-icon="envelope" class="svg-inline--fa fa-envelope fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="black" d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"></path></svg>
            `}
              alt="message"
              style={{
                width: '28px',
                height: '28px',
              }}
            />
          </button>
        </nav>
      );
      // InfoWindow renders into its own scope,
      // for handlers to work, need to re-render
      ReactDOM.render(
        React.Children.only(responseLink),
        document.getElementById('userLinks'),
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
    const { dispatch, requestData } = this.props;
    console.log(requestData.id);
    dispatch(actionCreators.app.async.request());
    // dispatch(sendChatInvite({
    //   invitingUserName: userName,
    //   invitedUserName: requestData.userName,
    // }));
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
      google, requestData, userName,
    } = this.props;
    const {
      activeMarker, showingInfoWindow, currentLocation, distance,
      requests,
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
          <div>
            <p
              className="infoWindowContent text-center"
            >
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
            <p>{`${requestData.description} ...`}</p>

            <div id="requestLinks">
              <nav className="w-100 nav justify-content-around m-0">
                <button
                  type="button"
                  className="item nav-link btn btn-light btn-sm"
                  disabled
                >
                  V
                </button>
                <button
                  type="button"
                  className="item nav-link btn btn-light btn-sm"
                  disabled
                >
                  R
                </button>
              </nav>
            </div>

            { requestData.type === 'own-location'
            || <p>{`Posted by: ${requestData.userName !== userName ? requestData.userName : 'you'}`}</p>
            }

            { requestData.userName !== userName && (
              <div id="userLinks">
                <nav className="w-100 nav justify-content-around m-0">
                  <button
                    type="button"
                    className="item nav-link btn btn-light btn-sm"
                    disabled
                  >
                  C
                  </button>
                  <button
                    type="button"
                    className="item nav-link btn btn-light btn-sm"
                    disabled
                  >
                  M
                  </button>
                </nav>
              </div>
            )}
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
