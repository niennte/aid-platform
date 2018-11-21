// @flow

/* eslint-disable */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-autofocus */

import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { MESSAGE_PAGE_ROUTE, MESSAGE_OUTBOX_PAGE_ROUTE } from '../../routes';
import { createUser } from '../../action/index';

import { messages, messageSystem, messageUser, outbox } from '../../data/messages';

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
      messages: outbox,
      message: messageUser,
    };
  }

  navigateToShow = (e) => {
    e.preventDefault();
    const messageId = e.currentTarget.dataset.id;
    this.props.history.push(`${MESSAGE_OUTBOX_PAGE_ROUTE}/${messageId}`)
  };

  render() {
    const { messages } = this.state;
    return (
      <main className="messageView">
        <section className="pt-5 pb-3 container d-flex justify-content-center">
          <div className="width-two-third">
            <nav className="nav justify-content-between align-items-center mt-4 mb-2">
              <a
                className="item nav-link"
                href="#"
              >
                <h4 className="text-primary">
                Outbox
                </h4>
              </a>
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

            <table className="table table-bordered bg-white table-hover">
              <thead className="bg-info">
                <tr>
                  <th>To</th>
                  <th>Subject</th>
                  <th>Sent</th>
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
                  const dateSentTimestamp = Date.parse(message.sent);
                  const dateSent = new Date(dateSentTimestamp);
                  return (
                    <tr
                      key={message.id}
                      data-id={message.id}
                      onClick={this.navigateToShow}
                    >
                      <td>{message.to.userName}</td>
                      <td>
                        {message.subject}
                      </td>
                      <td>
                        <span className="text-70">
                          {dateSent.toLocaleDateString('en-US', options)}
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

export default withRouter(connect(mapStateToProps)(messageList));
