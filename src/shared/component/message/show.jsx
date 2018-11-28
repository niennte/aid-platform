// @flow

/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-autofocus */

import React, { Component } from 'react';
import { NavLink, withRouter, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import { MESSAGE_PAGE_ROUTE, MESSAGE_CREATE_PAGE_ROUTE } from '../../routes';
import { fetchInboxMessage, deleteInboxMessage } from '../../action/fetch-inbox';

type Props = {
  authorization: string,
  dispatch: Function,
  match: any,
  message: object,
  loadInProgress: boolean,
};

const mapStateToProps = state => ({
  authorization: state.user.authorization,
  messages: state.messaging.inbox,
  message: state.messaging.inboxMessage,
  loadInProgress: state.loading === 'inboxMessage',
});

class messageShow extends Component<Props> {
  constructor(props) {
    super(props);
    const { message, loadInProgress } = props;
    const { id: messageId } = props.match.params;
    this.state = {
      message,
      messageId,
      loadInProgress,
    };
  }

  componentDidMount() {
    const { dispatch, authorization } = this.props;
    const { messageId } = this.state;
    dispatch(fetchInboxMessage(messageId, authorization));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      message: nextProps.message,
      loadInProgress: nextProps.loadInProgress,
    });
  }

  markRead = () => {
    const { message } = this.state;
    console.log(message.id);
  };

  handleLink = (e) => {
    e.preventDefault();
  };

  handleDelete = (e) => {
    e.preventDefault();
    const { dispatch, authorization } = this.props;
    const { messageId } = this.state;
    dispatch(deleteInboxMessage(messageId, authorization));
  };

  render() {
    const {
      messageId, message, loadInProgress,
    } = this.state;
    const hasData = Object.keys(message).length > 0;

    if (!hasData && !loadInProgress) {
      return (
        <Redirect to={MESSAGE_PAGE_ROUTE} />
      );
    }

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
        <NavLink
          className="item nav-link border-right ml-auto text-info"
          to={`${MESSAGE_CREATE_PAGE_ROUTE}/${message.id + 1}`}
          activeClassName="active"
          activeStyle={{ color: 'limegreen' }}
          exact
        >
          Reply
        </NavLink>
        <a
          className="item nav-link text-info"
          method="delete"
          href={messageId}
          onClick={this.handleDelete}
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
        { !hasData && !loadInProgress && (
          <Redirect to={MESSAGE_PAGE_ROUTE} />
        )}
        <section className="h-100 pt-5 pb-3 container d-flex justify-content-center">
          <div className="width-two-third">
            <MessageNav />
            <div className="card position-relative">
              {(loadInProgress) && (
                <div className="card-body">
                  <p className="lead text-center">
                    Loading...
                  </p>
                </div>
              )
              }
              { hasData && (
              <div className="card-body">
                <p className="primaryType text-right m-0 p-0">
                  {`From: ${message.message.from.userName}`}
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
              )}
            </div>
            <MessageNav />
          </div>
        </section>
      </main>
    );
  }
}

export default withRouter(
  connect(mapStateToProps)(messageShow),
);
