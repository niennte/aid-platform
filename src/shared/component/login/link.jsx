// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

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
        <React.Fragment>
          {`Logged in as ${userName}`}
          <button
            className="d-inline-block ml-2"
            type="button"
            onClick={() => dispatch(logoutUser(userName))}
          >
            Logout
          </button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <NavLink
            className="nav-link"
            to={LOGIN_PAGE_ROUTE}
            activeClassName="active"
            activeStyle={{ color: 'limegreen' }}
            exact
          >
            Login
          </NavLink>
        </React.Fragment>
      ) }
    </NavItem>

  </Nav>
);

export default connect(mapStateToProps)(LoginLink);
