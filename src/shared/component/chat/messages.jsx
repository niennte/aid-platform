// @flow

import React from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';

const styles = {
  user: {
    listStyle: 'none',
  },
  ownSelf: {
    fontWeight: 'bold',
    color: 'orange',
  },
  other: {
    fontStyle: 'italic',
    color: 'green',
  },
  isTyping: {
    fontStyle: 'italic',
    color: 'darkgrey',
  },
};

type Props = {
  messages: List,
  userId: string,
  classes: Object,
  interlocutor: Object,
};

const mapStateToProps = state => ({
  messages: state.chat,
  userId: state.user.id,
  interlocutor: {
    user: state.interlocutor.user,
    userName: state.interlocutor.userName,
    isTyping: state.interlocutor.status,
  },
});

const ChatMessages = (
  {
    messages, userId, interlocutor, classes,
  }: Props,
) => (
  <div className="chatMessages">
    <ul className="pl-1">
      {messages.map((message) => {
        const userCSS = message.user === userId ? classes.ownSelf : classes.other;
        const userName = message.user === userId ? 'You' : message.userName;
        return (
          <li key={message.id} className={`${classes.user} ${userCSS}`}>
            <strong>{`${userName}: `}</strong>
            {message.message}
          </li>
        );
      })}
      { interlocutor.isTyping && (
        <li className={`${classes.user} ${classes.isTyping}`}>
          <strong>{`${interlocutor.userName}: `}</strong>
          ...
        </li>
      )}
    </ul>
  </div>
);

const ChatMessageContainer = connect(mapStateToProps)(ChatMessages);
export default injectSheet(styles)(ChatMessageContainer);
