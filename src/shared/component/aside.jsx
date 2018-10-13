// @flow

import React from 'react';
import { connect } from 'react-redux';

import AsideCloseButton from './aside-close-button';
import Chat from './chat/chat';

type Props = {
  isLoggedIn: boolean,
  hasRoom: boolean,
  interlocutor: ?string,
};

const mapStateToProps = state => ({
  isLoggedIn: state.user.loggedIn,
  hasRoom: typeof state.chats.rooms[state.chats.activeRoom] === 'object' || false,
  interlocutor: typeof state.chats.rooms[state.chats.activeRoom] === 'object'
    ? state.chats.rooms[state.chats.activeRoom].interlocutor.userName : null,
});

const Aside = ({ isLoggedIn, hasRoom, interlocutor }: Props) => (
  <aside className="aside">
    <AsideCloseButton />
    <h4>
      {
        isLoggedIn && hasRoom && interlocutor && `Chatting with ${interlocutor}`
      }
    </h4>
    { isLoggedIn && hasRoom && <Chat /> }
  </aside>
);

export default connect(mapStateToProps)(Aside);
