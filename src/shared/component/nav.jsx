// @flow

import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
} from 'reactstrap';
import {
  HOME_PAGE_ROUTE,
  CHAT_PAGE_ROUTE,
  MAP_PAGE_ROUTE,
} from '../routes';
import LoginLink from './login/link';

export default class NavbarReactstrap extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    this.setState(prevState => (
      { isOpen: !prevState.isOpen }
    ));
  }

  render() {
    const { isOpen } = this.state;
    return (
      <Navbar color="light" light expand="md">
        <NavLink className="navbar-brand" to={HOME_PAGE_ROUTE} activeClassName="active" activeStyle={{ color: 'limegreen' }} exact>Home</NavLink>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar>
            {[
              { route: CHAT_PAGE_ROUTE, label: 'Chat' },
              { route: MAP_PAGE_ROUTE, label: 'Map' },
            ].map(link => (
              <NavItem key={link.route}>
                <NavLink className="nav-link" to={link.route} activeClassName="active" activeStyle={{ color: 'limegreen' }} exact>{link.label}</NavLink>
              </NavItem>
            ))}
          </Nav>
          <LoginLink />
        </Collapse>
      </Navbar>
    );
  }
}
