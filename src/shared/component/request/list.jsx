// @flow

/* eslint-disable */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-autofocus */

import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { REQUEST_PAGE_ROUTE } from '../../routes';
import { requestsOwn, requestOwn, requestOwnActive } from '../../data/requests';
import fulfillIconSrc from '../common/svg/done-double-icon-src';
import volunteerIconSrc from '../common/svg/volunteer-icon-src';
import messageIconSrc from '../common/svg/message-icon-src';
import chatIconSrc from '../common/svg/chat-icon-src';
import clockIconSrc from '../common/svg/clock-icon-src';
import colorCodeMarkers from '../common/color-code-markers';
import palette from '../common/palette';

type Props = {
  model: Object,
  hasErrors: boolean,
  errorMessage: string,
  errors: Object,
  hasInfos: boolean,
  infoMessage: string,
  infoType: string,
  dispatch: Function,
};

const mapStateToProps = state => ({
  model: state.forms.signup,
  hasErrors: state.errors.signup.hasErrors,
  errorMessage: state.errors.signup.errorMessage,
  errors: state.errors.signup.errors,
  hasInfos: state.infos.signup.hasInfos,
  infoMessage: state.infos.signup.message,
  infoType: state.infos.signup.infoType,
});

class requestList extends Component<Props> {
  constructor(props) {
    super(props);
    // this.state = props.model;
    this.state = {
      requests: requestsOwn,
      request: requestOwn,
    };
  }

  navigateToRequest = (e) => {
    e.preventDefault();
    console.log(e.currentTarget.dataset)
    const requestId = e.currentTarget.dataset.id;
    this.props.history.push(`${REQUEST_PAGE_ROUTE}/${requestId}`)
  };

  parseDate = (date) => {
    const options = {
      year: '2-digit',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    const dateTimestamp = Date.parse(date);
    return new Date(dateTimestamp).toLocaleDateString('en-US', options);
  };

  render() {
    const { requests } = this.state;

    return (
      <main className="messageView">
        <section className="pt-5 pb-3 container d-flex justify-content-center">
          <div className="width-two-third">
            <nav className="nav justify-content-between mt-4 mb-2">
              <a
                className="item nav-link"
              >
                <h4 className="text-primary">Your requests</h4>
              </a>
              <a
                className="item nav-link btn btn-lg btn-secondary mr-4 text-white"
                href="#"
              >
                New
              </a>
            </nav>

            <table className="table table-bordered bg-white table-hover">
              <tbody>
              { requests.map((request) => {
                const isFulfilled = request.isFulfilled;
                const isActive = request.status === 'active';
                const isPending = request.status === 'pending';
                const isClosed = request.status === 'closed';
                return (
                  <tr
                    key={request.id}
                    data-id={request.id}
                    className={request.isFulfilled ? 'fulfilled' : 'unfulfilled'}
                    onClick={this.navigateToRequest}
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
                            src={colorCodeMarkers(requestOwnActive.type)}
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
                        {request.numResponses > 0 && (
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
                        )}
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
                    {this.parseDate(request.created)}
                  </span>
                      </p>
                      <p className="ternaryType m-0 p-0 text-70">
                        One time task
                      </p>
                      <p className="ternaryType m-0 p-0 text-70">
                        Status: {request.status}
                      </p>
                    </td>
                  </tr>
                );
              })
              }
              </tbody>
            </table>
          </div>
        </section>
      </main>
    );
  }
}

export default withRouter(connect(mapStateToProps)(requestList));
