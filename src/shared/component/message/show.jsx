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

class messageShow extends Component<Props> {
  constructor(props) {
    super(props);
    // this.state = props.model;
    this.state = {
      messages,
      message: messageSystem,
    };
  }

  componentDidMount() {
    this.markRead();
  }

  markRead = () => {
    const { id } = this.state.message;
    console.log(id);
  };

  handleLink = (e) => {
    e.preventDefault();
  };

  render() {
    const { messages, message } = this.state;
    const MessageNav = () => (
      <nav className="nav justify-content-between mt-4 mb-2">
        <NavLink
          className="item nav-link text-info"
          to={MESSAGE_PAGE_ROUTE}
          activeClassName="active"
          activeStyle={{ color: 'limegreen' }}
          exact
        >
          Back
        </NavLink>
        <NavLink
          className="item nav-link text-info ml-auto border-left border-right"
          to={`${MESSAGE_PAGE_ROUTE}/${message.id - 1}`}
          activeClassName="active"
          activeStyle={{ color: 'limegreen' }}
          exact
        >
          &laquo;
        </NavLink>
        <NavLink
          className="item nav-link text-info mr-auto border-right"
          to={`${MESSAGE_PAGE_ROUTE}/${message.id + 1}`}
          activeClassName="active"
          activeStyle={{ color: 'limegreen' }}
          exact
        >
          &raquo;
        </NavLink>
        <a
          className="item nav-link border-right ml-auto text-info"
          href="#"
        >
          Reply
        </a>
        <a
          className="item nav-link text-info"
          href="#"
        >
          Delete
        </a>
      </nav>
    );

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
      <main className="messageView h-100">
        <section className="h-100 pt-5 pb-3 container d-flex justify-content-center">
          <div className="width-two-third">
            <MessageNav />
            <div className="card position-relative">
              <div className="card-body">
                <p className="primaryType text-right m-0 p-0">
                  {message.message.from.userName}
                </p>
                <p className="ternaryType text-right m-0 p-0">
                  {dateReceived.toLocaleDateString('en-US', options)}
                </p>
                <h4 className="card-title text-primary">
                  {message.message.subject}
                </h4>
                <hr />
                <blockquote className="lead">
                  {message.message.body}
                </blockquote>

              </div>
            </div>
            <MessageNav />
          </div>
        </section>
      </main>
    );
  }
}

export default connect(mapStateToProps)(messageShow);
