// @flow

/* eslint-disable */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-autofocus */

import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { MESSAGE_PAGE_ROUTE, MESSAGE_OUTBOX_PAGE_ROUTE } from '../../routes';
import { fetchInboxList } from '../../action/fetch-inbox';

type Props = {
  authorization: string,
  dispatch: Function,
  messages: object,
  loadInProgress: boolean,
};

const mapStateToProps = state => ({
  authorization: state.user.authorization,
  messages: state.messaging.inbox,
  loadInProgress: state.loading === 'inbox',
});

class messageList extends Component<Props> {
  constructor(props) {
    super(props);
    const { dispatch, authorization, loadInProgress } = props;
    dispatch(fetchInboxList(authorization));
    this.state = {
      messages: [],
      loadInProgress,
    };
  }

  componentDidMount() {
    const { dispatch, authorization } = this.props;
    dispatch(fetchInboxList(authorization));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      messages: nextProps.messages,
      authorization: nextProps.authorization,
      loadInProgress: nextProps.loadInProgress,
    });
  }

  navigateToShow = (e) => {
    e.preventDefault();
    const messageId = e.currentTarget.dataset.id;
    this.props.history.push(`${MESSAGE_PAGE_ROUTE}/${messageId}`)
  };

  render() {
    const { messages, loadInProgress } = this.state;
    const ready = !loadInProgress;
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
                Inbox
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

            { loadInProgress && (
            <p className="lead text-center pt-md-3 pt-lg-5">
              Loading...
            </p>
            )}

            { ready && (messages.length > 0) ? (
            <table className="table table-bordered bg-white table-hover">
              <thead className="bg-info">
                <tr>
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
                      data-id={message.id}
                      className={message.isRead ? 'isOld' : 'isNew'}
                      onClick={this.navigateToShow}
                    >
                      <td>{message.from.userName}</td>
                      <td>
                        {message.subject}
                      </td>
                      <td>
                        <span className="text-70">
                          {dateReceived.toLocaleDateString('en-US', options)}
                        </span>
                      </td>
                    </tr>
                  );
                })
                }
              </tbody>
            </table>
            ) : ( ready &&
              <p className="lead text-center pt-md-3 pt-lg-5">
                You have no messages.
              </p>
            )}
          </div>
        </section>
      </main>
    );
  }
}

export default withRouter(connect(mapStateToProps)(messageList));
