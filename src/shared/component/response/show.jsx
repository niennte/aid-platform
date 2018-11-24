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
import { requestOwn, requestOwnActive, requestOwnPending } from '../../data/requests';
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
      request: requestOwnPending,
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
    const { request } = this.state;
    const isFulfilled = Object.keys(request.fulfillment).length > 0;
    const isActive = request.status === 'active';
    const isPending = request.status === 'pending';
    const isClosed = request.status === 'closed';
    const userName = 'Arcenciel';

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
        <a
          className={`item nav-link border-right ml-auto textInfo ${isClosed && 'disabled'}`}
          href="#"
        >
          Edit
        </a>
        <a
          className={`item nav-link textInfo ${isPending || 'disabled'}`}
          href="#"
          disabled={!isActive}
        >
          Publish
        </a>

      </nav>
    );

    return (
      <main className="responseView ">
        <section className="pt-5 pb-3 container-fluid">
          <div className="width-two-third mx-auto">
            <RequestNav />
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
                      src={colorCodeMarkers(requestOwnActive.type)}
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
                  {request.responses.length > 0 && (
                    <span
                      className="responses iconContainer rounded-circle d-inline-block ml-2"
                      style={{
                        border: `3px solid ${palette.seaGreen}`,
                        color: palette.seaGreen,
                        padding: '13px 9px',
                      }}
                    >
                    <img
                      alt="volunteer"
                      title="volunteer"
                      src={volunteerIconSrc(palette.seaGreen)}
                      style={{
                        width: '45px',
                        height: '45px',
                      }}
                    />
                      {request.responses.length}
                  </span>
                  )}
                </span>
                <p className="primaryType m-0 p-0 text-right">{userName}</p>
                <p className="m-0 p-0 text-right">
                  <span className="ternaryType text-70">
                    {this.parseDate(request.created)}
                  </span>
                </p>
                <p className="ternaryType m-0 p-0 text-right">
                  One time task
                </p>
                <p className="ternaryType m-0 p-0 text-right">
                  Status: {request.status}
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

            <div className="container-fluid">
              <div className="row pt-3">
                <div className="col-12 col-md-6 order-2 order-md-1">
                  <h5 className="card-title textInfo text-center">
                    Responses
                  </h5>
                  <ul
                    className="responses list-unstyled"
                  >
                    {
                      request.responses.map(response => {
                        const isDelivered = response.status === 'delivered';
                        return (
                          <li
                            className={`${response.status} mb-3`}
                            key={response.id}
                          >
                            <div className="card position-relative">
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
                                {isDelivered && (
                                  <span
                                    className="infographicsContainer pr-3"
                                    style={{
                                      position: 'absolute',
                                      right: '0',
                                    }}
                                  >
                        <img
                          alt="fulfillment"
                          title="fulfillment"
                          src={fulfillIconSrc(palette.seaGreen)}
                          style={{
                            width: '38px',
                            height: '38px',
                          }}
                        />
                      </span>
                                )}

                                <p className="primaryType m-0 p-0 pl-5 ">User{response.user_id}</p>
                                <p className="ternaryType m-0 p-0 pl-5 text-70">{this.parseDate(response.created_at)}</p>
                                <hr />
                                <blockquote className="lead text-center">
                                  {response.message}
                                </blockquote>
                                <p className="text-center">
                                  {isFulfilled ||
                                  <nav className="w-100 nav justify-content-center m-0">
                                    <button
                                      type="button"
                                      className="item nav-link btn btn-light btn-sm p-2 mr-2"
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
                                      className="item nav-link btn btn-light btn-sm p-2 mr-auto disabled"
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
                                    <button
                                      className="btn btn-secondary p-2 ml-auto text-white"
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
                                </p>
                              </div>
                            </div>
                          </li>
                        )
                      })
                    }
                    {
                      !request.responses.length &&
                      (
                        <li
                          className="empty mb-3"
                        >
                          <div className="card position-relative">
                            <div className="card-body">
                              <blockquote className="lead text-muted text-center">
                                This request has no responses yet.
                              </blockquote>
                            </div>
                          </div>
                        </li>

                      )
                    }
                  </ul>
                </div>

                <div className="col-12 col-md-6 order-1 order-md-2">
                  <h5 className="card-title textInfo text-center">
                    Status
                  </h5>
                  <div className="card position-relative">
                    <div className="card-body">
                      { request.isFulfilled ?
                        (
                          <React.Fragment>
                            <p className="primaryType m-0 p-0 text-center">
                              User{request.fulfillment.user_id}
                            </p>
                            <p className="ternaryType m-0 p-0 text-center text-70">{this.parseDate(request.fulfillment.created_at)}</p>
                            <hr />
                            <blockquote className="lead text-center">
                              {request.fulfillment.message}
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

          </div>
        </section>
      </main>
    );
  }
}

export default connect(mapStateToProps)(ResponseShow);
