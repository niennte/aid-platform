// @flow

import React, { Fragment } from 'react';
import { Switch } from 'react-router';
import { Route, withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import { APP_NAME } from './config';

import Nav from './component/nav';
import Aside from './component/aside';
import ChatNotification from './component/notifications/chat';
import HomePage from './component/page/home';
import NotFoundPage from './component/page/not-found';
import MapPage from './component/page/map';
import RequestPage from './component/page/request/list';
import RequestShowPage from './component/page/request/show';
import MessagePage from './component/page/message/list';
import MessageShowPage from './component/page/message/show';
import LoginPage from './component/page/login';
import RegisterPage from './component/page/register';
import PasswordRequestPage from './component/page/password/request-form';
import PasswordResetPage from './component/page/password/reset-form';
import {
  HOME_PAGE_ROUTE,
  MAP_PAGE_ROUTE,
  REQUEST_PAGE_ROUTE,
  REQUEST_SHOW_PAGE_ROUTE,
  MESSAGE_PAGE_ROUTE,
  MESSAGE_SHOW_PAGE_ROUTE,
  LOGIN_PAGE_ROUTE,
  REGISTER_PAGE_ROUTE,
  PASSWORD_REQUEST_PAGE_ROUTE,
  PASSWORD_RESET_PAGE_ROUTE,
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
          <Route exact path={REQUEST_PAGE_ROUTE} render={() => <RequestPage />} />
          <Route exact path={REQUEST_SHOW_PAGE_ROUTE} render={() => <RequestShowPage />} />
          <Route exact path={MESSAGE_PAGE_ROUTE} render={() => <MessagePage />} />
          <Route exact path={MESSAGE_SHOW_PAGE_ROUTE} render={() => <MessageShowPage />} />
          <Route path={LOGIN_PAGE_ROUTE} render={() => <LoginPage />} />
          <Route path={REGISTER_PAGE_ROUTE} render={() => <RegisterPage />} />
          <Route path={PASSWORD_REQUEST_PAGE_ROUTE} render={() => <PasswordRequestPage />} />
          <Route path={PASSWORD_RESET_PAGE_ROUTE} render={() => <PasswordResetPage />} />
          <Route component={NotFoundPage} />
        </Switch>
      </main>
    </div>
    <ChatNotification />
  </Fragment>
);

export default withRouter(connect(mapStateToProps)(App));
