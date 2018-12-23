// @flow

/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-autofocus */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormData from 'form-data';
import { withRouter } from 'react-router-dom';

import { ACCOUNT_PAGE_ROUTE } from '../../routes';
import { verifyAccount } from '../../action/account';
// import UnlockLink from '../../common/forms/unlock-link';

type Props = {
  authorization: string,
  model: Object,
  hasErrors: boolean,
  errorMessage: string,
  errors: object,
  hasInfos: boolean,
  infoType: string,
  infoMessage: string,
  dispatch: Function,
  loadInProgress: boolean,
  history: any,
};

const mapStateToProps = state => ({
  authorization: state.user.authorization,
  model: state.forms.account,
  hasErrors: state.errors.account.hasErrors,
  errors: state.errors.account.errors,
  errorMessage: state.errors.account.errorMessage,
  hasInfos: state.infos.account.hasInfos,
  infoType: state.infos.account.infoType,
  infoMessage: state.infos.account.message,
  loadInProgress: state.loading === 'createAccount',
});

class AccountForm extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      account: props.model,
      selectedFile: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.model);
    const { infoType } = this.props;
    if (infoType === 'success') {
      const { history } = this.props;
      history.push(ACCOUNT_PAGE_ROUTE);
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => {
      const { account } = prevState;
      account[name] = value;
      return { account };
    });
  };

  handleSelectedFile = (e) => {
    this.setState({
      selectedFile: e.target.files[0],
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { account, selectedFile } = this.state;
    const data = new FormData();
    data.append('account[pic]', selectedFile);
    data.append('account[first_name]', account.first_name);
    data.append('account[last_name]', account.last_name);
    const { dispatch, authorization } = this.props;
    dispatch(verifyAccount(data, authorization));
  };

  infoDetail = () => (
    <p className="mb-0">Saved.</p>
  );

  cssInvalid = (field, errors) => (errors[field] ? 'is-invalid' : '');

  render() {
    const { account } = this.state;
    const {
      hasErrors, errorMessage, errors, hasInfos, infoMessage, loadInProgress,
    } = this.props;
    return (
      <main>
        <section className="pt-5 pb-3 container d-flex justify-content-center">
          <div className="width-narrow">
            <div className="card position-relative">
              <div className="card-body">
                <h3 className="card-title text-center pb-2 text-primary">Verify account</h3>
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
                      First name
                    </label>
                    <div className="col-sm-8">
                      <input
                        autoFocus="autofocus"
                        autoComplete="First Name"
                        className="form-control"
                        type="text"
                        name="first_name"
                        id="first_name"
                        value={account.first_name}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="field form-group row email">
                    <label
                      className="col-sm-4 col-form-label"
                      htmlFor="user-login-email"
                    >
                      Last name
                    </label>
                    <div className="col-sm-8">
                      <input
                        autoFocus="autofocus"
                        autoComplete="First Name"
                        className="form-control"
                        type="text"
                        name="last_name"
                        id="last_name"
                        value={account.last_name}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="pic">
                      Government issued ID
                    </label>
                    <p className="form-text p-0 m-0 text-60">
                      Please upload a copy in .pdf, .jpg, or .png format.
                    </p>
                    <input
                      type="file"
                      className={`form-control ${this.cssInvalid('pic', errors)} ${this.cssInvalid('pic_content_type', errors)}`}
                      id="pic"
                      name="pic"
                      onChange={this.handleSelectedFile}
                    />
                    { errors.pic
                    && (
                      <div className="invalid-feedback">
                        {`The uploaded file ${errors.pic}`}
                      </div>
                    )
                    }
                    { errors.pic_content_type
                    && (
                      <div className="invalid-feedback">
                        The file needs to be in .pdf, .jpg, or .png format.
                      </div>
                    )
                    }
                  </div>

                  <div className="actions form-group row">
                    <div className="col-sm-8 ml-auto">
                      <input
                        type="submit"
                        name="commit"
                        value={loadInProgress ? 'Saving...' : 'Save'}
                        className="btn btn-lg btn-secondary"
                        disabled={loadInProgress}
                      />
                    </div>
                  </div>

                </form>
              </div>
            </div>
          </div>

        </section>

      </main>
    );
  }
}

export default withRouter(connect(mapStateToProps)(AccountForm));
