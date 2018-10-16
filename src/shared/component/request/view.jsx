// @flow

/* eslint-disable */


import React from 'react';
import { NavLink } from 'react-router-dom';

import { LOGIN_PAGE_ROUTE } from '../../routes';

const requestView = () => (
  <main>
    <section className="pt-5 pb-3 container d-flex justify-content-center">
      <div>
        <div className="card position-relative" style={{ width: '25rem' }}>
          <div className="card-body">
            <NavLink className="card-link position-absolute auxiliary-link" to={LOGIN_PAGE_ROUTE} activeClassName="active" activeStyle={{ color: 'limegreen' }} exact>Sign in</NavLink>
            <h3 className="card-title text-center pb-2 text-primary">Sign up</h3>
            <hr className="mb-0" />

            <form className="new_user" id="new_user" action="" acceptCharset="UTF-8" method="post" onSubmit={(e) => { e.preventDefault(); }}>

              <input name="utf8" type="hidden" defaultValue="✓" />
              <input type="hidden" name="authenticity_token" defaultValue="vRDuiYE/KnqW2xVNAaI6UZsQDvg49NwZraIuJMGRtaH2JuF5zz24tBf+TUspvB2cHCjMiGmytCfy3YuRt9Horw==" />

              <div className="field form-group mt-3 ">
                <label htmlFor="user_name">Name</label>
                <input autoFocus="autofocus" autoComplete="name" className="form-control" type="text" name="user_name" id="user_name" />
              </div>

              <div className="field form-group ">
                <label htmlFor="user_email">Email</label>
                <input autoFocus="autofocus" autoComplete="email" className="form-control" type="email" defaultValue="" name="user_email" id="user_email" />
              </div>

              <div className="field form-group ">
                <label htmlFor="user_password">Password</label>
                <em>(6 characters minimum)</em>
                <input autoComplete="off" className="form-control" type="password" name="user_password" id="user_password" />
              </div>

              <div className="field form-group ">
                <label htmlFor="user_password_confirmation">Password confirmation</label>
                <input autoComplete="off" className="form-control" type="password" name="user_password_confirmation" id="user_password_confirmation" />
              </div>

              <div className="actions text-center">
                <input type="submit" name="commit" value="Sign up" className="btn btn-lg btn-primary" data-disable-with="Sign up" />
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

export default requestView;
