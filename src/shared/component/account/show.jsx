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

  componentWillReceiveProps(nextProps) {
    const { account } = nextProps;
    if (this.isVerified(account)) {
      // js-app base-bg
      document.body.classList.add('verifiedUser');
    }
  }

  isVerified = account => (
    account.pic_url && account.pic_url !== '/pics/original/missing.png'
    && account.first_name
    && account.last_name
  );

  render() {
    const {
      loadInProgress,
    } = this.state;
    const { account } = this.props;
    const picUrl = account.pic_url ? `https:${account.pic_url}` : null;
    // /pics/original/missing.png - check for the defaults


    const hasData = this.isVerified(account);
    const AccountNav = () => (
      <React.Fragment>
        <p>
          Your account hasn&rsquo;t been verified yet.
        </p>
        <NavLink
          className="text-white btn btn-secondary btn-lg"
          to={ACCOUNT_CREATE_PAGE_ROUTE}
          activeClassName="active"
          activeStyle={{ color: 'limegreen' }}
          exact
        >
          Verify
        </NavLink>
      </React.Fragment>
    );

    return (
      <main className="accountView h-100">
        { loadInProgress && (
          <TextLoader />
        )}
        <section className="h-100 pt-5 pb-3 container d-flex justify-content-center">
          <div className="width-two-third">
            <div className="card position-relative">
              { hasData ? (
                <div className="card-body">
                  <h4 className="card-title text-primary">
                    Your account
                  </h4>
                  <hr />
                  <p className="lead">
                    First name:
                    {' '}
                    <span className="primaryType font-weight-bold">
                      { account.first_name ? account.first_name : 'Not provided' }
                    </span>
                  </p>
                  <p className="lead">
                    Last name:
                    {' '}
                    <span className="primaryType font-weight-bold">
                      { account.last_name ? account.last_name : 'Not provided' }
                    </span>
                  </p>
                  <p className="lead">
                    Government issued ID:
                    {' '}
                    {picUrl ? (
                      <React.Fragment>
                        <span className="text-success font-weight-bold">
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
              ) : (
                <div className="card-body">
                  <h4 className="card-title text-primary">
                    AccountVerification
                  </h4>
                  <hr />
                  <AccountNav />
                </div>
              )
              }
            </div>

          </div>
        </section>
      </main>
    );
  }
}

export default withRouter(connect(mapStateToProps)(messageShow));
