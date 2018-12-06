// @flow

/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-autofocus */

import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import { REQUEST_PAGE_ROUTE } from '../../routes';
import { createRequest } from '../../action/requests';

type Props = {
  authorization: string,
  model: Object,
  hasErrors: boolean,
  errorMessage: string,
  errors: Object,
  hasInfos: boolean,
  infoMessage: string,
  infoType: string,
  newRequestId: number,
  dispatch: Function,
  // history: any,
};

const mapStateToProps = state => ({
  authorization: state.user.authorization,
  model: state.forms.request,
  hasErrors: state.errors.request.hasErrors,
  errorMessage: state.errors.request.errorMessage,
  errors: state.errors.request.errors,
  hasInfos: state.infos.request.hasInfos,
  infoMessage: state.infos.request.message,
  infoType: state.infos.request.infoType,
  newRequestId: parseInt(state.infos.request.requestId, 10),
});

class messageForm extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      model: props.model,
      authorization: props.authorization,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.model);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => {
      const { model } = prevState;
      model[name] = value;
      return { model };
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { model: request, authorization } = this.state;
    const { dispatch } = this.props;
    dispatch(createRequest(request, authorization));
  };

  infoDetail = () => {
    const { newRequestId } = this.props;
    return (
      <p className="mb-0">
        Your request has been created.
        <br />
        {' '}
        <NavLink
          to={`${REQUEST_PAGE_ROUTE}/${newRequestId}`}
          activeClassName="active"
          activeStyle={{ color: 'limegreen' }}
          exact
        >
          View your request
        </NavLink>
        .
      </p>
    );
  };

  cssInvalid = (field, errors) => (errors[field] ? 'is-invalid' : '');

  render() {
    const { model: request } = this.state;
    const {
      hasInfos, infoMessage, infoType, hasErrors, errorMessage, errors,
    } = this.props;
    const showForm = infoType !== 'success';
    return (
      <main className="requestForm">
        <section className="pt-5 pb-3 container d-flex justify-content-center">
          <div className="width-two-third">
            <nav className="nav justify-content-between align-items-center mt-4 mb-2">
              <div
                className="item nav-link"
              >
                <h4 className="text-muted">
                  Create a new
                  {' '}
                  <span className="text-primary">request</span>
                </h4>
              </div>
              <NavLink
                className="item nav-link ml-auto text-info"
                to={REQUEST_PAGE_ROUTE}
                activeClassName="active disabled"
                activeStyle={{ color: 'limegreen' }}
                exact
              >
                All Requests
              </NavLink>
            </nav>
            <div className="card position-relative w-100">
              <div className="card-body">
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
                    className="new_request"
                    id="new_message"
                    onSubmit={this.handleSubmit}
                  >

                    <div className="field form-group mt-3 ">
                      <label htmlFor="new-message_subject">Title</label>
                      <input
                        className={`form-control ${this.cssInvalid('subject', errors)}`}
                        type="text"
                        name="title"
                        id="new-message_subject"
                        value={request.title}
                        onChange={this.handleChange}
                        required
                      />
                      { errors.title
                      && (
                        <div className="invalid-feedback">
                          {`Title ${errors.title}`}
                        </div>
                      )
                      }
                    </div>

                    <div className="field form-group mt-3 ">
                      <label htmlFor="new-request_description">Description</label>
                      <textarea
                        rows="6"
                        className={`form-control ${this.cssInvalid('description', errors)}`}
                        type="text"
                        name="description"
                        id="new-message_body"
                        value={request.description}
                        onChange={this.handleChange}
                        required
                      />
                      { errors.description
                      && (
                        <div className="invalid-feedback">
                          {`Description ${errors.description}`}
                        </div>
                      )
                      }
                    </div>

                    <div className="field form-group mt-3 ">
                      <label htmlFor="new-request_address">Address</label>
                      <input
                        className={`form-control ${this.cssInvalid('address', errors)}`}
                        type="text"
                        name="address"
                        id="new-message_subject"
                        value={request.address}
                        onChange={this.handleChange}
                        required
                      />
                      { errors.address
                      && (
                        <div className="invalid-feedback">
                          {`Address ${errors.address}`}
                        </div>
                      )
                      }
                    </div>


                    <div className="field form-group mt-3 ">
                      <div className="custom-control custom-radio custom-control-inline">
                        <input
                          type="radio"
                          id="new-request_category1"
                          name="category"
                          className="custom-control-input"
                          value="one_time_task"
                          checked={request.category === 'one_time_task'}
                          onChange={this.handleChange}
                          required
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="new-request_category1"
                        >
                          One time task
                        </label>
                      </div>
                      <div className="custom-control custom-radio custom-control-inline">
                        <input
                          type="radio"
                          id="new-request_category2"
                          name="category"
                          className="custom-control-input"
                          value="material_need"
                          checked={request.category === 'material_need'}
                          onChange={this.handleChange}
                          required
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="new-request_category2"
                        >
                          Material need
                        </label>
                      </div>
                    </div>

                    <div className="actions text-center">
                      <input
                        type="submit"
                        name="commit"
                        value="Save"
                        className="btn btn-lg btn-secondary"
                        data-disable-with="Saving"
                      />
                    </div>
                  </form>
                )
                }
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default withRouter(
  connect(mapStateToProps)(messageForm),
);
