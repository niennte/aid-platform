// @flow

import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import { ACCOUNT_CREATE_PAGE_ROUTE } from '../../routes';
import { fetchAccount } from '../../action/account';
// import actionCreators from '../../action/index';
// import formatDate from '../common/format-date';
import TextLoader from '../common/loaders/text-loader';


type Props = {
  authorization: string,
  loadInProgress: boolean,
  account: object,
  dispatch: Function,
};

const mapStateToProps = state => ({
  authorization: state.user.authorization,
  account: state.account,
  loadInProgress: state.loading === 'account',
});

class messageShow extends Component<Props> {
  constructor(props) {
    super(props);
    const { loadInProgress, dispatch, authorization } = props;
    this.state = {
      loadInProgress,
    };
    dispatch(fetchAccount(authorization));
  }

  render() {
    const {
      loadInProgress,
    } = this.state;
    const { account } = this.props;
    const picUrl = account.pic_url ? `https:${account.pic_url}` : null;
    // /pics/original/missing.png - check for the defaults


    const hasData = true;
    const AccountNav = () => (
      <nav className="nav justify-content-between mt-4 mb-2">
        <NavLink
          className="item nav-link text-info"
          to={ACCOUNT_CREATE_PAGE_ROUTE}
          activeClassName="active"
          activeStyle={{ color: 'limegreen' }}
          exact
        >
          Create
        </NavLink>
      </nav>
    );

    return (
      <main className="accountView h-100">
        { loadInProgress && (
          <TextLoader />
        )}
        <section className="h-100 pt-5 pb-3 container d-flex justify-content-center">
          <div className="width-two-third">
            <AccountNav />
            <div className="card position-relative">
              { hasData && (
                <div className="card-body">
                  <h4 className="card-title text-primary">
                    Account verification
                  </h4>
                  <hr />
                  <p className="lead">
                    First name:
                    {' '}
                    <span className="primaryType">
                    { account.first_name ? account.first_name : 'Not provided' }
                    </span>
                  </p>
                  <p className="lead">
                    Last name:
                    {' '}
                    <span className="primaryType">
                    { account.last_name ? account.last_name : 'Not provided' }
                    </span>
                  </p>
                  <p className="lead">
                    Government issued ID:
                    {' '}
                    {picUrl ? (
                      <React.Fragment>
                        <span className="text-success">
                          Verified
                        </span>
                        <hr />
                        <a
                          href={picUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Uploaded Id
                        </a>
                      </React.Fragment>
                    ) : ('Not verified')}
                  </p>

                </div>
              )}
            </div>
            <AccountNav />
          </div>
        </section>
      </main>
    );
  }
}

export default withRouter(connect(mapStateToProps)(messageShow));
