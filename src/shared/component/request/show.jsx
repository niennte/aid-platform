// @flow

/* eslint-disable */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-autofocus */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';


import { REQUEST_PAGE_ROUTE } from '../../routes';
import RequestMap from './map';
import { requestOwn, requestOwnActive } from '../../data/requests';

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

class requestShow extends Component<Props> {
  constructor(props) {
    super(props);
    // this.state = props.model;
    this.state = {
      request: requestOwn,
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
    const userName = 'Arcenciel';

    const RequestNav = () => (
      <nav className="nav justify-content-between mt-4 mb-2">
        <NavLink
          className="item nav-link text-info"
          to={REQUEST_PAGE_ROUTE}
          activeClassName="active"
          activeStyle={{ color: 'limegreen' }}
          exact
        >
          Back
        </NavLink>
        <NavLink
          className="item nav-link text-info ml-auto border-left border-right"
          to={`${REQUEST_PAGE_ROUTE}/${request.id - 1}`}
          activeClassName="active"
          activeStyle={{ color: 'limegreen' }}
          exact
        >
          &laquo;
        </NavLink>
        <NavLink
          className="item nav-link text-info mr-auto border-right"
          to={`${REQUEST_PAGE_ROUTE}/${request.id + 1}`}
          activeClassName="active"
          activeStyle={{ color: 'limegreen' }}
          exact
        >
          &raquo;
        </NavLink>
        <a
          className="item nav-link border-right ml-auto text-info"
          href="#"
        >
          Edit
        </a>
        <a
          className="item nav-link text-info"
          href="#"
          disabled
        >
          Publish
        </a>
      </nav>
    );

    return (
      <main className="requestView ">
        <section className="pt-5 pb-3 container-fluid">
          <div className="width-two-third mx-auto">
            <RequestNav />
            <div className={`card position-relative ${request.fulfillment.id ? 'fulfilled' : 'unfulfilled'}`}>
              <div className="card-body">
                <p className="primaryType m-0 p-0 text-right">{userName}</p>
                <p className="ternaryType m-0 p-0 text-right">{this.parseDate(request.created)}</p>
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
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '170px',
                }}>
                  <RequestMap />
                </div>
              </div>
            </div>

            <div className="container-fluid">
            <div className="row pt-3">
              <div className="col-6">
                <h5 className="card-title text-info text-center">
                  Responses
                </h5>
              <ul
                className="responses list-unstyled"
              >
                {
                  request.responses.map(response => {
                    return (
                      <li
                        className={`${response.status} mb-3`}
                        key={response.id}
                      >
                        <div className="card position-relative">
                          <div className="card-body">
                            <p className="primaryType m-0 p-0 text-right">User{response.user_id}</p>
                        <p className="ternaryType m-0 p-0 text-right">{this.parseDate(response.created_at)}</p>
                        <hr />
                        <blockquote className="lead">
                          {response.message}
                        </blockquote>
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
                          <blockquote className="lead text-muted">
                            This request has no responses yet.
                          </blockquote>
                        </div>
                      </div>
                    </li>

                  )
                }
              </ul>
              </div>

              <div className="col-6">
                <h5 className="card-title text-info text-center">
                  Fulfillment
                </h5>
              <div className="card position-relative">
                <div className="card-body">
                  { request.fulfillment.id ?
                  (
                    <React.Fragment>
                      <p className="primaryType m-0 p-0 text-right">
                        User{request.fulfillment.user_id}
                      </p>
                      <p className="ternaryType m-0 p-0 text-right">{this.parseDate(request.fulfillment.created_at)}</p>
                      <hr />
                      <blockquote className="lead">
                        {request.fulfillment.message}
                      </blockquote>
                    </React.Fragment>
                  ) : (
                      <blockquote className="lead text-muted">
                        This request is not yet fulfilled.
                      </blockquote>
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

export default connect(mapStateToProps)(requestShow);
