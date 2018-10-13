// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem } from 'reactstrap';

import actionCreators from '../../action/index';

type Props = {
  loggedIn: boolean,
  chats: Object,
  dispatch: Function,
}

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
  chats: state.chats,
});

const ChatLink = ({ loggedIn, chats, dispatch }: Props) => {
  const numChats = typeof chats === 'object' ? Object.keys(chats.rooms).length : 0;
  return (
    <Nav navbar className="mx-auto">
      <NavItem>
        { loggedIn && numChats > 0 && (
          <React.Fragment>
            Chat (
            {numChats}
            )
            <button
              className="d-inline-block ml-2"
              type="button"
              onClick={() => dispatch(actionCreators.app.layout.aside.open())}
            >
              Open
            </button>
          </React.Fragment>
        ) }
      </NavItem>

    </Nav>
  );
};

export default connect(mapStateToProps)(ChatLink);
