// @flow

import React, { Fragment } from 'react';
import { Switch } from 'react-router';
import { Route, withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import { APP_NAME } from './config';

import Nav from './component/layout/nav';
import Aside from './component/layout/aside';
import ChatNotification from './component/layout/notifications/chat';
import HomePage from './component/page/home';
import NotFoundPage from './component/page/not-found';
import MapPage from './component/page/map';
import RequestPage from './component/page/request/list';
import RequestShowPage from './component/page/request/show';
import RequestCreatePage from './component/page/request/create';
import RequestEditPage from './component/page/request/edit';
import ListingPage from './component/page/request/listing';
import ResponsePage from './component/page/response/list';
import ResponseShowPage from './component/page/response/show';
import MessagePage from './component/page/message/list';
import MessageShowPage from './component/page/message/show';
import MessageOutboxPage from './component/page/message/list-outbox';
import MessageCreatePage from './component/page/message/create';
import MessageOutboxShowPage from './component/page/message/show-outbox';
import LoginPage from './component/page/login';
import RegisterPage from './component/page/register';
import PasswordRequestPage from './component/page/password/request';
import PasswordResetPage from './component/page/password/reset';
import AccountPage from './component/page/account/show';
import AccountCreatePage from './component/page/account/create';
import {
  HOME_PAGE_ROUTE,
  MAP_PAGE_ROUTE,
  MAP_LISTING_PAGE_ROUTE,
  REQUEST_PAGE_ROUTE,
  REQUEST_SHOW_PAGE_ROUTE,
  REQUEST_CREATE_PAGE_ROUTE,
  REQUEST_EDIT_PAGE_ROUTE,
  RESPONSE_PAGE_ROUTE,
  RESPONSE_SHOW_PAGE_ROUTE,
  MESSAGE_PAGE_ROUTE,
  MESSAGE_SHOW_PAGE_ROUTE,
  MESSAGE_OUTBOX_PAGE_ROUTE,
  MESSAGE_OUTBOX_SHOW_PAGE_ROUTE,
  MESSAGE_CREATE_PAGE_ROUTE,
  LOGIN_PAGE_ROUTE,
  REGISTER_PAGE_ROUTE,
  PASSWORD_REQUEST_PAGE_ROUTE,
  PASSWORD_RESET_PAGE_ROUTE,
  ACCOUNT_PAGE_ROUTE,
  ACCOUNT_CREATE_PAGE_ROUTE,
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
          <Route exact path={MAP_PAGE_ROUTE} render={() => <MapPage />} />
          <Route exact path={MAP_LISTING_PAGE_ROUTE} render={() => <ListingPage />} />
          <Route exact path={REQUEST_PAGE_ROUTE} render={() => <RequestPage />} />
          <Route exact path={REQUEST_SHOW_PAGE_ROUTE} render={() => <RequestShowPage />} />
          <Route path={REQUEST_CREATE_PAGE_ROUTE} render={() => <RequestCreatePage />} />
          <Route path={REQUEST_EDIT_PAGE_ROUTE} render={() => <RequestEditPage />} />
          <Route exact path={RESPONSE_PAGE_ROUTE} render={() => <ResponsePage />} />
          <Route exact path={RESPONSE_SHOW_PAGE_ROUTE} render={() => <ResponseShowPage />} />
          <Route exact path={MESSAGE_PAGE_ROUTE} render={() => <MessagePage />} />
          <Route exact path={MESSAGE_SHOW_PAGE_ROUTE} render={() => <MessageShowPage />} />
          <Route path={MESSAGE_CREATE_PAGE_ROUTE} render={() => <MessageCreatePage />} />
          <Route
            exact
            path={MESSAGE_OUTBOX_PAGE_ROUTE}
            render={() => <MessageOutboxPage />}
          />
          <Route
            exact
            path={MESSAGE_OUTBOX_SHOW_PAGE_ROUTE}
            render={() => <MessageOutboxShowPage />}
          />
          <Route path={LOGIN_PAGE_ROUTE} render={() => <LoginPage />} />
          <Route path={REGISTER_PAGE_ROUTE} render={() => <RegisterPage />} />
          <Route path={PASSWORD_REQUEST_PAGE_ROUTE} render={() => <PasswordRequestPage />} />
          <Route path={PASSWORD_RESET_PAGE_ROUTE} render={() => <PasswordResetPage />} />
          <Route path={ACCOUNT_PAGE_ROUTE} render={() => <AccountPage />} />
          <Route path={ACCOUNT_CREATE_PAGE_ROUTE} render={() => <AccountCreatePage />} />
          <Route component={NotFoundPage} />
        </Switch>
      </main>
    </div>
    <ChatNotification />
  </Fragment>
);

export default withRouter(connect(mapStateToProps)(App));
