// @flow

import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { NavLink } from 'react-router-dom';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';

import { APP_NAME } from '../../config';
import { REGISTER_PAGE_ROUTE, LOGIN_PAGE_ROUTE } from '../../routes';
import {
  fetchRequestCount,
  fetchFulfilledRequestCount,
  fetchMemberCount,
} from '../../action/index';

const styles = {
  hoverMe: {
    '&:hover': {
      color: 'red',
    },
  },
  primaryType: {
    fontSize: '3.44rem',
    lineHeight: '80%',
  },
  ternaryType: {
    fontWeight: '200',
  },
  stats: {
    height: '33vmin',
  },
  navItem: {
    width: '18vmin',
    height: '18vmin',
    minWidth: '30px',
    minHeight: '30px',
  },
  emphasis: {
    width: '22vmin',
    height: '22vmin',
    minWidth: '60px',
    minHeight: '60px',
  },
  '@media (max-width: 800px)': {
    primaryType: {
      fontSize: '2.94rem',
    },
    ternaryType: {
      fontSize: '1.50rem',
    },
    stats: {
      height: '240px',
    },
    emphasis: {
      minWidth: '180px',
      minHeight: '180px',
    },
  },
  '@media (max-width: 500px)': {
    primaryType: {
      fontSize: '2.54rem',
    },
    ternaryType: {
      fontSize: '1.08rem',
      color: '#6d948a !important',
    },
    stats: {
      height: '185px',
    },
    emphasis: {
      minWidth: '150px',
      minHeight: '150px',
    },
  },
  '@media (max-width: 450px)': {
    primaryType: {
      fontSize: '2.14rem',
    },
    ternaryType: {
      fontSize: '0.9rem',
    },
  },
  specialButton: {
    composes: ['btn', 'btn-primary'],
    backgroundColor: 'limegreen',
  },
};

type Props = {
  requestCount: number,
  requestFulfilledCount: number,
  usersOnlineCount: number,
  userCount: number,
  classes: any,
  dispatch: Function,
};

const mapStateToProps = state => ({
  requestCount: parseInt(state.requestActiveCount, 10),
  requestFulfilledCount: parseInt(state.requestFulfilledCount, 10),
  usersOnlineCount: parseInt(state.userStats.usersOnline, 10),
  userCount: parseInt(state.userCount, 10),
  visitorsOnlineCount: parseInt(state.userStats.visitorsOnline, 10),
});

class HomePage extends React.Component<Props> {
  constructor(props) {
    super(props);
    props.dispatch(fetchRequestCount());
    props.dispatch(fetchFulfilledRequestCount());
    props.dispatch(fetchMemberCount());
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchRequestCount());
    dispatch(fetchFulfilledRequestCount());
    dispatch(fetchMemberCount());
  }

  render() {
    const {
      requestCount,
      usersOnlineCount,
      requestFulfilledCount,
      userCount,
      classes,
    } = this.props;
    return (
      <Fragment>
        <Helmet
          meta={[
            { name: 'description', content: 'Hello App is an app to say hello' },
            { property: 'og:title', content: APP_NAME },
          ]}
        />
        <div className="jumbotron text-center">
          <h1
            className={`display-4 primaryType pt-5 ${classes.primaryType}`}
          >
            Community Aid Platform
          </h1>
          <h3
            className={`ternaryType pt-1 pb-0 mb-0 ${classes.ternaryType}`}
          >
            Making the world better, one aid request at a time
          </h3>
          <div className="container-fluid p-0 m-0">
            <div className="row">
              <ul
                className={`w-100 stats nav justify-content-around justify-content-md-center align-items-center flex-wrap flex-md-row flex-column align-content-center ${classes.stats}`}
              >
                <li className={`nav-item mx-1 ${classes.navItem}`}>
                  <span className="nav-link">
                    <span className="value">{userCount}</span>
                    <span className="description">Members</span>
                  </span>
                </li>
                <li className={`nav-item mx-1 ${classes.navItem}`}>
                  <span className="nav-link">
                    <span className="value">{usersOnlineCount}</span>
                    <span className="description">
Members
                      <br />
                      {' '}
online
                    </span>
                  </span>
                </li>
                <li className={`nav-item mx-1 emphasis ${classes.navItem} ${classes.emphasis}`}>
                  <span className="nav-link">
                    <span className="value">{requestCount}</span>
                    <span className="description">
Active
                      <br />
                      {' '}
Requests
                    </span>
                  </span>
                </li>
                <li className={`nav-item mx-1 ${classes.navItem}`}>
                  <span className="nav-link">
                    <span className="value">{requestFulfilledCount}</span>
                    <span className="description">
Fulfilled
                      <br />
                      {' '}
Requests
                    </span>
                  </span>
                </li>
                <li className={`nav-item mx-1 ${classes.navItem}`}>
                  <span className="nav-link">
                    <span className="value">112</span>
                    <span className="description">Responses</span>
                  </span>
                </li>
              </ul>

            </div>
          </div>
          <nav className="nav justify-content-center mt-4">
            <NavLink
              className="item nav-link border-right"
              to={LOGIN_PAGE_ROUTE}
              activeClassName="active"
              activeStyle={{ color: 'limegreen' }}
              exact
            >
              Sign in
            </NavLink>
            <NavLink
              className="item nav-link test-secondary secondaryType"
              to={REGISTER_PAGE_ROUTE}
              activeClassName="active"
              activeStyle={{ color: 'limegreen' }}
              exact
            >
              Sign up
            </NavLink>
          </nav>
        </div>
      </Fragment>
    );
  }
}
export default connect(mapStateToProps)(
  injectSheet(styles)(HomePage),
);
