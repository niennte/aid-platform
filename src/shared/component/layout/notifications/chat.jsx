// @flow

import React from 'react';
import { connect } from 'react-redux';
import NotificationSystem from 'react-notification-system';

import actionCreators from '../../../action/index';

type Props = {
  invitation: ?{},
  dispatch: Function,
};

const mapStateToProps = state => ({
  invitation: state.chats.pendingInvitation,
});

class ChatNotification extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.notificationSystem = null;
  }

  componentWillReceiveProps(nextProps) {
    const { invitation, dispatch } = nextProps;
    if (invitation) {
      this.notificationSystem.addNotification({
        message: `
        Chat invitation!
        `,
        level: 'success',
        action: {
          label: 'Accept!',
          callback: () => {
            dispatch(actionCreators.app.layout.aside.open());
            dispatch(actionCreators.app.chat.room.activate({
              room: invitation.room,
            }));
          },
        },
        children: (
          <React.Fragment>
            <p>
from:
              <span className="primaryType">{invitation.userName}</span>
            </p>
            {invitation.re ? (
              <p>
                re:
                <span className="primaryType">{invitation.re}</span>
              </p>
            ) : ''}
            <nav className="nav">
              <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                  dispatch(actionCreators.app.layout.aside.open());
                  dispatch(actionCreators.app.chat.room.activate({
                    room: invitation.room,
                  }));
                }}
              >
                Accept
              </button>
              <button
                type="button"
                className="ml-auto btn btn-secondary"
                onClick={() => {
                  dispatch(actionCreators.app.chat.room.destroy({
                    room: invitation.room,
                  }));
                }}
              >
                Ignore
              </button>
            </nav>
          </React.Fragment>
        ),
        autoDismiss: 0,
      });
    }
  }

  render() {
    return (
      <div>
        <NotificationSystem ref={(e) => { this.notificationSystem = e; }} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(ChatNotification);
