// @flow

import React, { Fragment } from 'react';
import { Switch } from 'react-router';
import { Route, withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import { APP_NAME } from './config';

import Nav from './component/nav';
import Aside from './component/aside';
import HomePage from './component/page/home';
import NotFoundPage from './component/page/not-found';
import ChatPage from './component/page/chat';
import MapPage from './component/page/map';
import {
  HOME_PAGE_ROUTE,
  CHAT_PAGE_ROUTE,
  MAP_PAGE_ROUTE,
} from './routes';

type Props = {
  asideOpen: boolean,
};

const mapStateToProps = state => ({
  asideOpen: state.layout.asideOpen,
});

const App = ({ asideOpen }: Props) => (
  <Fragment>
    <Helmet titleTemplate={`%s | ${APP_NAME}`} defaultTitle={APP_NAME} />
    <Nav />
    <div className={`layout ${asideOpen && ('asideOpen')}`}>
      <Aside />
      <main className="page">
        <h1 className="d-none">{APP_NAME}</h1>
        <Switch>
          <Route exact path={HOME_PAGE_ROUTE} render={() => <HomePage />} />
          <Route path={CHAT_PAGE_ROUTE} render={() => <ChatPage />} />
          <Route path={MAP_PAGE_ROUTE} render={() => <MapPage />} />
          <Route component={NotFoundPage} />
        </Switch>
      </main>
    </div>

  </Fragment>
);

export default withRouter(connect(mapStateToProps)(App));
