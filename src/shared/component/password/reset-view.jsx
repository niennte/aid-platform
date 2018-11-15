// @flow

/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'query-string';

import { REGISTER_PAGE_ROUTE, LOGIN_PAGE_ROUTE } from '../../routes';
import { resetPassword } from '../../action/index';
import UnlockLink from '../common/forms/unlock-link';

type Props = {
  hasErrors: boolean,
  errorMessage: string,
  errors: Object,
  hasInfos: boolean,
  infoType: string,
  infoMessage: string,
  dispatch: Function,
};

const mapStateToProps = state => ({
  hasErrors: state.errors.passwordReset.hasErrors,
  errorMessage: state.errors.passwordReset.errorMessage,
  errors: state.errors.passwordReset.errors,
  hasInfos: state.infos.passwordReset.hasInfos,
  infoType: state.infos.passwordReset.infoType,
  infoMessage: state.infos.passwordReset.message,
});

class PasswordResetView extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        password: '',
        password_confirmation: '',
        reset_password_token: '',
      },
    };
  }

  componentDidMount() {
    this.setState(prevState => ({
      user: Object.assign(prevState.user, {
        reset_password_token: queryString.parse(window.location.search).reset_password_token,
      }),
    }));
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
    dispatch(resetPassword(user));
  };

  infoDetail = () => (
    <p className="mb-0">
      Your password has been changed.
      <br />
      You can now
      {' '}
      <NavLink
        to={LOGIN_PAGE_ROUTE}
        activeClassName="active"
        activeStyle={{ color: 'limegreen' }}
        exact
      >
sign in
      </NavLink>
.
    </p>
  );

  cssInvalid = (field, errors) => (errors[field] ? 'is-invalid' : '');

  render() {
    const { user } = this.state;
    const {
      hasErrors, errorMessage, errors, hasInfos, infoMessage, infoType,
    } = this.props;
    const showForm = infoType !== 'success';
    const showNav = infoType !== 'success';
    return (
      <main>
        <section className="pt-5 pb-3 container d-flex justify-content-center">
          <div className="width-narrow">
            <div className="card position-relative">
              <div className="card-body">
                <h3 className="card-title text-center pb-2 text-primary">
                  Change your password
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
                    {
                      Object.entries(errors).length
                      && (
                        <ul className="list-unstyled" style={{ fontSize: '65%' }}>
                          {Object.entries(errors).map(([name, error]) => (
                            <li key={name}>
                              {`${name} ${error}`}
                            </li>
                          ))}
                        </ul>
                      )
                    }
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
                {
                  showForm
                  && (
                    <form
                      className="new_user"
                      id="new_user"
                      action=""
                      acceptCharset="UTF-8"
                      method="post"
                      onSubmit={this.handleSubmit}
                    >

                      <div className="field form-group">
                        <label htmlFor="password-reset-password" className="mb-1">New password</label>
                        <small className="form-text">(6 characters minimum)</small>
                        <input
                          autoComplete="off"
                          className={`form-control ${this.cssInvalid('password', errors)}`}
                          type="password"
                          name="password"
                          id="password-reset-password"
                          required
                          value={user.password}
                          onChange={this.handleChange}
                        />
                        { errors.password
                        && (
                          <div className="invalid-feedback">
                            {`Password: ${errors.password}`}
                          </div>
                        )
                        }
                      </div>

                      <div className="field form-group">
                        <label htmlFor="password-reset-password_confirmation">Confirm new password</label>
                        <input
                          autoComplete="off"
                          className={`form-control ${this.cssInvalid('password_confirmation', errors)}`}
                          type="password"
                          name="password_confirmation"
                          required
                          id="password-reset-password_confirmation"
                          value={user.password_confirmation}
                          onChange={this.handleChange}
                        />
                        { errors.password_confirmation
                        && (
                          <div className="invalid-feedback">
                            {`Password confirmation: ${errors.password_confirmation}`}
                          </div>
                        )
                        }
                      </div>

                      <div className="actions text-center">
                        <input
                          type="submit"
                          name="commit"
                          value="Change my password"
                          className="btn btn-lg btn-secondary"
                          data-disable-with="Change my password"
                        />
                      </div>
                    </form>
                  )
                }
                { showNav
                && (
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
                )
                }
              </div>
            </div>
            <UnlockLink />
          </div>

        </section>

      </main>
    );
  }
}

export default connect(mapStateToProps)(PasswordResetView);
