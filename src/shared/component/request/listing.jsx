// @flow

/* eslint-disable */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-autofocus */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';


import { MAP_PAGE_ROUTE, MAP_LISTING_PAGE_ROUTE } from '../../routes';
import RequestMap from '../request/map';
import { fetchRequest } from '../../action/requests';
import fulfillIconSrc from '../common/svg/done-double-icon-src';
import volunteerIconSrc from '../common/svg/volunteer-icon-src';
import messageIconSrc from '../common/svg/message-icon-src';
import chatIconSrc from '../common/svg/chat-icon-src';
import clockIconSrc from '../common/svg/clock-icon-src';
import colorCodeMarkers from '../common/color-code-markers';
import palette from '../common/palette';
import formatDate from '../common/format-date';

import Modal from '../ui-elements/modal';
import ResponseForm from '../response/form';

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
  requests: state.requests,
  request: state.requestsOwn.active,
  loadInProgress: state.loading === 'request',
});

class RequestListing extends Component<Props> {
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
      respondUiIsOpen: false,
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
    return Object.assign(request, prevAndNext);
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

  toggleRespond = (e) => {
    this.setState((prevState) => {
      const { respondUiIsOpen: isOpen } = prevState;
      return { respondUiIsOpen: !isOpen };
    });
  };

  render() {
    console.log(this.props);
    const { request, loadInProgress, respondUiIsOpen } = this.state;
    console.log(request);
    const hasData = request && Object.keys(request).length > 0;

    if (!hasData) {
      return (
        <p className="asyncLoader">
          Loading...
        </p>
      );
    }

    const isFulfilled = request.isFulfilled;
    const isActive = request.status === 'active';
    const isPending = request.status === 'pending';
    // const isClosed = request.status === 'closed';

    const RequestNav = () => (
      <nav className="nav justify-content-between align-items-center mt-4 mb-2">
        <NavLink
          className="item nav-link textInfo"
          to={MAP_PAGE_ROUTE}
          activeClassName="active"
          activeStyle={{ color: 'limegreen' }}
          exact
        >
          Back
        </NavLink>

        <NavLink
          className={`item nav-link text-info ml-auto border-left border-right ${request.prevId ? '' : 'disabled'}`}
          to={`${MAP_LISTING_PAGE_ROUTE}/${request.prevId ? request.prevId : request.id}`}
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
          to={`${MAP_LISTING_PAGE_ROUTE}/${request.nextId ? request.nextId : request.id}`}
          data-disabled={!request.nextId}
          activeClassName="active"
          activeStyle={{ color: 'limegreen' }}
          exact
          onClick={this.loadNext}
        >
          &raquo;
        </NavLink>
        <a
          className={`item nav-link textInfo ${(isPending || isActive) || 'disabled'}`}
          href="delete-request"
          onClick={this.handleDelete}
        >
          Your responses
        </a>

      </nav>
    );

    return (
      <main className="listingView ">
        {(loadInProgress) && (
          <p className="asyncLoader">
            Loading...
          </p>
        )
        }
        <section className="pt-5 pb-3 container-fluid">
          <div className="width-two-third mx-auto">
              <RequestNav />

              <div className="container-fluid mb-3">
                <div className="row pt-3 row-eq-height">
                  <div className="col-12 col-md-6">
                    <div className="card position-relative h-100">
                      <div className="card-body">

                        <p className="primaryType m-0 p-0 text-center">Respond to this request</p>
                        <hr />

                        {isFulfilled ||
                        <nav className="w-100 nav justify-content-center m-0">
                          <button
                            className="btn btn-secondary p-2 text-white"
                            type="button"
                            onClick={this.toggleRespond}
                          >Volunteer
                            <img
                              className="iconImage"
                              alt="volunteer"
                              title="volunteer"
                              src={volunteerIconSrc('#fff')}
                              style={{
                                width: '45px',
                                height: '45px',
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
                                {fulfillment.user.userId}
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
                  <p className="primaryType m-0 p-0 text-right">{request.user && request.user.userName}</p>
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
                    <RequestMap
                      request={request}
                    />
                  </div>
                </div>
              </div>
              </div>

            </div>

        </section>

        <Modal
          isOpen={respondUiIsOpen}
          toggle={this.toggleRespond}
          request={request}
        >
          <ResponseForm
            request={request}
          />
        </Modal>
      </main>
    );
  }
}

export default withRouter(connect(mapStateToProps)(RequestListing));
