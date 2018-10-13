// @flow

import React, { Fragment } from 'react';

import ChatMessages from './messages';
import ChatForm from './form';

const Chat = () => (
  <Fragment>
    <div className="chatContainer">
      <ChatMessages />
      <ChatForm />
    </div>
  </Fragment>
);

export default Chat;
