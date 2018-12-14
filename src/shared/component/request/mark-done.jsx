// @flow

/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-autofocus */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createFulfillment } from '../../action/fulfillments';
import volunteerIconSrc from '../common/svg/volunteer-icon-src';
import messageIconSrc from '../common/svg/message-icon-src';
import ChatLink from '../ui-elements/chat-link';

type Props = {
  authorization: string,
  model: object,
  response: object,
  hasErrors: boolean,
  errorMessage: string,
  errors: Object,
  hasInfos: boolean,
  infoMessage: string,
  infoType: string,
  dispatch: Function,
  chatClickHandler: ?Function,
  loadInProgress: boolean,
};

const mapStateToProps = state => ({
  authorization: state.user.authorization,
  model: state.forms.fulfillment,
  hasErrors: state.errors.fulfillment.hasErrors,
  errorMessage: state.errors.fulfillment.errorMessage,
  errors: state.errors.fulfillment.errors,
  hasInfos: state.infos.fulfillment.hasInfos,
  infoMessage: state.infos.fulfillment.message,
  infoType: state.infos.fulfillment.infoType,
  loadInProgress: state.loading === 'markDoneRequest',
});

class ResponseMarkDoneForm extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      fulfillment: Object.assign(props.model, { response_id: props.response.id }),
      authorization: props.authorization,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => {
      const { fulfillment } = prevState;
      fulfillment[name] = value;
      return { fulfillment };
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { fulfillment, authorization } = this.state;
    const { dispatch } = this.props;
    dispatch(createFulfillment(fulfillment, authorization));
  };

  infoDetail = () => (
    <p className="mb-0">
      Your request has been marked fulfilled.
    </p>
  );

  cssInvalid = (field, errors) => (errors[field] ? 'is-invalid' : '');

  render() {
    const { fulfillment } = this.state;
    const { response, chatClickHandler } = this.props;
    const {
      hasInfos, infoMessage, infoType, hasErrors, errorMessage, errors, loadInProgress,
    } = this.props;
    const showForm = infoType !== 'success';
    return (
      <div className="container-fluid">
        <h6 className="text-center mb-1">
          You are marking done&nbsp;
          <span>{response.user.userName}</span>
          &rsquo;s response
        </h6>
        <h3 className="text-primary text-center mb-4">
          {response.message}
        </h3>
        <h6 className="text-center mb-1">
          to your request
        </h6>
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
                You may want to add a message, or leave the default.
              </p>
              <input
                className={`form-control text-center text-muted p-4 ${this.cssInvalid('message', errors)}`}
                type="text"
                name="message"
                value={fulfillment.message}
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
                  <span className="secondaryType">{response.user && response.user.userName}</span>
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
                  <ChatLink
                    userName={response.user && response.user.userName}
                    clickHandler={chatClickHandler}
                    re={`Your response ${response.message}`}
                  />
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
                  {loadInProgress ? 'Marking done...' : 'Mark as done'}
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

export default connect(mapStateToProps)(ResponseMarkDoneForm);
