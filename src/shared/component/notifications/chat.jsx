// @flow

import React from 'react';
import { connect } from 'react-redux';
import NotificationSystem from 'react-notification-system';

import actionCreators from '../../action/index';

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
        Chat invitation from ${invitation.userName}
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
