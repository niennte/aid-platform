// @flow

/* eslint-disable */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-autofocus */

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { REQUEST_PAGE_ROUTE } from '../../routes';

import { requestsOwn, requestOwn, requestOwnActive } from '../../data/requests';

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
    const { requests } = this.state;
    return (
      <main className="messageView">
        <section className="pt-5 pb-3 container d-flex justify-content-center">
          <div className="width-two-third">
            <nav className="nav justify-content-between mt-4 mb-2">
              <a
                className="item nav-link"
              >
                Your requests
              </a>
              <a
                className="item nav-link"
                href="#"
              >
                New
              </a>
            </nav>

            <table className="table table-bordered bg-white">
              <thead className="thead-light">
              <tr>
                <th>
                  <input
                    className="form-check-input position-relative ml-0"
                    type="checkbox"
                    name="user_remember_me"
                    id="user-login-remember_me"
                  />
                </th>
                <th>Title</th>
                <th>Description</th>
                <th>Posted</th>
                <th>Type</th>
                <th>Responses</th>
                <th>Status</th>
              </tr>
              </thead>

              <tbody>
              { requests.map((request) => {
                return (
                  <tr
                    key={request.id}
                    className={request.isFulfilled ? 'fulfilled' : 'unfulfilled'}
                  >
                    <td>
                      <input
                        className="form-check-input position-relative ml-0"
                        type="checkbox"
                        name="user_remember_me"
                        id="user-login-remember_me"
                      />
                    </td>
                    <td>{this.parseDate(request.created)}</td>
                    <td>
                      <NavLink
                        className="item nav-link text-success"
                        to={`${REQUEST_PAGE_ROUTE}/${request.id}`}
                        activeClassName="active"
                        activeStyle={{ color: 'limegreen' }}
                        exact
                      >
                        {request.title}
                      </NavLink>
                    </td>
                    <td>
                      {request.description}
                    </td>
                    <td>
                      {request.type}
                    </td>
                    <td>
                      {request.numResponses}
                    </td>
                    <td>
                      {request.status}
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

export default connect(mapStateToProps)(requestList);
