// @flow

import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
} from 'reactstrap';

import {
  HOME_PAGE_ROUTE,
  REQUEST_PAGE_ROUTE,
  RESPONSE_PAGE_ROUTE,
  MESSAGE_PAGE_ROUTE,
  MAP_PAGE_ROUTE,
} from '../../routes';
import LoginLink from './login-link';
import ChatLink from './chat-link';

type Props = {
  loggedIn: boolean,
};


const publicRoutes = {
  home: { route: HOME_PAGE_ROUTE, label: 'Home' },
  navLinks: [],
};

const privateRoutes = {
  home: { route: MAP_PAGE_ROUTE, label: 'Map' },
  navLinks: [
    { route: REQUEST_PAGE_ROUTE, label: 'Requests' },
    { route: RESPONSE_PAGE_ROUTE, label: 'Responses' },
    { route: MESSAGE_PAGE_ROUTE, label: 'Messages' },
  ],
};

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
});

class NavbarReactstrap extends React.Component<Props> {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      routes: publicRoutes,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { loggedIn } = nextProps;
    if (loggedIn) {
      this.setState({
        routes: privateRoutes,
      });
    } else {
      this.setState({
        routes: publicRoutes,
      });
    }
  }

  toggle() {
    this.setState(prevState => (
      { isOpen: !prevState.isOpen }
    ));
  }

  render() {
    const { isOpen, routes } = this.state;
    return (
      <Navbar className="bg-info" light expand="md" fixed="top">
        <NavLink
          className="navbar-brand text-white"
          to={routes.home.route}
          activeClassName="active"
          exact
        >
          {routes.home.label}
        </NavLink>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mx-auto" navbar>
            { routes.navLinks.map(link => (
              <NavItem key={link.route}>
                <NavLink className="nav-link text-white" to={link.route} activeClassName="text-white active" exact>{link.label}</NavLink>
              </NavItem>
            )) }
            <ChatLink />
          </Nav>
          <LoginLink />
        </Collapse>
      </Navbar>
    );
  }
}

export default withRouter(connect(mapStateToProps)(NavbarReactstrap));
