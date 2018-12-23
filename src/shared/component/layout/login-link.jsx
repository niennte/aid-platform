// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { NavLink, withRouter } from 'react-router-dom';

import { logoutUser } from '../../action/index';
import {
  LOGIN_PAGE_ROUTE,
  ACCOUNT_PAGE_ROUTE,
} from '../../routes';

type Props = {
  loggedIn: boolean,
  userName: string,
  dispatch: Function,
}

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
  userName: state.user.userName,
});

class LoginLink extends React.Component<Props> {
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
    const { loggedIn, userName, dispatch } = this.props;
    const { dropdownOpen } = this.state;

    return (
      <Nav navbar className="ml-auto">
        <NavItem>
          { loggedIn ? (
            <Dropdown isOpen={dropdownOpen} toggle={this.toggle}>
              <DropdownToggle className="nav-link text-white" color="link" caret>
                {userName}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  className=""
                >
                  <NavLink
                    className="nav-link"
                    to={ACCOUNT_PAGE_ROUTE}
                    activeClassName="active"
                    exact
                  >
                    Account
                  </NavLink>
                </DropdownItem>
                <DropdownItem
                  onClick={() => dispatch(logoutUser(userName))}
                >
                  <span className="nav-link">
                    Logout
                  </span>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <React.Fragment>
              <NavLink
                className="nav-link text-white"
                to={LOGIN_PAGE_ROUTE}
                activeClassName="active"
                exact
              >
                Login
              </NavLink>
            </React.Fragment>
          ) }
        </NavItem>

      </Nav>
    );
  }
}

export default withRouter(
  connect(mapStateToProps)(LoginLink),
);
