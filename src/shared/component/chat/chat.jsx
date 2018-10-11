// @flow

import React, { Fragment } from 'react';

import ChatMessages from './messages';
import ChatForm from './form';
import AsideCloseButton from '../aside-close-button';

const Chat = () => (
  <Fragment>
    <div className="chatContainer">
      <AsideCloseButton />
      <ChatMessages />
      <ChatForm />
    </div>
  </Fragment>
);

export default Chat;
