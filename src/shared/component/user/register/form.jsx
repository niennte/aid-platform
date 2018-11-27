// @flow

/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-autofocus */

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';

import { LOGIN_PAGE_ROUTE } from '../../../routes';
import { createUser } from '../../../action/index';
import UnlockLink from '../../common/forms/unlock-link';

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

class registerForm extends Component<Props> {
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
    dispatch(createUser(user));
  };

  infoDetail = () => (
    <p className="mb-0">
      Your account has been created.
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
      hasInfos, infoMessage, infoType, hasErrors, errorMessage, errors,
    } = this.props;
    const showForm = infoType !== 'success';
    return (
      <main>
        <section className="pt-5 pb-3 container d-flex justify-content-center">
          <div>
            <div className="card position-relative width-narrow">
              <div className="card-body">
                <NavLink
                  className="card-link position-absolute auxiliary-link"
                  to={LOGIN_PAGE_ROUTE}
                  activeClassName="active"
                  activeStyle={{ color: 'limegreen' }}
                  exact
                >
Sign in
                </NavLink>
                <h3 className="card-title text-center pb-2 text-primary">Sign up</h3>
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
                          ? (
                            <ul className="list-unstyled" style={{ fontSize: '65%' }}>
                              {Object.entries(errors).map(([name, error]) => (
                                <li key={name}>
                                  {`${name} ${error}`}
                                </li>
                              ))}
                            </ul>
                          ) : ''
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
                  <div className="field form-group mt-3 ">
                    <label htmlFor="new-user_name">Username</label>
                    <input
                      className={`form-control ${this.cssInvalid('username', errors)}`}
                      type="text"
                      name="username"
                      id="new-user_name"
                      value={user.username}
                      onChange={this.handleChange}
                      required
                    />
                    { errors.username
                    && (
                      <div className="invalid-feedback">
                        {`Username ${errors.username}`}
                      </div>
                    )
                    }
                  </div>

                  <div className="field form-group ">
                    <label htmlFor="new-user_email">Email</label>
                    <input
                      autoComplete="email"
                      className={`form-control ${this.cssInvalid('email', errors)}`}
                      type="email"
                      name="email"
                      id="new-user_email"
                      value={user.email}
                      onChange={this.handleChange}
                      required
                    />
                    { errors.email
                    && (
                      <div className="invalid-feedback">
                        {`Email ${errors.email}`}
                      </div>
                    )
                    }
                  </div>

                  <div className="field form-group ">
                    <label htmlFor="new-user_password">Password</label>
                    <em>(6 characters minimum)</em>
                    <input
                      autoComplete="off"
                      className={`form-control ${this.cssInvalid('password', errors)}`}
                      type="password"
                      name="password"
                      id="new-user_password"
                      value={user.password}
                      onChange={this.handleChange}
                      required
                    />
                    { errors.password
                    && (
                      <div className="invalid-feedback">
                        {`Password ${errors.password}`}
                      </div>
                    )
                    }
                  </div>

                  <div className="field form-group ">
                    <label htmlFor="new-user-password_confirmation">Password confirmation</label>
                    <input
                      autoComplete="off"
                      className={`form-control ${this.cssInvalid('password_confirmation', errors)}`}
                      type="password"
                      name="password_confirmation"
                      id="new-user-password_confirmation"
                      value={user.password_confirmation}
                      onChange={this.handleChange}
                      required
                    />
                    { errors.password_confirmation
                    && (
                      <div className="invalid-feedback">
                        {`Password Confirmation ${errors.password_confirmation}`}
                      </div>
                    )
                    }
                  </div>

                  <div className="actions text-center">
                    <input
                      type="submit"
                      name="commit"
                      value="Sign up"
                      className="btn btn-lg btn-secondary"
                      data-disable-with="Sign up"
                    />
                  </div>
                </form>
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

export default connect(mapStateToProps)(registerForm);
