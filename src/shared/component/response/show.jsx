// @flow

/* eslint-disable */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-autofocus */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';


import { RESPONSE_PAGE_ROUTE } from '../../routes';
import RequestMap from '../request/map';
import { responses, response, responseActive, responsePending } from '../../data/responses';
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

class ResponseShow extends Component<Props> {
  constructor(props) {
    super(props);
    // this.state = props.model;
    this.state = {
      response: responsePending,
    };
  }

  handleLink = (e) => {
    e.preventDefault();
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
    const { response } = this.state;
    const { request, fulfillment } = response;
    const isFulfilled = response.fulfillment !== null;
    const isActive = request.status === 'active';
    const isPending = request.status === 'pending';
    const isClosed = request.status === 'closed';
    const userName = 'Arcenciel';

    const isDelivered = response.status === 'delivered';

    const RequestNav = () => (
      <nav className="nav justify-content-between mt-4 mb-2">
        <NavLink
          className="item nav-link textInfo"
          to={RESPONSE_PAGE_ROUTE}
          activeClassName="active"
          activeStyle={{ color: 'limegreen' }}
          exact
        >
          Back
        </NavLink>
        <NavLink
          className="item nav-link textInfo ml-auto border-left border-right"
          to={`${RESPONSE_PAGE_ROUTE}/${request.id - 1}`}
          activeClassName="active"
          activeStyle={{ color: 'limegreen' }}
          exact
        >
          &laquo;
        </NavLink>
        <NavLink
          className="item nav-link textInfo mr-auto border-right"
          to={`${RESPONSE_PAGE_ROUTE}/${request.id + 1}`}
          activeClassName="active"
          activeStyle={{ color: 'limegreen' }}
          exact
        >
          &raquo;
        </NavLink>

      </nav>
    );

    return (
      <main className="responseView ">
        <section className="pt-5 pb-3 container-fluid">
          <div className="width-two-third mx-auto">
            <RequestNav />

            <div className="container-fluid mb-3">
              <div className="row pt-3 row-eq-height">
                <div className="col-12 col-md-6">
                  <div className="card position-relative h-100">
                    <div className="card-body">
                <span
                  className="infographicsContainer pl-0 ml-0"
                  style={{
                    position: 'absolute',
                  }}
                >
                  <img
                    className="iconImage"
                    alt="volunteer"
                    title="volunteer"
                    src={volunteerIconSrc(palette.seaBlue)}
                    style={{
                      width: '45px',
                      height: '45px',
                    }}
                  />
                </span>


                      <p className="primaryType m-0 p-0 pl-5 ">Your response</p>
                      <p className="ternaryType m-0 p-0 pl-5 text-70">{this.parseDate(response.posted)}</p>
                      <hr />
                      <blockquote className="lead text-center">
                        {response.message}
                      </blockquote>

                      {isDelivered && (
                        <p className="text-center">
                        <span
                          className="fulfillment iconContainer rounded-circle d-inline-block p-3 "
                          style={{
                            border: `1px solid ${palette.seaGreen}`,
                          }}
                        >
                          <img
                            className="iconImage rounded-circle"
                            alt="fulfillment"
                            title="fulfillment"
                            src={fulfillIconSrc(palette.seaGreen)}
                            style={{
                              width: '40px',
                              height: '40px',
                            }}
                          />
                        </span>
                        </p>
                      )}
                      {isFulfilled ||
                      <nav className="w-100 nav justify-content-center m-0">
                        <button
                          className="btn btn-secondary p-2 text-white"
                          type="button"
                          style={{

                          }}
                        >Done
                          <img
                            alt="fulfillment"
                            title="fulfillment"
                            src={fulfillIconSrc('#fff')}
                            style={{
                              width: '28px',
                              height: '28px',
                              paddingLeft: '5px',
                            }}
                          />
                        </button>
                      </nav>
                      }
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="card position-relative h-100">
                    <div className="card-body">
                      { isFulfilled ?
                        (
                          <React.Fragment>
                            <p className="primaryType m-0 p-0 text-center">
                              User{fulfillment.userId}
                            </p>
                            <p className="ternaryType m-0 p-0 text-center text-70">{this.parseDate(fulfillment.posted)}</p>
                            <hr />
                            <blockquote className="lead text-center">
                              {fulfillment.message}
                            </blockquote>
                            <p className="text-center">
                        <span
                          className="fulfillment iconContainer rounded-circle d-inline-block p-3"
                          style={{
                            border: `1px solid ${palette.seaGreen}`,
                          }}
                        >
                          <img
                            className="iconImage rounded-circle"
                            alt="fulfillment"
                            title="fulfillment"
                            src={fulfillIconSrc(palette.seaGreen)}
                            style={{
                              width: '40px',
                              height: '40px',
                            }}
                          />
                        </span>
                            </p>
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <blockquote className="lead text-muted text-center">
                              This request is not yet fulfilled.
                            </blockquote>
                            {isPending && (
                              <p className="text-center">
                      <span
                        className="fulfillment iconContainer rounded-circle d-inline-block p-0 p-1"
                      >
                      <img
                        className="iconImage rounded-circle "
                        alt="active"
                        title="active"
                        src={clockIconSrc(palette.milderYellow)}
                        style={{
                          width: '77px',
                          height: '77px',
                        }}
                      />
                    </span>
                              </p>
                            )}
                          </React.Fragment>
                        ) }
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container-fluid">

            <div className={`card position-relative ${isFulfilled ? 'fulfilled' : 'unfulfilled'}`}>
              <div className="card-body">
                <span
                  className="infographicsContainer"
                  style={{
                    position: 'absolute',
                  }}
                >
                  {isActive && (
                    <span
                      className="fulfillment iconContainer rounded-circle d-inline-block p-0 p-1"
                    >
                    <img
                      className="iconImage rounded-circle "
                      alt="active"
                      title="active"
                      src={colorCodeMarkers(request.type)}
                      style={{
                        width: '77px',
                        height: '77px',
                      }}
                    />
                  </span>
                  )}
                  {isPending && (
                    <span
                      className="fulfillment iconContainer rounded-circle d-inline-block p-0 p-1"
                    >
                    <img
                      className="iconImage rounded-circle "
                      alt="active"
                      title="active"
                      src={clockIconSrc(palette.milderYellow)}
                      style={{
                        width: '77px',
                        height: '77px',
                      }}
                    />
                  </span>
                  )}
                  {isFulfilled && (
                    <span
                      className="fulfillment iconContainer rounded-circle d-inline-block p-3"
                      style={{
                        border: `3px solid ${palette.seaGreen}`,
                      }}
                    >
                    <img
                      className="iconImage rounded-circle"
                      alt="fulfillment"
                      title="fulfillment"
                      src={fulfillIconSrc(palette.seaGreen)}
                      style={{
                        width: '40px',
                        height: '40px',
                      }}
                    />
                  </span>
                  )}

                </span>
                {isFulfilled || (
                <nav className="nav justify-content-center m-0">
                  <button
                    type="button"
                    className="item nav-link btn btn-light btn-sm p-2 mr-2 ml-auto"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <img
                      src={messageIconSrc}
                      alt="message"
                      style={{
                        width: '28px',
                        height: '28px',
                      }}
                    />
                  </button>
                  <button
                    type="button"
                    className="item nav-link btn btn-light btn-sm p-2 disabled"
                    disabled
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <img
                      src={chatIconSrc}
                      alt="Chat"
                      style={{
                        width: '28px',
                        height: '28px',
                      }}
                    />
                  </button>
                </nav>
                )}
                <p className="primaryType m-0 p-0 text-right">{userName}</p>
                <p className="m-0 p-0 text-right">
                  <span className="ternaryType text-70">
                    {this.parseDate(request.created)}
                  </span>
                </p>

                <h4 className="card-title text-primary">
                  {request.title}
                </h4>
                <hr />
                <blockquote className="lead">
                  {request.description}
                </blockquote>
                <address className="text-muted" style={{
                  fontSize: '80%',
                }}>
                  {request.fullAddress}
                </address>
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '250px',
                }}>
                  <RequestMap />
                </div>
              </div>
            </div>
          </div>

          </div>
        </section>
      </main>
    );
  }
}

export default connect(mapStateToProps)(ResponseShow);
