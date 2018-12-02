// @flow

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { REQUEST_PAGE_ROUTE } from '../../routes';
import { fetchRequestList } from '../../action/requests';
import fulfillIconSrc from '../common/svg/done-double-icon-src';
import volunteerIconSrc from '../common/svg/volunteer-icon-src';
import clockIconSrc from '../common/svg/clock-icon-src';
import colorCodeMarkers from '../common/color-code-markers';
import formatDate from '../common/format-date';
import palette from '../common/palette';

type Props = {
  authorization: string,
  dispatch: Function,
  requests: object,
  loadInProgress: boolean,
  history: any,
};

const mapStateToProps = state => ({
  authorization: state.user.authorization,
  requests: state.requestsOwn.list,
  loadInProgress: state.loading === 'requestsOwnList',
});

class requestList extends Component<Props> {
  constructor(props) {
    super(props);
    const { dispatch, authorization, loadInProgress } = props;
    dispatch(fetchRequestList(authorization));
    this.state = {
      requests: props.requests,
      loadInProgress,
    };
  }

  componentDidMount() {
    const { dispatch, authorization } = this.props;
    dispatch(fetchRequestList(authorization));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      requests: nextProps.requests,
      loadInProgress: nextProps.loadInProgress,
    });
  }

  navigateToShow = (e) => {
    const { history } = this.props;
    e.preventDefault();
    const requestId = e.currentTarget.dataset.id;
    history.push(`${REQUEST_PAGE_ROUTE}/${requestId}`);
  };

  render() {
    const { requests, loadInProgress } = this.state;
    const ready = !loadInProgress;

    return (
      <main className="messageView">
        <section className="pt-5 pb-3 container d-flex justify-content-center">
          <div className="width-two-third">
            <nav className="nav justify-content-between mt-4 mb-2">
              <h4 className="text-primary">Your requests</h4>
              <a
                className="item nav-link btn btn-lg btn-secondary mr-4 text-white"
                href="create-request"
              >
                New
              </a>
            </nav>

            { loadInProgress && (
              <p className="lead text-center pt-md-3 pt-lg-5">
                Loading...
              </p>
            )}

            { (requests.length > 0) ? (
              <table className="table table-bordered bg-white table-hover">
                <tbody>
                  { requests.map((request) => {
                    const { isFulfilled } = request;
                    const isActive = request.status === 'active' && !isFulfilled;
                    const isPending = request.status === 'pending';
                    return (
                      <tr
                        key={request.id}
                        data-id={request.id}
                        className={request.isFulfilled ? 'fulfilled' : 'unfulfilled'}
                        onClick={this.navigateToShow}
                      >
                        <td className="statusCell">
                          <span
                            className="infographicsContainer"
                          >
                            {isActive && (
                            <span
                              className="fulfillment iconContainer rounded-circle d-inline-block p-0 m-1"
                            >
                              <img
                                className="iconImage rounded-circle "
                                alt="active"
                                title="active"
                                src={colorCodeMarkers(request.type)}
                                style={{
                                  width: '50px',
                                  height: '50px',
                                }}
                              />
                            </span>
                            )}
                            {isPending && (
                            <span
                              className="fulfillment iconContainer rounded-circle d-inline-block p-0 m-1"
                            >
                              <img
                                className="iconImage rounded-circle "
                                alt="active"
                                title="active"
                                src={clockIconSrc(palette.milderYellow)}
                                style={{
                                  width: '50px',
                                  height: '50px',
                                }}
                              />
                            </span>
                            )}
                            {isFulfilled && (
                            <span
                              className="fulfillment iconContainer rounded-circle d-inline-block p-0 m-1"
                            >
                              <img
                                className="iconImage rounded-circle"
                                alt="fulfillment"
                                title="fulfillment"
                                src={fulfillIconSrc(palette.seaGreen)}
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  border: `2px solid ${palette.seaGreen}`,
                                  padding: '10px',
                                }}
                              />
                            </span>
                            )}
                          </span>
                          <span className="infographicsContainer">
                            <span
                              className="responses iconContainer rounded-circle d-inline-block"
                              style={{
                                border: `2px solid ${palette.seaGreen}`,
                                color: palette.seaGreen,
                                padding: '9px 5px',
                                minWidth: '52px',
                                marginTop: '5px',
                              }}
                            >
                              <img
                                alt="volunteer"
                                title="volunteer"
                                src={volunteerIconSrc(palette.seaGreen)}
                                style={{
                                  width: '28px',
                                  height: '28px',
                                }}
                              />
                              {request.numResponses}
                            </span>
                          </span>
                        </td>
                        <td>
                          <p className="m-0 p-0">
                            {request.title}
                          </p>
                          <p className="m-0 p-0 text-70">
                            {request.description}
                          </p>
                        </td>
                        <td className="requestInfoCell d-none d-md-table-cell">
                          <p className="m-0 p-0 text-70">
                            <span className="ternaryType text-70">
                              {formatDate(request.created)}
                            </span>
                          </p>
                          <p className="ternaryType m-0 p-0 text-70">
                          One time task
                          </p>
                          <p className="ternaryType m-0 p-0 text-70">
                          Status:
                            {' '}
                            {request.status}
                          </p>
                        </td>
                      </tr>
                    );
                  })
                }
                </tbody>
              </table>
            ) : (ready
              && (
                <p className="lead text-center pt-md-3 pt-lg-5">
                  You have no requests.
                </p>
              )
            )}
          </div>
        </section>
      </main>
    );
  }
}

export default withRouter(connect(mapStateToProps)(requestList));
