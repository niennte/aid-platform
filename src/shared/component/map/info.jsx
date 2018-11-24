// @flow
import React from 'react';
import LinesEllipsis from 'react-lines-ellipsis';

import infoIconSrc from '../common/svg/info-icon-src';
import volunteerIconSrc from '../common/svg/volunteer-icon-src';
import chatIconSrc from '../common/svg/chat-icon-src';
import messageIconSrc from '../common/svg/message-icon-src';

const iconStyle = {
  width: '22px',
  height: '22px',
};

type Props = {
  userName: string,
  distance: ?number,
  requestData: object,
  onViewRequest: Function,
  onResponseClick: Function,
  onChatLinkClick: Function,
  onMessageClick: Function,
};

class MapInfo extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      requestData: props.requestData,
    };
  }

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

  parseRequestType = requestType => (
    requestType.toLowerCase()
      .split('-')
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ')
  );

  onChatLinkClick = () => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.onChatLinkClick();
  };

  onViewRequest = () => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.onViewRequest();
  };

  onResponseClick = () => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.onResponseClick();
  };

  onMessageClick = () => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.onMessageClick();
  };

  render() {
    const { requestData } = this.state;
    const { distance, userName } = this.props;
    const disabled = !(requestData.isOnline);
    return (
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
        <div className="title">
          <LinesEllipsis
            text={requestData.title}
            maxLine="1"
            ellipsis="..."
            trimRight
            basedOn="letters"
            component="h4"
          />
        </div>
        <div className="description">
          <LinesEllipsis
            text={requestData.description}
            maxLine="3"
            ellipsis="..."
            trimRight
            basedOn="letters"
          />
        </div>

        <div id="requestLinks">
          <nav
            className="nav justify-content-between m-0"
            style={{
              width: '96px',
              position: 'absolute',
              right: '0',
              top: '63px',
            }}
          >
            <nav className="nav">
              <button
                type="button"
                className="item nav-link btn btn-light btn-sm rounded-circle p-2 m-1"
                onClick={(e) => {
                  e.preventDefault();
                  this.onViewRequest();
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
                className="item nav-link btn btn-light btn-sm rounded-circle p-2 m-1"
                onClick={(e) => {
                  e.preventDefault();
                  this.onResponseClick();
                }}
              >
                <img
                  src={volunteerIconSrc()}
                  alt="Volunteer"
                  style={iconStyle}
                />
              </button>
            </nav>


            <nav className="nav">
              <button
                type="button"
                className="item nav-link btn btn-light btn-sm rounded-circle p-2 m-1"
                onClick={(e) => {
                  e.preventDefault();
                  this.onMessageClick();
                }}
              >
                <img
                  src={messageIconSrc}
                  alt="message"
                  style={iconStyle}
                />
              </button>
              <button
                type="button"
                className="item nav-link btn btn-light btn-sm rounded-circle p-2 m-1"
                disabled={disabled}
                onClick={(e) => {
                  e.preventDefault();
                  this.onChatLinkClick();
                }}
              >
                <img
                  src={chatIconSrc}
                  alt="Chat"
                  style={iconStyle}
                />
              </button>
            </nav>
          </nav>
        </div>

        <div className="user mt-2">
          { requestData.type === 'own-location'
          || (
          <p
            className="mb-0 primaryType"
          >
            {`Posted by: ${requestData.userName !== userName ? requestData.userName : 'you'}`}
          </p>
          )
          }
        </div>
      </div>
    );
  }
}

export default MapInfo;
