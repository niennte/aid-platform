// @flow

/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-autofocus */

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { REGISTER_PAGE_ROUTE, LOGIN_PAGE_ROUTE } from '../../routes';
import { requestPassword } from '../../action/index';

type Props = {
  hasErrors: boolean,
  errorMessage: String,
  hasInfos: boolean,
  infoMessage: String,
  dispatch: Function,
};

const mapStateToProps = state => ({
  hasErrors: state.errors.passwordRequest.hasErrors,
  errorMessage: state.errors.passwordRequest.data.error,
  hasInfos: state.infos.passwordRequest.hasInfos,
  infoMessage: state.infos.passwordRequest.message,
});

class PasswordRequestView extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
      },
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => {
      const { user } = prevState;
      user[name] = value;
      return { user };
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { user } = this.state;
    const { dispatch } = this.props;
    dispatch(requestPassword(user));
  };

  infoDetail = () => {
    const { user } = this.state;
    return (
      <p className="mb-0">
        The email with instructions on how to reset your password has been sent to
        <br />
        <strong>{user.email}</strong>
        <br />
        You will receive it in a few minutes.
      </p>
    );
  };

  render() {
    const { user } = this.state;
    const {
      hasInfos, infoMessage, hasErrors, errorMessage,
    } = this.props;
    return (
      <main>
        <section className="pt-5 pb-3 container d-flex justify-content-center">
          <div className="width-narrow">
            <div className="card position-relative">
              <div className="card-body">
                <h3 className="card-title text-center pb-2 text-primary">
                  Forgot password?
                </h3>
                <hr />
                {
                  hasErrors
                  && (
                  <div
                    id="error_explanation"
                    className="alert alert-warning text-center"
                    role="alert"
                  >
                    <p className="mb-0">{errorMessage}</p>
                  </div>
                  )
                }
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
                <form
                  className="new_user"
                  id="new_user"
                  action=""
                  acceptCharset="UTF-8"
                  method="post"
                  onSubmit={this.handleSubmit}
                >

                  <div className="field form-group">
                    <label htmlFor="request-password-email">Email</label>
                    <input
                      autoFocus="autofocus"
                      autoComplete="email"
                      className="form-control"
                      type="email"
                      name="email"
                      id="request-password-email"
                      value={user.email}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="actions text-center">
                    <input
                      type="submit"
                      name="commit"
                      value="Send me reset password instructions"
                      className="btn btn-lg btn-secondary"
                      data-disable-with="Send me reset password instructions"
                    />
                  </div>
                </form>

                <nav className="nav justify-content-center mt-4">
                  <NavLink
                    className="item nav-link border-right"
                    to={LOGIN_PAGE_ROUTE}
                    activeClassName="active"
                    activeStyle={{ color: 'limegreen' }}
                    exact
                  >
Sign in
                  </NavLink>
                  <NavLink
                    className="item nav-link"
                    to={REGISTER_PAGE_ROUTE}
                    activeClassName="active"
                    activeStyle={{ color: 'limegreen' }}
                    exact
                  >
Sign up
                  </NavLink>
                </nav>
              </div>
            </div>

            <nav className="nav justify-content-center mt-5">
              <a
                className="badge badge-light"
                href="/users/unlock/new"
              >
Didn&#39;t receive unlock instructions?
              </a>
              <br />
            </nav>
          </div>

        </section>

      </main>
    );
  }
}

export default connect(mapStateToProps)(PasswordRequestView);
