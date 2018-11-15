// @flow

/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-autofocus */

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { REGISTER_PAGE_ROUTE, LOGIN_PAGE_ROUTE } from '../../routes';
import { requestPassword } from '../../action/index';
import UnlockLink from '../common/forms/unlock-link';

type Props = {
  hasErrors: boolean,
  errorMessage: string,
  errors: Object,
  hasInfos: boolean,
  infoMessage: string,
  infoType: string,
  dispatch: Function,
};

const mapStateToProps = state => ({
  hasErrors: state.errors.passwordRequest.hasErrors,
  errorMessage: state.errors.passwordRequest.errorMessage,
  errors: state.errors.passwordRequest.errors,
  hasInfos: state.infos.passwordRequest.hasInfos,
  infoMessage: state.infos.passwordRequest.message,
  infoType: state.infos.passwordRequest.infoType,
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

  cssInvalid = (field, errors) => (errors[field] ? 'is-invalid' : '');

  render() {
    const { user } = this.state;
    const {
      hasInfos, infoMessage, infoType, hasErrors, errorMessage, errors,
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
                { showForm && (
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
                        className={`form-control ${this.cssInvalid('email', errors)}`}
                        type="email"
                        name="email"
                        id="request-password-email"
                        value={user.email}
                        onChange={this.handleChange}
                      />
                      { errors.email
                      && (
                        <div className="invalid-feedback">
                          {`Email ${errors.email}`}
                        </div>
                      )
                      }
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

export default connect(mapStateToProps)(PasswordRequestView);
