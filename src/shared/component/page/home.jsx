// @flow

import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';

import { APP_NAME } from '../../config';
import { fetchRequestCount } from '../../action/index';

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
  classes: Object,
  requestCount: number,
  dispatch: Function,
};

const mapStateToProps = state => ({
  requestCount: state.requestActiveCount,
});

class HomePage extends React.Component<Props> {
  constructor(props) {
    super(props);
    props.dispatch(fetchRequestCount());
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchRequestCount());
  }

  render() {
    const { classes, requestCount } = this.props;
    return (
      <Fragment>
        <Helmet
          meta={[
            { name: 'description', content: 'Hello App is an app to say hello' },
            { property: 'og:title', content: APP_NAME },
          ]}
        />
        <p>Home</p>
        <h3 className="mb-3">
          {`Active requests: ${requestCount}`}
        </h3>
        <p className={classes.hoverMe}>Hover me.</p>
        <p className={classes.resizeMe}>Resize the window.</p>
        <button type="button" className={classes.specialButton}>Composition</button>
      </Fragment>
    );
  }
}
export default connect(mapStateToProps)(
  injectSheet(styles)(HomePage),
);
