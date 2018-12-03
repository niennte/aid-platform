// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter, Redirect } from 'react-router-dom';


import { RESPONSE_PAGE_ROUTE } from '../../routes';
import RequestMap from '../request/map';
import fulfillIconSrc from '../common/svg/done-double-icon-src';
import volunteerIconSrc from '../common/svg/volunteer-icon-src';
import messageIconSrc from '../common/svg/message-icon-src';
import chatIconSrc from '../common/svg/chat-icon-src';
import clockIconSrc from '../common/svg/clock-icon-src';
import colorCodeMarkers from '../common/color-code-markers';
import formatDate from '../common/format-date';
import palette from '../common/palette';

type Props = {
  authorization: string,
  dispatch: Function,
  match: any,
  responses: object,
  loadInProgress: boolean,
};

const mapStateToProps = state => ({
  authorization: state.user.authorization,
  responses: state.responsesOwn.list,
  loadInProgress: state.loading === 'responseOwn',
});

class ResponseShow extends Component<Props> {
  constructor(props) {
    super(props);
    const { responses, loadInProgress } = props;
    const { id: responseId } = props.match.params;
    this.state = {
      responseId,
      response: this.loadResponse(responseId, responses),
      loadInProgress,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { responses, loadInProgress } = nextProps;
    const { id: responseId } = nextProps.match.params;
    this.setState({
      responseId,
      response: this.loadResponse(responseId, responses),
      loadInProgress,
    });
  }

  loadResponse = (responseId, responses) => {
    const response = responses.find(rspns => (parseInt(rspns.id, 10) === parseInt(responseId, 10)));
    return response && this.addPrevAndNext(responses, response);
  };

  addPrevAndNext = (responses, response) => {
    const activeIndex = responses.indexOf(response);
    const prevAndNext = {
      prevId: responses[(activeIndex - 1)] ? responses[(activeIndex - 1)].id : null,
      nextId: responses[(activeIndex + 1)] ? responses[(activeIndex + 1)].id : null,
    };
    return Object.assign(response, prevAndNext);
  };

  handleDelete = (e) => {
    e.preventDefault();
    // const { dispatch, authorization } = this.props;
    // const { responseId } = this.state;
    // dispatch(deleteInboxResponse(responseId, authorization));
  };

  handleDone = (e) => {
    e.preventDefault();
    // const { dispatch, authorization } = this.props;
    // const { responseId } = this.state;
    // dispatch(deleteInboxResponse(responseId, authorization));
  };

  loadPrev = () => {
    const { responses, loadInProgress } = this.props;
    this.setState(prevState => ({
      responseId: prevState.response.prevId,
      response: this.loadResponse(prevState.response.prevId, responses),
      loadInProgress,
    }));
  };

  loadNext = () => {
    const { responses, loadInProgress } = this.props;
    this.setState(prevState => ({
      responseId: prevState.response.nextId,
      response: this.loadResponse(prevState.response.nextId, responses),
      loadInProgress,
    }));
  };

  render() {
    const {
      responseId, response, loadInProgress,
    } = this.state;
    const hasData = response && Object.keys(response).length > 0;

    if (!hasData) {
      return (
        <Redirect to={RESPONSE_PAGE_ROUTE} />
      );
    }
    const { request, fulfillment } = response;
    const isFulfilled = response.fulfillment !== null;
    const isActive = request.status === 'active';
    const isPending = request.status === 'pending';
    // const isClosed = request.status === 'closed';
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
          className={`item nav-link text-info ml-auto border-left border-right ${response.prevId ? '' : 'disabled'}`}
          to={`${RESPONSE_PAGE_ROUTE}/${response.prevId ? response.prevId : response.id}`}
          data-disabled={!response.prevId}
          activeClassName="active"
          activeStyle={{ color: 'limegreen' }}
          exact
          onClick={this.loadPrev}
        >
          &laquo;
        </NavLink>
        <NavLink
          className={`item nav-link text-info mr-auto border-right ${response.nextId ? '' : 'disabled'}`}
          to={`${RESPONSE_PAGE_ROUTE}/${response.nextId ? response.nextId : response.id}`}
          data-disabled={!response.nextId}
          activeClassName="active"
          activeStyle={{ color: 'limegreen' }}
          exact
          onClick={this.loadNext}
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
                      <p className="ternaryType m-0 p-0 pl-5 text-70">{formatDate(response.posted)}</p>
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
                      {isFulfilled
                      || (
                      <nav className="w-100 nav justify-content-center m-0">
                        <button
                          className="btn btn-secondary p-2 text-white"
                          type="button"
                          onClick={this.handleDone}
                          style={{

                          }}
                        >
Done
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
                      )
                      }
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="card position-relative h-100">
                    <div className="card-body">
                      { isFulfilled
                        ? (
                          <React.Fragment>
                            <p className="primaryType m-0 p-0 text-center">
                              User
                              {fulfillment.userId}
                            </p>
                            <p className="ternaryType m-0 p-0 text-center text-70">{formatDate(fulfillment.posted)}</p>
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
                  <p
                    className={`primaryType text-right m-0 p-0 ${isFulfilled ? 'pt-5 ' : ''}`}
                  >
                    {userName}
                  </p>
                  <p className="m-0 p-0 text-right">
                    <span className="ternaryType text-70">
                      {formatDate(request.created)}
                    </span>
                  </p>

                  <h4 className="card-title text-primary">
                    {request.title}
                  </h4>
                  <hr />
                  <blockquote className="lead">
                    {request.description}
                  </blockquote>
                  <address
                    className="text-muted"
                    style={{
                      fontSize: '80%',
                    }}
                  >
                    {request.fullAddress}
                  </address>
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '250px',
                  }}
                  >
                    <RequestMap
                      request={request}
                    />
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

export default withRouter(connect(mapStateToProps)(ResponseShow));
