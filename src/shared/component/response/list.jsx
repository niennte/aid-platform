// @flow

/* eslint-disable */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-autofocus */

import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { RESPONSE_PAGE_ROUTE } from '../../routes';
import { responses, response } from '../../data/responses';
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

class responseList extends Component<Props> {
  constructor(props) {
    super(props);
    // this.state = props.model;
    this.state = {
      responses: responses,
      response: response,
    };
  }

  navigateToShow = (e) => {
    e.preventDefault();
    const requestId = e.currentTarget.dataset.id;
    this.props.history.push(`${RESPONSE_PAGE_ROUTE}/${requestId}`)
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
    const { responses } = this.state;

    return (
      <main className="messageView">
        <section className="pt-5 pb-3 container d-flex justify-content-center">
          <div className="width-two-third">
            <nav className="nav justify-content-between mt-4 mb-2">
              <a
                className="item nav-link"
              >
                <h4 className="text-primary">Your responses</h4>
              </a>
            </nav>

            <table className="table table-bordered bg-white table-hover">
              <thead className="bg-info">
              <tr>
                <th colSpan="2">Response</th>
                <th colSpan="2">Request</th>
              </tr>
              </thead>
              <tbody>
              { responses.map((response) => {
                const { request } = response;
                const isDelivered = response.status === 'delivered';
                const isPosted = response.status === 'posted';
                const isFulfilled = response.fulfillment !== null;
                console.log(response.fulfillment);
                const isActive = request.status === 'active';
                const isPending = request.status === 'pending';
                return (
                  <tr
                    key={response.id}
                    data-id={response.id}
                    className={request.isFulfilled ? 'fulfilled' : 'unfulfilled'}
                    onClick={this.navigateToShow}
                  >
                    <td className="statusCell">
                      <span
                        className="infographicsContainer"
                      >
                        {isDelivered && (
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
                      {isPosted && (
                      <span className="infographicsContainer">
                        <span
                          className="responses iconContainer rounded-circle d-inline-block m-1"
                          style={{
                            border: `2px solid ${palette.softerOrange}`,
                            color: palette.seaGreen,
                            padding: '9px 5px',
                            minWidth: '52px',
                            marginTop: '5px',
                          }}
                        >
                          <img
                            alt="volunteer"
                            title="volunteer"
                            src={volunteerIconSrc(palette.softerOrange)}
                            style={{
                              width: '28px',
                              height: '28px',
                              marginLeft: '5px',
                            }}
                          />
                        </span>
                      </span>
                      )}
                    </td>
                    <td className="statusCell">
                      <p className="text-70 b-bottom">
                        {this.parseDate(request.posted)}
                      </p>
                      <p className="m-0 p-0">
                      {response.message}
                      </p>
                    </td>
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
                    </td>
                    <td>
                      <p className="text-70 b-bottom">
                        {this.parseDate(request.posted)}
                      </p>
                      <p className="m-0 p-0">
                        {request.title}
                      </p>
                      <p className="m-0 p-0 text-70">
                        {request.description}
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

export default withRouter(connect(mapStateToProps)(responseList));
