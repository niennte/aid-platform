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
import NotificationBadge from 'react-notification-badge';

import {
  HOME_PAGE_ROUTE,
  REQUEST_PAGE_ROUTE,
  RESPONSE_PAGE_ROUTE,
  MESSAGE_PAGE_ROUTE,
  MAP_PAGE_ROUTE,
} from '../../routes';
import LoginLink from './login-link';
import ChatLink from './chat-link';
import palette from '../common/palette';

type Props = {
  loggedIn: boolean,
  messageNewCount: number,
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
  messageNewCount: state.messaging.newCount,
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
    const { messageNewCount } = this.props;
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
                <NavLink className="nav-link text-white position-relative" to={link.route} activeClassName="text-white active" exact>
                  {link.label}
                  {link.label === 'Messages' && (
                    <NotificationBadge
                      count={messageNewCount}
                      effect={['scale(1.6, 1.6)', 'scale(1, 1)', { background: palette.navBadgeBright }, { background: palette.navBadge }]}
                      style={{
                        background: '#9cc19c',
                      }}
                      containerStyle={{
                        position: 'absolute',
                        width: '25px',
                        top: '14px',
                        left: '83px',
                      }}
                    />
                  )}
                </NavLink>
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
