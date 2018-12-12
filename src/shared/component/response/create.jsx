// @flow

/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-autofocus */

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { RESPONSE_PAGE_ROUTE } from '../../routes';
import { createResponse } from '../../action/responses';
import volunteerIconSrc from '../common/svg/volunteer-icon-src';
import messageIconSrc from '../common/svg/message-icon-src';
import chatIconSrc from '../common/svg/chat-icon-src';

type Props = {
  authorization: string,
  model: object,
  request: object,
  hasErrors: boolean,
  errorMessage: string,
  errors: Object,
  hasInfos: boolean,
  infoMessage: string,
  infoType: string,
  dispatch: Function,
  newResponseId: number,
  loadInProgress: boolean,
};

const mapStateToProps = state => ({
  authorization: state.user.authorization,
  model: state.forms.response,
  hasErrors: state.errors.response.hasErrors,
  errorMessage: state.errors.response.errorMessage,
  errors: state.errors.response.errors,
  hasInfos: state.infos.response.hasInfos,
  infoMessage: state.infos.response.message,
  infoType: state.infos.response.infoType,
  newResponseId: parseInt(state.infos.response.requestId, 10),
  loadInProgress: state.loading === 'createResponse',
});

class ResponseCreateForm extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      response: Object.assign(props.model, { request_id: props.request.id }),
      authorization: props.authorization,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => {
      const { response } = prevState;
      response[name] = value;
      return { response };
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { response, authorization } = this.state;
    const { dispatch } = this.props;
    dispatch(createResponse(response, authorization));
  };

  infoDetail = () => {
    const { newResponseId } = this.props;
    return (
      <p className="mb-0">
        Your response has been sent.
        <br />
        {' '}
        <NavLink
          to={`${RESPONSE_PAGE_ROUTE}/${newResponseId}`}
          activeClassName="active"
          activeStyle={{ color: 'limegreen' }}
          exact
        >
          View your response
        </NavLink>
        .
      </p>
    );
  };

  cssInvalid = (field, errors) => (errors[field] ? 'is-invalid' : '');

  render() {
    const { response } = this.state;
    const { request } = this.props;
    const {
      hasInfos, infoMessage, infoType, hasErrors, errorMessage, errors, loadInProgress,
    } = this.props;
    const showForm = infoType !== 'success';
    return (
      <div className="container-fluid">
        <h6 className="text-center mb-1">
          You are responding to request
        </h6>
        <h3 className="text-primary text-center mb-4">
          {request.title}
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
          <form onSubmit={this.handleSubmit}>
            <div className="field form-group mb-4">
              <p className="text-60 form-text pb-0 mb-1 text-center">
                You may want to send your response with default message, or personalize it.
              </p>
              <input
                className={`form-control text-center text-muted p-4 ${this.cssInvalid('message', errors)}`}
                type="text"
                name="message"
                value={response.message}
                onChange={this.handleChange}
              />
              { errors.message
              && (
                <div className="invalid-feedback">
                  {`Email ${errors.message}`}
                </div>
              )
              }
            </div>

            <div className="d-flex justify-content-between">
              <div className="field form-group">
                <p
                  className="text-60 text-center text-info mb-0"
                >
                  Questions?
                </p>
                <p className="m-0 p-0 text-center">
                  <span className="text-muted">Contact </span>
                  <span className="secondaryType">{ (request.user && request.user.userName) ? request.user.userName : request.userName }</span>
                </p>
                <nav className="nav justify-content-center m-0">
                  <button
                    type="button"
                    className="item nav-link btn btn-light btn-sm p-2 mr-2"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <img
                      src={messageIconSrc}
                      alt="message"
                      style={{
                        width: '28px',
                        height: '28px',
                      }}
                    />
                  </button>
                  <button
                    type="button"
                    className="item nav-link btn btn-light btn-sm p-2 disabled"
                    disabled
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <img
                      src={chatIconSrc}
                      alt="Chat"
                      style={{
                        width: '28px',
                        height: '28px',
                      }}
                    />
                  </button>
                </nav>
              </div>
              <div className="field form-group">
                <p className="text-60 text-center text-info mb-1">
                  Ready to respond?
                </p>
                <button
                  className="btn btn-secondary p-2 text-white mt-2"
                  type="submit"
                >
                  {loadInProgress ? 'Sending response...' : 'Volunteer'}
                  <img
                    className="iconImage"
                    alt="volunteer"
                    title="volunteer"
                    src={volunteerIconSrc('#fff')}
                    style={{
                      width: '45px',
                      height: '45px',
                    }}
                  />
                </button>
              </div>
            </div>
          </form>
        )
        }

      </div>
    );
  }
}

export default connect(mapStateToProps)(ResponseCreateForm);
