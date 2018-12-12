// @flow

import React from 'react';
import { connect } from 'react-redux';

import chatIconSrc from '../common/svg/chat-icon-src';
import { sendChatInvite } from '../../action/index';

type Props = {
  usersOnline: object,
  userName: string, // recipient
  senderUserName: string,
  dispatch: Function,
  className: ?string,
  clickHandler: ?Function,
};

const mapStateToProps = state => ({
  senderUserName: state.user.userName,
  usersOnline: state.usersOnline,
});

class ChatLink extends React.Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      userName: props.userName,
      isOnline: !!props.usersOnline[props.userName],
    };
  }

  componentWillReceiveProps(nextProps) {
    const { userName } = this.state;
    this.setState({
      isOnline: !!nextProps.usersOnline[userName],
    });
  }

  chatLinkClickHandler = () => {
    const {
      dispatch, userName, senderUserName, clickHandler,
    } = this.props;
    if (clickHandler) {
      clickHandler();
    }
    dispatch(sendChatInvite({
      invitingUserName: senderUserName,
      invitedUserName: userName,
    }));
  };


  render() {
    const { isOnline } = this.state;
    const { className } = this.props;
    return (
      <React.Fragment>
        <button
          type="button"
          className={`item nav-link btn btn-light btn-sm p-2 ${isOnline || 'disabled'} ${className}`}
          disabled={!isOnline}
          onClick={this.chatLinkClickHandler}
        >
          <img
            src={chatIconSrc}
            alt="Chat"
            style={{
              width: '28px',
              height: '28px',
            }}
          />
        </button>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps)(ChatLink);
