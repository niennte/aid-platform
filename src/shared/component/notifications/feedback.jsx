// @flow

import React from 'react';
import { connect } from 'react-redux';
import NotificationSystem from 'react-notification-system';

type Props = {
  feedback: ?String
};

const mapStateToProps = state => ({
  feedback: state.notifications,
});

class FeedbackNotification extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.notificationSystem = null;
  }

  componentWillReceiveProps(nextProps) {
    const { feedback } = nextProps;
    const level = 'success';
    const position = 'tr';
    if (feedback) {
      this.notificationSystem.addNotification({
        title: 'Success!',
        message: `
        ${feedback}
        `,
        level,
        position,
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

export default connect(mapStateToProps)(FeedbackNotification);
