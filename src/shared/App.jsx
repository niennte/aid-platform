// @flow

import React, { Fragment } from 'react';
import { Switch } from 'react-router';
import { Route, withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import { APP_NAME } from './config';

import Nav from './component/nav';
import Aside from './component/aside';
import Notification from './component/notification';
import HomePage from './component/page/home';
import NotFoundPage from './component/page/not-found';
import MapPage from './component/page/map';
import RequestPage from './component/page/request';
import MessagePage from './component/page/message';
import LoginPage from './component/page/login';
import RegisterPage from './component/page/register';
import {
  HOME_PAGE_ROUTE,
  MAP_PAGE_ROUTE,
  REQUEST_PAGE_ROUTE,
  MESSAGE_PAGE_ROUTE,
  LOGIN_PAGE_ROUTE,
  REGISTER_PAGE_ROUTE,
} from './routes';

type Props = {
  asideOpen: boolean,
  loggedIn: boolean,
};

const mapStateToProps = state => ({
  asideOpen: state.layout.asideOpen,
  loggedIn: state.user.loggedIn,
});

const App = ({ asideOpen, loggedIn }: Props) => (
  <Fragment>
    <Helmet titleTemplate={`%s | ${APP_NAME}`} defaultTitle={APP_NAME} />
    <Nav />
    <div className={`layout ${asideOpen ? 'asideOpen' : 'asideClosed'} ${loggedIn ? 'loggedInView' : 'publicView'}`}>
      <Aside />
      <main className="page">
        <h1 className="d-none">{APP_NAME}</h1>
        <Switch>
          <Route exact path={HOME_PAGE_ROUTE} render={() => <HomePage />} />
          <Route path={MAP_PAGE_ROUTE} render={() => <MapPage />} />
          <Route path={REQUEST_PAGE_ROUTE} render={() => <RequestPage />} />
          <Route path={MESSAGE_PAGE_ROUTE} render={() => <MessagePage />} />
          <Route path={LOGIN_PAGE_ROUTE} render={() => <LoginPage />} />
          <Route path={REGISTER_PAGE_ROUTE} render={() => <RegisterPage />} />
          <Route component={NotFoundPage} />
        </Switch>
      </main>
    </div>
    <Notification />
  </Fragment>
);

export default withRouter(connect(mapStateToProps)(App));
