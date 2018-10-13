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
  userName: string,
  classes: Object,
  interlocutor: Object,
  messages: Array,
};

const mapStateToProps = state => ({
  userName: state.user.userName,
  interlocutor: state.chats.rooms[state.chats.activeRoom].interlocutor,
  messages: state.chats.rooms[state.chats.activeRoom].messages,
});

const ChatMessages = (
  {
    messages, userName, interlocutor, classes,
  }: Props,
) => (
  <div className="chatMessages">
    <ul className="pl-1">
      {messages.map((message) => {
        const userCSS = message.userName === userName ? classes.ownSelf : classes.other;
        const displayName = message.userName === userName ? 'You' : message.userName;
        return (
          <li key={message.id} className={`${classes.user} ${userCSS}`}>
            <strong>{`${displayName}: `}</strong>
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
