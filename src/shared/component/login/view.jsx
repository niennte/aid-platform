// @flow

/* eslint-disable */

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { REGISTER_PAGE_ROUTE } from '../../routes';
import { loginUser } from '../../action/index';

type Props = {
  hasErrors: boolean,
  errorMessage: String,
  dispatch: Function,
};

const mapStateToProps = state => ({
  hasErrors: state.errors.login.hasErrors,
  errorMessage: state.errors.login.data.error, // state.forms.login.errors
});

class loginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        password: '',
      }
    };
  }

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevState) => {
      let user = prevState.user;
      user[name] = value;
      return { user }
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { user } = this.state;
    const { dispatch } = this.props;
    console.log({user});
    dispatch(loginUser({ user }));
  };

  render() {
    const { user } = this.state;
    const { errors, errorMessage, } = this.props;
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
                  activeStyle={{color: 'limegreen'}}
                  exact>Sign up</NavLink>
                <h3 className="card-title text-center pb-2 text-primary">Sign in</h3>
                <hr />
                {errorMessage &&
                <div
                  id="error_explanation"
                  className="alert alert-warning text-center"
                  role="alert">
                  <p className="mb-0">{errorMessage}</p>
                </div>
                }
                <form
                  className="new_user"
                  id="new_user"
                  action=""
                  acceptCharset="UTF-8"
                  method="post"
                  onSubmit={this.handleSubmit}
                >
                  <div className={ `field form-group row email` }>
                    <label className="col-sm-4 col-form-label" htmlFor="user_email">Email</label>
                    <div className="col-sm-8">
                      <input
                        autoFocus="autofocus"
                        autoComplete="email"
                        className="form-control"
                        type="email"
                        name="email"
                        id="email"
                        value={user.email}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>

                  <div className={ `field form-group row password` }>
                    <label className="col-sm-4 col-form-label" htmlFor="user_password">Password</label>
                    <br />
                    <div className="col-sm-8">
                      <input
                        autoComplete="off"
                        className="form-control"
                        type="password"
                        name="password"
                        required
                        id="user_password"
                        value={user.password}
                        onChange={this.handleChange}
                      />
                      <a
                        className="form-text card-link pl-3"
                        href="/users/password/new">Forgot password?</a>
                    </div>
                  </div>

                  <div className="actions form-group row">
                    <div className="col-sm-8 ml-auto">
                      <input
                        type="submit"
                        name="commit"
                        value="Sign in"
                        className="btn btn-lg btn-primary"
                        data-disable-with="Sign in"/>
                    </div>
                  </div>

                  <div className="field col-sm-8 ml-auto form-check mt-4">
                    <input name="user[remember_me]" type="hidden"/>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="user_remember_me"
                      id="user_remember_me"/>
                    <label className="form-check-label" htmlFor="user_remember_me">Remember me</label>
                  </div>
                </form>
              </div>
            </div>

            <nav className="nav justify-content-center mt-5">
              <a
                className="badge badge-light"
                href="/users/unlock/new">Didn't receive unlock instructions?</a>
              <br />
            </nav>
          </div>

        </section>

      </main>
    );
  }
}

export default connect(mapStateToProps)(loginView);
