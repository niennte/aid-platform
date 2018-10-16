// @flow

/* eslint-disable */

import React from 'react';
import { NavLink } from 'react-router-dom';

import { REGISTER_PAGE_ROUTE } from '../../routes';

const loginView = () => (
  <main>
    <section className="pt-5 pb-3 container d-flex justify-content-center">
      <div>
        <div
          className="card position-relative"
          style={{
            width: '25rem',
          }}
        >
          <div className="card-body">
            <NavLink className="card-link position-absolute auxiliary-link" to={REGISTER_PAGE_ROUTE} activeClassName="active" activeStyle={{ color: 'limegreen' }} exact>Sign up</NavLink>
            <h3 className="card-title text-center pb-2 text-primary">Sign in</h3>
            <hr />
            <form className="new_user" id="new_user" action="" acceptCharset="UTF-8" method="post" onSubmit={(e) => { e.preventDefault(); }}>
              <input name="utf8" type="hidden" value="✓" />
              <input type="hidden" name="authenticity_token" value="BllooeEZQUgnz7TttMx+JXW+pGL9UH5dVnNYiwOwAPBenP9NyTT70iTWjLCMmHO0x9EEVuckzjXUYKz1vqHoSA==" />
              <div className="field form-group row">
                <label className="col-sm-4 col-form-label" htmlFor="user_email">Email</label>
                <div className="col-sm-8">
                  <input autoFocus="autofocus" autoComplete="email" className="form-control" type="email" name="user_email" id="user_email" />
                </div>
              </div>

              <div className="field form-group row">
                <label className="col-sm-4 col-form-label" htmlFor="user_password">Password</label>
                <br />
                <div className="col-sm-8">
                  <input autoComplete="off" className="form-control" type="password" name="user_password" id="user_password" />
                  <a className="form-text card-link pl-3" href="/users/password/new">Forgot password?</a>
                </div>
              </div>

              <div className="actions form-group row">
                <div className="col-sm-8 ml-auto">
                  <input type="submit" name="commit" value="Sign in" className="btn btn-lg btn-primary" data-disable-with="Sign in" />
                </div>
              </div>

              <div className="field col-sm-8 ml-auto form-check mt-4">
                <input name="user[remember_me]" type="hidden" />
                <input className="form-check-input" type="checkbox" name="user_remember_me" id="user_remember_me" />
                <label className="form-check-label" htmlFor="user_remember_me">Remember me</label>
              </div>
            </form>
          </div>
        </div>

        <nav className="nav justify-content-center mt-5">
          <a className="badge badge-light" href="/users/unlock/new">Didn't receive unlock instructions?</a>
          <br />
        </nav>
      </div>

    </section>

  </main>
);

export default loginView;
