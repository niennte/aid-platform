// @flow

import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';

import { APP_NAME } from '../../config';
import { fetchRequestCount, fetchFulfilledRequestCount } from '../../action/index';

const styles = {
  hoverMe: {
    '&:hover': {
      color: 'red',
    },
  },
  '@media (max-width: 800px)': {
    resizeMe: {
      color: 'red',
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
  dispatch: Function,
};

const mapStateToProps = state => ({
  requestCount: state.requestActiveCount,
  requestFulfilledCount: parseInt(state.requestFulfilledCount, 10),
  usersOnlineCount: state.userStats.usersOnline,
  visitorsOnlineCount: state.userStats.visitorsOnline,
});

class HomePage extends React.Component<Props> {
  constructor(props) {
    super(props);
    props.dispatch(fetchRequestCount());
    props.dispatch(fetchFulfilledRequestCount());
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchRequestCount());
  }

  render() {
    const {
      requestCount, usersOnlineCount, requestFulfilledCount,
    } = this.props;
    return (
      <Fragment>
        <Helmet
          meta={[
            { name: 'description', content: 'Hello App is an app to say hello' },
            { property: 'og:title', content: APP_NAME },
          ]}
        />
        <div className="jumbotron">
          <h1>Community Aid Platform</h1>
          <h4 className="mb-3">
            {`Fulfilled requests: ${requestFulfilledCount}`}
          </h4>

          <h4 className="mb-3">
            {`Active requests: ${requestCount}`}
          </h4>
          <h4 className="mb-3">
            {`Members: [${555}]`}
          </h4>
          { usersOnlineCount > 0
          && (
          <h4 className="mb-3">
            {`Members online now: ${usersOnlineCount}`}
          </h4>
          )
          }
        </div>
      </Fragment>
    );
  }
}
export default connect(mapStateToProps)(
  injectSheet(styles)(HomePage),
);
