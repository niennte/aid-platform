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
  newMessageId: number,
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
  newMessageId: parseInt(state.infos.message.messageId, 10),
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
      <main className="messageForm">
        <section className="pt-5 pb-3 container d-flex justify-content-center">
          <div className="width-two-third">
            <nav className="nav justify-content-between align-items-center mt-4 mb-2">
              <div
                className="item nav-link"
              >
                <h4 className="text-muted">
                  Send a message to
                  {' '}
                  <span className="text-primary">{message.recipient}</span>
                </h4>
              </div>
              <NavLink
                className="item nav-link border-right ml-auto text-info"
                to={MESSAGE_PAGE_ROUTE}
                activeClassName="active disabled"
                activeStyle={{ color: 'limegreen' }}
                exact
              >
                Inbox
              </NavLink>
              <NavLink
                className="item nav-link text-info"
                to={MESSAGE_OUTBOX_PAGE_ROUTE}
                activeClassName="active disabled"
                activeStyle={{ color: 'limegreen' }}
                exact
              >
                Outbox
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
                        rows="6"
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
