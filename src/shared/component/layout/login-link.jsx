// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem } from 'reactstrap';
import { NavLink, withRouter } from 'react-router-dom';

import { logoutUser } from '../../action/index';
import {
  LOGIN_PAGE_ROUTE,
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

const LoginLink = ({ loggedIn, userName, dispatch }: Props) => (
  <Nav navbar className="ml-auto">
    <NavItem>
      { loggedIn ? (
        <div className="text-white">
          {`Logged in as ${userName}`}
          <button
            className="d-inline-block ml-2"
            type="button"
            onClick={() => dispatch(logoutUser(userName))}
          >
            Logout
          </button>
        </div>
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

export default withRouter(
  connect(mapStateToProps)(LoginLink),
);
