// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter, Redirect } from 'react-router-dom';

import { fetchRequest, deleteRequest } from '../../action/requests';
import actionCreators from '../../action/index';
import { REQUEST_PAGE_ROUTE, REQUEST_EDIT_PAGE_ROUTE } from '../../routes';
import RequestMap from './map';
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
  requests: object,
  request: object,
  loadInProgress: boolean,
  history: any,
};

const mapStateToProps = state => ({
  authorization: state.user.authorization,
  requests: state.requestsOwn.list,
  request: state.requestsOwn.active,
  loadInProgress: state.loading === 'ownRequest' || state.loading === 'deleteRequest',
});

class requestShow extends Component<Props> {
  constructor(props) {
    super(props);
    const {
      dispatch, authorization, requests, request, loadInProgress,
    } = props;
    const { id: requestId } = props.match.params;
    dispatch(fetchRequest(authorization, requestId));
    this.state = {
      request: this.addPrevAndNext(requests, request),
      loadInProgress,
    };
  }

  componentDidMount() {
    const { dispatch, authorization, match } = this.props;
    const { id: requestId } = match.params;
    dispatch(fetchRequest(authorization, requestId));
  }

  componentWillReceiveProps(nextProps) {
    const { requests, request, loadInProgress } = nextProps;
    this.setState({
      request: this.addPrevAndNext(requests, request),
      loadInProgress,
    });
  }

  addPrevAndNext = (requests, request) => {
    const requestListing = requests.find(
      rqst => (parseInt(rqst.id, 10) === parseInt(request.id, 10)),
    );
    const activeIndex = requests.indexOf(requestListing);
    const prevAndNext = {
      prevId: requests[(activeIndex - 1)] ? requests[(activeIndex - 1)].id : null,
      nextId: requests[(activeIndex + 1)] ? requests[(activeIndex + 1)].id : null,
    };
    return requestListing && Object.assign(request, prevAndNext);
  };

  handleDelete = (e) => {
    e.preventDefault();
    const { dispatch, authorization } = this.props;
    const { request } = this.state;
    dispatch(deleteRequest(request, authorization));
  };

  handleEdit = (e) => {
    e.preventDefault();
    const { dispatch, history } = this.props;
    const { request } = this.state;
    dispatch(actionCreators.app.infos.request.unset());
    dispatch(actionCreators.app.errors.request.unset());
    dispatch(actionCreators.app.values.request.set({
      resource: request,
    }));
    history.push(REQUEST_EDIT_PAGE_ROUTE);
  };

  loadPrev = () => {
    const { dispatch, authorization, loadInProgress } = this.props;
    const { request } = this.state;
    dispatch(fetchRequest(authorization, request.prevId));
    this.setState(({
      loadInProgress,
    }));
  };

  loadNext = () => {
    const { dispatch, authorization, loadInProgress } = this.props;
    const { request } = this.state;
    dispatch(fetchRequest(authorization, request.nextId));
    this.setState(({
      loadInProgress,
    }));
  };

  render() {
    const { request, loadInProgress } = this.state;
    const hasData = request && Object.keys(request).length > 0;

    if (!hasData) {
      return (
        <Redirect to={REQUEST_PAGE_ROUTE} />
      );
    }

    const isFulfilled = request.fulfillment && Object.keys(request.fulfillment).length > 0;
    const isActive = request.status === 'active';
    const isPending = request.status === 'pending';
    const isClosed = request.status === 'closed';

    const RequestNav = () => (
      <nav className="nav justify-content-between mt-4 mb-2">
        <NavLink
          className="item nav-link textInfo"
          to={REQUEST_PAGE_ROUTE}
          activeClassName="active"
          activeStyle={{ color: 'limegreen' }}
          exact
        >
          Back
        </NavLink>
        <NavLink
          className={`item nav-link text-info ml-auto border-left border-right ${request.prevId ? '' : 'disabled'}`}
          to={`${REQUEST_PAGE_ROUTE}/${request.prevId ? request.prevId : request.id}`}
          data-disabled={!request.prevId}
          activeClassName="active"
          activeStyle={{ color: 'limegreen' }}
          exact
          onClick={this.loadPrev}
        >
          &laquo;
        </NavLink>
        <NavLink
          className={`item nav-link text-info mr-auto border-right ${request.nextId ? '' : 'disabled'}`}
          to={`${REQUEST_PAGE_ROUTE}/${request.nextId ? request.nextId : request.id}`}
          data-disabled={!request.nextId}
          activeClassName="active"
          activeStyle={{ color: 'limegreen' }}
          exact
          onClick={this.loadNext}
        >
          &raquo;
        </NavLink>
        <a
          className={`item nav-link border-right ml-auto textInfo ${isClosed && 'disabled'}`}
          href="edit-request"
          onClick={this.handleEdit}
        >
          Edit
        </a>
        <a
          className={`item nav-link textInfo ${(isPending || isActive) || 'disabled'}`}
          href="delete-request"
          disabled={isActive}
          onClick={this.handleDelete}
        >
          Delete
        </a>

      </nav>
    );

    return (
      <main className="requestView ">
        <section className="pt-5 pb-3 container-fluid">
          <div className="width-two-third mx-auto">
            <RequestNav />
            <div className={`card position-relative ${isFulfilled ? 'fulfilled' : 'unfulfilled'}`}>
              {(loadInProgress) && (
                <div className="card-body">
                  <p className="lead text-center">
                    Loading...
                  </p>
                </div>
              )
              }
              <div className="card-body">
                <span
                  className="infographicsContainer"
                  style={{
                    position: 'absolute',
                  }}
                >
                  {isActive && !isFulfilled && (
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
                  {request.responses && request.responses.length > 0 && (
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
                <p className="primaryType m-0 p-0 text-right">{request.user && request.user.userName}</p>
                <p className="m-0 p-0 text-right">
                  <span className="ternaryType text-70">
                    {formatDate(request.created)}
                  </span>
                </p>
                <p className="ternaryType m-0 p-0 text-right">
                  One time task
                </p>
                <p className="ternaryType m-0 p-0 text-right">
                  Status:
                  {' '}
                  {request.status}
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
                  {request
                  && (
                  <RequestMap
                    request={request}
                  />
                  )
                  }
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
                  request.responses && request.responses.map((response) => {
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

                            <p className="primaryType m-0 p-0 pl-5 ">
User
                              {response.user_id}
                            </p>
                            <p className="ternaryType m-0 p-0 pl-5 text-70">{formatDate(response.created_at)}</p>
                            <hr />
                            <blockquote className="lead text-center">
                              {response.message}
                            </blockquote>
                            <p className="text-center">
                              {isFulfilled
                              || (
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
                            </p>
                          </div>
                        </div>
                      </li>
                    );
                  })
                }
                    {
                      (request.responses && request.responses.length > 0)
                  || (
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
                      { isFulfilled
                        ? (
                          <React.Fragment>
                            <p className="primaryType m-0 p-0 text-center">
                        User
                              {request.fulfillment.user_id}
                            </p>
                            <p className="ternaryType m-0 p-0 text-center text-70">{formatDate(request.fulfillment.created_at)}</p>
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

export default withRouter(connect(mapStateToProps)(requestShow));
