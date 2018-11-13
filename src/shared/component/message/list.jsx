// @flow

/* eslint-disable */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-autofocus */

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { MESSAGE_PAGE_ROUTE } from '../../routes';
import { createUser } from '../../action/index';

import { messages, messageSystem, messageUser } from '../../data/messages';

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

class messageList extends Component<Props> {
  constructor(props) {
    super(props);
    // this.state = props.model;
    this.state = {
      messages,
      message: messageUser,
    };
  }

  handleLink = (e) => {
    e.preventDefault();
  };

  render() {
    const { messages } = this.state;
    return (
      <main className="messageView">
        <section className="pt-5 pb-3 container d-flex justify-content-center">
          <div className="width-two-third">
            <nav className="nav justify-content-between mt-4 mb-2">
              <a
                className="item nav-link"
                href="#"
              >
                Select all
              </a>
              <a
                className="item nav-link ml-auto border-right"
                href="#"
              >
                Mark as read
              </a>
              <a
                className="item nav-link"
                href="#"
              >
                Delete
              </a>
            </nav>

            <table className="table table-bordered bg-white">
              <thead className="thead-light">
                <tr>
                  <th>
                    <input
                      className="form-check-input position-relative ml-0"
                      type="checkbox"
                      name="user_remember_me"
                      id="user-login-remember_me"
                    />
                  </th>
                  <th>From</th>
                  <th>Subject</th>
                  <th>Received</th>
                </tr>
              </thead>

              <tbody>
                { messages.map((message) => {
                  const options = {
                    year: '2-digit',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  };
                  const dateReceivedTimestamp = Date.parse(message.received);
                  const dateReceived = new Date(dateReceivedTimestamp);
                  return (
                    <tr
                      key={message.id}
                      className={message.isRead ? 'isOld' : 'isNew'}
                    >
                      <td>
                        <input
                          className="form-check-input position-relative ml-0"
                          type="checkbox"
                          name="user_remember_me"
                          id="user-login-remember_me"
                        />
                      </td>
                      <td>{message.from.userName}</td>
                      <td>
                        <NavLink
                          className="item nav-link text-success"
                          to={`${MESSAGE_PAGE_ROUTE}/${message.id}`}
                          activeClassName="active"
                          activeStyle={{ color: 'limegreen' }}
                          exact
                        >
                          {message.subject}
                        </NavLink>
                      </td>
                      <td>
                        <span className="badge badge-white">
                          {dateReceived.toLocaleDateString('en-US', options)}
                        </span>
                      </td>
                    </tr>
                  );
                })
                }
              </tbody>
            </table>
          </div>
        </section>
      </main>
    );
  }
}

export default connect(mapStateToProps)(messageList);
