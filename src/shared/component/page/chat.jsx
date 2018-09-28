// @flow

import React from 'react';
import Helmet from 'react-helmet';

import Chat from '../chat/chat';

const title = 'Chat Page';

const ChatPage = () => (
  <div>
    <Helmet
      title={title}
      meta={[
        { name: 'description', content: 'A page to say hello' },
        { property: 'og:title', content: title },
      ]}
    />
    <h2>{title}</h2>
    <Chat />
  </div>
);

export default ChatPage;
