// @flow

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  NavItem, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';

import actionCreators from '../../action/index';

type Props = {
  loggedIn: boolean,
  chats: Object,
  dispatch: Function,
}

type State = {
  dropdownOpen: boolean,
}

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
  chats: state.chats,
});

class ChatLink extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  };

  render() {
    const { loggedIn, chats, dispatch } = this.props;
    const { dropdownOpen } = this.state;
    const numChats = typeof chats === 'object' ? Object.keys(chats.rooms).length : 0;
    const chatRoom = chats.activeRoom;
    return (
      <Fragment>
        <NavItem className="ml-4">
          { loggedIn && numChats > 0 && (
            <React.Fragment>
              <Dropdown isOpen={dropdownOpen} toggle={this.toggle}>
                <DropdownToggle className="nav-link text-white" color="link" caret>
                  Chat (
                  {numChats}
                  )
                </DropdownToggle>
                <DropdownMenu>
                  {Object.entries(chats.rooms).map(([roomName, room]) => (
                    <DropdownItem
                      className={roomName === chatRoom ? 'activeRoom' : 'inactiveRoom'}
                      key={roomName}
                      onClick={
                      () => {
                        dispatch(actionCreators.app.layout.aside.open());
                        dispatch(actionCreators.app.chat.room.activate({ room: roomName }));
                      }
                    }
                    >
                      {room.interlocutor.userName}
                    </DropdownItem>
                  ))}

                </DropdownMenu>
              </Dropdown>
            </React.Fragment>
          ) }
        </NavItem>

      </Fragment>
    );
  }
}

export default connect(mapStateToProps)(ChatLink);
