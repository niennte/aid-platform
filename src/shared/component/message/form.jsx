// @flow

/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-autofocus */

import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import { MESSAGE_OUTBOX_PAGE_ROUTE, MESSAGE_PAGE_ROUTE } from '../../routes';
import { sendMessage } from '../../action/send-message';

type Props = {
  authorization: string,
  model: Object,
  hasErrors: boolean,
  errorMessage: string,
  errors: Object,
  hasInfos: boolean,
  infoMessage: string,
  infoType: string,
  newMessageId: string,
  dispatch: Function,
  history: any,
};

const mapStateToProps = state => ({
  authorization: state.user.authorization,
  model: state.forms.message,
  hasErrors: state.errors.message.hasErrors,
  errorMessage: state.errors.message.errorMessage,
  errors: state.errors.message.errors,
  hasInfos: state.infos.message.hasInfos,
  infoMessage: state.infos.message.message,
  infoType: state.infos.message.infoType,
  newMessageId: state.infos.message.messageId,
});

class messageForm extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      model: props.model,
      authorization: props.authorization,
    };
  }

  componentDidMount() {
    const { model, history } = this.props;
    if (!model.recipient_id) {
      history.push(MESSAGE_PAGE_ROUTE);
    }
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
    const { model: message, authorization } = this.state;
    const { dispatch } = this.props;
    dispatch(sendMessage(message, authorization));
  };

  infoDetail = () => {
    const { newMessageId } = this.props;
    return (
      <p className="mb-0">
      Your message has been sent.
        <br />
        {' '}
        <NavLink
          to={`${MESSAGE_OUTBOX_PAGE_ROUTE}/${newMessageId}`}
          activeClassName="active"
          activeStyle={{ color: 'limegreen' }}
          exact
        >
        View your message
        </NavLink>
      .
      </p>
    );
  };

  cssInvalid = (field, errors) => (errors[field] ? 'is-invalid' : '');

  render() {
    const { model: message } = this.state;
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
                <h3 className="card-title text-center pb-2 text-primary">
                  {`Send a message to ${message.recipient}`}
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
                  <form
                    className="new_message"
                    id="new_message"
                    onSubmit={this.handleSubmit}
                  >

                    <div className="field form-group mt-3 ">
                      <label htmlFor="new-message_subject">Subject</label>
                      <input
                        className={`form-control ${this.cssInvalid('subject', errors)}`}
                        type="text"
                        name="subject"
                        id="new-message_subject"
                        value={message.subject}
                        onChange={this.handleChange}
                        required
                      />
                      { errors.subject
                      && (
                        <div className="invalid-feedback">
                          {`Username ${errors.subject}`}
                        </div>
                      )
                      }
                    </div>

                    <div className="field form-group mt-3 ">
                      <label htmlFor="new-message_body">Message</label>
                      <textarea
                        className={`form-control ${this.cssInvalid('body', errors)}`}
                        type="text"
                        name="body"
                        id="new-message_body"
                        value={message.body}
                        onChange={this.handleChange}
                        required
                      />
                      { errors.body
                      && (
                        <div className="invalid-feedback">
                          {`Username ${errors.body}`}
                        </div>
                      )
                      }
                    </div>

                    <div className="actions text-center">
                      <input
                        type="submit"
                        name="commit"
                        value="Send"
                        className="btn btn-lg btn-secondary"
                        data-disable-with="Sending"
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
