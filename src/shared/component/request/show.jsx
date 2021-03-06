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
import clockIconSrc from '../common/svg/clock-icon-src';
import colorCodeMarkers from '../common/color-code-markers';
import formatDate from '../common/format-date';
import palette from '../common/palette';
import TextLoader from '../common/loaders/text-loader';

import Modal from '../ui-elements/modal';
import RequestMarkDoneForm from './mark-done';
import RequestActivateForm from './activate';

import ChatLink from '../ui-elements/chat-link';

type Props = {
  authorization: string,
  dispatch: Function,
  match: any,
  requests: object,
  request: object,
  hasInfos: boolean,
  infoMessage: string,
  loadInProgress: boolean,
  history: any,
  fulfillmentSuccess: boolean,
};

const mapStateToProps = state => ({
  authorization: state.user.authorization,
  requests: state.requestsOwn.list,
  request: state.requestsOwn.active,
  loadInProgress: state.loading === 'ownRequest' || state.loading === 'deleteRequest',
  fulfillmentSuccess: state.infos.fulfillment.infoType === 'success',
  hasInfos: state.infos.request.hasInfos,
  infoMessage: state.infos.request.message,
  infoType: state.infos.request.infoType,
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
      uiIsOpen: false,
      activeResponse: null,
    };
  }

  componentDidMount() {
    const { dispatch, authorization, match } = this.props;
    const { id: requestId } = match.params;
    dispatch(fetchRequest(authorization, requestId));
  }

  componentWillReceiveProps(nextProps) {
    const {
      requests,
      request,
      loadInProgress,
      fulfillmentSuccess,
      dispatch,
      authorization,
    } = nextProps;
    this.setState({
      request: this.addPrevAndNext(requests, request),
      loadInProgress,
    });
    if (fulfillmentSuccess) {
      dispatch(actionCreators.app.infos.fulfillment.unset());
      dispatch(fetchRequest(authorization, request.id));
      this.toggleUiOpen();
    }
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

  handleDone = (response) => {
    this.setState({
      activeResponse: response,
    });
    const { dispatch } = this.props;
    dispatch(actionCreators.app.infos.fulfillment.unset());
    dispatch(actionCreators.app.errors.fulfillment.unset());
    this.toggleUiOpen();
  };

  toggleUiOpen = () => {
    this.setState((prevState) => {
      const { uiIsOpen: isOpen } = prevState;
      return { uiIsOpen: !isOpen };
    });
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

  infoDetail = () => (
    <p className="mb-0">
      Your request has been activated!
    </p>
  );

  render() {
    const {
      request, loadInProgress, uiIsOpen, activeResponse,
    } = this.state;
    const { hasInfos, infoMessage } = this.props;
    const hasData = request && Object.keys(request).length > 0;
    if (!hasData && !loadInProgress) {
      return (
        <Redirect to={REQUEST_PAGE_ROUTE} />
      );
    }

    if (!hasData && loadInProgress) {
      return (
        <div className="width-two-third mx-auto">
          <div className="card position-relative">
            <div className="card-body">
              <TextLoader />
            </div>
          </div>
        </div>
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
          {(loadInProgress) && (
          <TextLoader />
          )
            }
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
                                    {response.user.userName}
                                  </p>
                                  <p className="ternaryType m-0 p-0 pl-5 text-70">{formatDate(response.posted)}</p>
                                  <hr />
                                  <blockquote className="lead text-center">
                                    {response.message}
                                  </blockquote>
                                  <div className="text-center">
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
                                        <ChatLink
                                          userName={response.user.userName}
                                          className="mr-auto"
                                          re={`Your response\n${response.message}\n to request\n${request.title}`}
                                        />
                                        <button
                                          className="btn btn-secondary p-2 ml-auto text-white"
                                          type="button"
                                          data-id={response.id}
                                          onClick={this.handleDone.bind(this, response)}
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
                            <p
                              className="ternaryType m-0 p-0 text-center text-70"
                            >
                              {formatDate(request.fulfillment.created_at)}
                            </p>
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
                            {
                              hasInfos
                              && (
                                <div
                                  id="info_explanation"
                                  className="alert alert-success text-center"
                                  role="alert"
                                >
                                  <h6>{infoMessage}</h6>
                                  <hr />
                                  {this.infoDetail()}
                                </div>
                              )
                            }
                            {isPending && (
                            <div className="text-center">
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
                              <RequestActivateForm
                                request={request}
                              />

                            </div>
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
        <Modal
          isOpen={uiIsOpen}
          toggle={this.toggleUiOpen}
        >
          <RequestMarkDoneForm
            response={activeResponse}
            chatClickHandler={this.toggleUiOpen}
          />
        </Modal>
      </main>
    );
  }
}

export default withRouter(connect(mapStateToProps)(requestShow));
