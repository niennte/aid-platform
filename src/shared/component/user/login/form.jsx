// @flow

/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-autofocus */

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { REGISTER_PAGE_ROUTE, PASSWORD_REQUEST_PAGE_ROUTE } from '../../../routes';
import { loginUser } from '../../../action/index';
import UnlockLink from '../../common/forms/unlock-link';

type Props = {
  model: Object,
  hasErrors: boolean,
  errorMessage: string,
  hasInfos: boolean,
  infoMessage: string,
  dispatch: Function,
  loadInProgress: boolean,
};

const mapStateToProps = state => ({
  model: state.forms.login,
  hasErrors: state.errors.login.hasErrors,
  errorMessage: state.errors.login.errorMessage,
  hasInfos: state.infos.login.hasInfos,
  infoMessage: state.infos.login.message,
  loadInProgress: state.loading === 'login',
});

class loginForm extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = props.model;
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.model);
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
    dispatch(loginUser({ user }));
  };

  infoDetail = () => (
    <p className="mb-0">Successfully logged in.</p>
  );

  render() {
    const { user } = this.state;
    const {
      hasErrors, errorMessage, hasInfos, infoMessage, loadInProgress,
    } = this.props;
    return (
      <main>
        <section className="pt-5 pb-3 container d-flex justify-content-center">
          <div className="width-narrow">
            <div className="card position-relative">
              <div className="card-body">
                <NavLink
                  className="card-link position-absolute auxiliary-link"
                  to={REGISTER_PAGE_ROUTE}
                  activeClassName="active"
                  activeStyle={{ color: 'limegreen' }}
                  exact
                >
                  Sign up
                </NavLink>
                <h3 className="card-title text-center pb-2 text-primary">Sign in</h3>
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
                    id="error_explanation"
                    className="alert alert-success text-center"
                    role="alert"
                  >
                    <h6>{infoMessage}</h6>
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
                  <div className="field form-group row email">
                    <label
                      className="col-sm-4 col-form-label"
                      htmlFor="user-login-email"
                    >
                      Email
                    </label>
                    <div className="col-sm-8">
                      <input
                        autoFocus="autofocus"
                        autoComplete="email"
                        className="form-control"
                        type="email"
                        name="email"
                        id="user-login-email"
                        value={user.email}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>

                  <div className="field form-group row password">
                    <label
                      className="col-sm-4 col-form-label"
                      htmlFor="user-login-password"
                    >
                      Password
                    </label>
                    <br />
                    <div className="col-sm-8">
                      <input
                        autoComplete="off"
                        className="form-control"
                        type="password"
                        name="password"
                        required
                        id="user-login-password"
                        value={user.password}
                        onChange={this.handleChange}
                      />
                      <NavLink
                        className="form-text card-link pl-3"
                        to={PASSWORD_REQUEST_PAGE_ROUTE}
                        activeClassName="active"
                        activeStyle={{ color: 'limegreen' }}
                        exact
                      >
                        Forgot password?
                      </NavLink>
                    </div>
                  </div>

                  <div className="actions form-group row">
                    <div className="col-sm-8 ml-auto">
                      <input
                        type="submit"
                        name="commit"
                        value={loadInProgress ? 'Signing in...' : 'Sign in'}
                        className="btn btn-lg btn-secondary"
                        disabled={loadInProgress}
                      />
                    </div>
                  </div>

                  <div className="field col-sm-8 ml-auto form-check mt-4">
                    <input
                      name="remember_me"
                      type="hidden"
                    />
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="user_remember_me"
                      id="user-login-remember_me"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="user-login-remember_me"
                    >
                      Remember me
                    </label>
                  </div>
                </form>
              </div>
            </div>
            <UnlockLink />
          </div>

        </section>

      </main>
    );
  }
}

export default connect(mapStateToProps)(loginForm);
